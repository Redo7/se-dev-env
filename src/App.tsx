import { useEffect, useState } from 'react';
import Overlay from './components/Overlay';
import Widget from './components/Widget';
import IconPopupButton from './components/Buttons/IconPopupButton';
import IconPlusSm from './assets/Icons/IconPlusSm';
import IconPlus from './assets/Icons/IconPlus';
import Sidebar from './components/Sidebar';
import IconButton from './components/Buttons/IconButton';
import SidebarExpand from './assets/Icons/SidebarExpand';

export interface WidgetInstance {
	id: string;
	name: string;
	template: string;
	src: string;

	width: number;
	height: number;
	posX: number;
	posY: number;
}

function App() {
	// const [isDarkMode, setIsDarkMode] = useState(true);
	const currOverlay = 'overlay-1';
	const isDarkMode = true;
	document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const [widgets, setWidgets] = useState<WidgetInstance[]>([]);
	const [activeWidget, setActiveWidget] = useState<WidgetInstance>();

	const getWidgets = async () => {
		console.log('Retrieving widgets');
		const res = await fetch('/api/get-widgets');
		const data: WidgetInstance[] = await res.json();
		setWidgets(data);
	};

	useEffect(() => {
		getWidgets();
	}, []);

	const addWidget = async (template: string) => {
		try {
			const res = await fetch('/api/create-widget', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ template }),
			});

			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

			const data = await res.json();
			setWidgets((prevWidgets) => [...prevWidgets, data]);
			console.log('Created ' + data.name);
		} catch (error) {
			console.error(error);
		}
	};

	const removeWidget = async (template: string, id: string) => {
		console.log('Deleting is disabled');
		return;

		try {
			await fetch('/api/delete-widget', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ template, id }),
			}).then((response) => {
				if (!response.ok) {
					throw new Error(`Something went wrong while deleting ${template}-${id}`);
				}
				console.log(`${template}-${id} deleted successfully.`);
				getWidgets();
			});
		} catch (error) {
			console.error(`Error removing ${template}-${id}`, error);
		}
	};

	const updateWidgetSettings = async (id: string, width: number, height: number, posX: number, posY: number) => {
		await fetch('/api/update-widget-settings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, width, height, posX, posY }),
		}).then((response) => {
			if (!response.ok) {
				throw new Error(`Something went wrong while changing settings for ${id}`);
			}
			console.log(`Settings applied successfully.`);
		});
	};

	const handleSidebarToggle = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	const handleWidgetClick = (widget: WidgetInstance) => {
		if (widget.id === activeWidget?.id) {
			console.log('Active widget clicked');
			return;
		}
		setActiveWidget(widget);
	};

	return (
		<>
			<Overlay>
				<div className="sidebar-button absolute" data-sidebar-visible={isSidebarVisible}>
					<IconButton onClick={() => handleSidebarToggle()}>
						<SidebarExpand />
					</IconButton>
				</div>
				<Sidebar
					isVisible={isSidebarVisible}
					overlay={currOverlay}
					widget={activeWidget}
					onToggle={() => handleSidebarToggle()}
				/>
				<div
					className="flex gap-16 absolute OverlayButtonContainer depth-shadow"
					data-sidebar-visible={isSidebarVisible}>
					<IconPopupButton
						popupItems={[
							{
								label: 'Chat',
								icon: <IconPlusSm />,
								action: () => addWidget('chat'),
							},
							{
								label: 'Goal',
								icon: <IconPlusSm />,
								action: () => addWidget('goal'),
							},
						]}
						popupPosition="top">
						<IconPlus />
					</IconPopupButton>
				</div>
				{widgets.map((widget) => (					
					<Widget
						key={widget.id}
						overlay={currOverlay}
						template={widget.template}
						id={widget.id}
						src={widget.src}
						width={widget.width}
						height={widget.height}
						initialPosition={{ x: widget.posX, y: widget.posY }}
						resizable={true}
						onClick={() => handleWidgetClick(widget)}
						onDelete={() => removeWidget(widget.template, widget.id)}
						onSettingsChange={(id, width, height, posX, posY) =>
							updateWidgetSettings(id, width, height, posX, posY)
						}
					/>
				))}
			</Overlay>
		</>
	);
}

export default App;
