import '../App.css';
import { useEffect, useState } from 'react';
import Widget from './Widget';
import IconPopupButton from './Buttons/IconPopupButton';
import {SidebarExpand, IconPlus, IconPlusSm} from '../assets/Icons/';
import Sidebar from './Sidebar';
import IconButton from './Buttons/IconButton';
import type { OverlayInstance, WidgetInstance } from '../types/';
import { useParams } from 'react-router-dom';

interface Template{
	label: string;
	icon: React.ReactNode | null;
	action: () => void;
}

const Overlay = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) return (<>Incorrect Overlay ID: {id}</>);
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const [templates, setTemplates] = useState<Template[]>([]);
	const [overlayData, setOverlayData] = useState<OverlayInstance>({name: 'Overlay Name', id: 'overlay-id', widgets: []});
	const [activeWidget, setActiveWidget] = useState<WidgetInstance>();

	document.body.setAttribute('clean-bg', 'false');

	const getOverlayData = async () => {
		const res = await fetch(`/api/get-overlay-data/${encodeURIComponent(id)}`);
		const data = await res.json();
		const filteredData = {...data, widgets: data.widgets.filter((widget: WidgetInstance) => !widget.deleteAfter)}
		setOverlayData(filteredData);
	};

	useEffect(() => {
		getOverlayData();
	}, []);

	useEffect(() => {
		const getTemplates = async () => {
			const res = await fetch('/api/get-templates');
			const data = await res.json();
			
			const templateArray: Template[] = data[0].map((template: string) => ({
				label: template[0].toUpperCase() + template.slice(1),
				icon: <IconPlusSm />,
				source: overlayData.id,
				action: (name: string) => addWidget(name, template, overlayData.id),
			}));
			setTemplates(templateArray)
		};
		getTemplates();
	}, [overlayData]);

	const addWidget = async (name: string, template: string, overlayID: string) => {
		try {
			const res = await fetch('/api/create-widget', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, template, overlayID }),
			});

			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

			const data = await res.json();
			setOverlayData((prevOverlay) => {
				return {
				  ...prevOverlay,
				  widgets: [...prevOverlay.widgets, data],
				};
			  });
			console.log('Created ' + data.name);
		} catch (error) {
			console.error(error);
		}
	};

	const softRemoveWidget = async (overlayName: string, overlayID: string, widgetName: string, widgetID: string) => {
		try {
			const response = await fetch('/api/soft-delete-widget', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ overlayName, overlayID, widgetName, widgetID }),
			});
			if (!response.ok) {
				throw new Error(`Something went wrong while soft deleting ${widgetID}`);
			}
			getOverlayData();
		} catch (error) {
			console.error(`Error removing ${widgetID}`, error);
		}
	};

	const updateWidgetSettings = async (overlayID: string, id: string, width: number, height: number, posX: number, posY: number) => {
		await fetch('/api/update-widget-settings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "overlayID": overlayID, id, width, height, posX, posY }),
		}).then((response) => {
			if (!response.ok) {
				throw new Error(`Something went wrong while changing settings for ${id}`);
			}
			// console.log(`Settings applied successfully.`);
		});
	};

	const handleSidebarToggle = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	const handleWidgetClick = (widget: WidgetInstance) => {
		if (widget.id === activeWidget?.id) {
			// console.log('Active widget clicked');
			return;
		}
		setActiveWidget(widget);
	};

	return (
		<div className="overlay">
			<div className="sidebar-button absolute" data-sidebar-visible={isSidebarVisible}>
				<IconButton onClick={() => handleSidebarToggle()}>
					<SidebarExpand />
				</IconButton>
			</div>
			<Sidebar
				isVisible={isSidebarVisible}
				overlay={overlayData}
				widget={activeWidget}
				onToggle={() => handleSidebarToggle()}
			/>
			<div
				className="flex gap-16 absolute OverlayButtonContainer depth-shadow"
				data-sidebar-visible={isSidebarVisible}>
				<IconPopupButton popupItems={templates} popupPosition="top">
					<IconPlus />
				</IconPopupButton>
			</div>
			{overlayData.widgets.map((widget) => (
				<Widget
					key={widget.id}
					overlay={overlayData}
					template={widget.template}
					name={widget.name}
					id={widget.id}
					src={widget.src}
					width={widget.width}
					height={widget.height}
					initialPosition={{ x: widget.posX, y: widget.posY }}
					resizable={true}
					onClick={() => handleWidgetClick(widget)}
					onDelete={() => softRemoveWidget(overlayData.name, overlayData.id, widget.name, widget.id)}
					onSettingsChange={(id, widget) =>
					{
						updateWidgetSettings(id, widget.id, widget.width, widget.height, widget.posX, widget.posY)
					}
					}
				/>
			))}
			<svg id="lens-map" style={{ display: 'none' }}>
				<linearGradient id="red"></linearGradient>
				<linearGradient id="blue"></linearGradient>
			</svg>
			<svg style={{ display: 'none' }}>
				<defs>
					<filter id="glass" x="0%" y="0%" width="100%" height="100%">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.004 0.004"
							numOctaves="1"
							seed="0"
							result="noise"
						/>
						<feGaussianBlur in="noise" stdDeviation="8" result="blurred" />
						<feComposite operator="arithmetic" k1="0" k2="1" k3="2" k4="0" result="litImage" />
						<feDisplacementMap
							in="SourceGraphic"
							in2="litImage"
							scale="-30"
							xChannelSelector="G"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
			</svg>
		</div>
	);
};

export default Overlay;
