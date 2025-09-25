import '../App.css';
import { useEffect, useState } from 'react';
import Widget from './Widget';
import IconPopupButton from './Buttons/IconPopupButton';
import {SidebarExpand, IconPlus, IconPlusSm} from '../assets/Icons/';
import Sidebar from './Sidebar';
import IconButton from './Buttons/IconButton';
import type { OverlayInstance, WidgetInstance } from '../types/';
import { Link, useParams } from 'react-router-dom';
import useSoftDelete from '@/hooks/useSoftDelete';
import { ArrowLeft, CircleDollarSign, ClipboardClock, Cog, Diamond, FlagTriangleRight, Heart, MessageCircle, Shuffle, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import useAlert from '@/hooks/useAlert';
import AlertPopover from './AlertPopover';
import Chat from './Chat';
import ConsoleNotification from './ConsoleNotification';
import type { Notification } from './ConsoleNotification';

interface Template{
	label: string;
	icon: React.ReactNode | null;
	action: () => void;
}

const Overlay = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) return (<>Incorrect Overlay ID: {id}</>);
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const [isPopoverVisible, setIsPopoverVisible] = useState(false);
	const [templates, setTemplates] = useState<Template[]>([]);
	const [overlayData, setOverlayData] = useState<OverlayInstance>({name: 'Overlay Name', id: 'overlay-id', widgets: []});
	const [activeWidget, setActiveWidget] = useState<WidgetInstance>();
	const [notifications, setNotifications] = useState<Notification[]>([])

	document.body.setAttribute('clean-bg', 'false');

	const getOverlayData = async () => {
		const res = await fetch(`/api/get-overlay-data/${encodeURIComponent(id)}`);
		const data = await res.json();
		const filteredData = {...data, widgets: data.widgets.filter((widget: WidgetInstance) => !widget.deleteAfter)}
		setOverlayData(filteredData);
	};

	useEffect(() => {
		getOverlayData();
		window.addEventListener("message", (event) => {
			if (event.data?.type === 'iframeConsole') {
				const { level, args } = event.data;
				const id = crypto.randomUUID();
				const duration = 5300
				const notification = { id, level: level, duration, content: args, close: (id: string) => removeNotification(id)}
				setNotifications((prev) => [
					...prev,
					notification,
				]);
			}
			if (event.data?.type === "iframeError") {
				const { error, iframeName } = event.data;
				setNotifications((prev) => [
				  ...prev,
				  {
					id: crypto.randomUUID(),
					level: "error",
					title: `${iframeName} - Line ${error.lineno}:${error.colno}`,
					content: [{ message: error.message, messageType: "string" }],
					close: removeNotification,
					duration: 5300 
				  }
				]);
			}
		  });
	}, []);

	const removeNotification = (id: string) => {
		setNotifications(prev =>
			prev.map(n =>
			  n.id === id ? { ...n, closing: true } : n
			)
		  );
		  
		  setTimeout(() => {
			setNotifications(prev => prev.filter(n => n.id !== id));
		}, 300); 
	}

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

	const softRemoveWidget = async (overlayName: string, overlayID: string, widgetName: string, widgetID: string | undefined) => {
		try {
			await useSoftDelete(overlayName, overlayID, widgetName, widgetID);
			getOverlayData();
		} catch (error) {
			console.error(`Error removing ${widgetID}`, error);
		}
	};

	const updateWidgetSettings = async (overlayID: string, widget: WidgetInstance) => {
		await fetch('/api/update-widget-settings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ overlayID: overlayID, id: widget.id, scriptVersion: widget.scriptVersion, width: widget.width, height: widget.height, posX: widget.posX, posY: widget.posY }),
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
			{/* Sidebar Button */}
			<div className="sidebar-button absolute" data-sidebar-visible={isSidebarVisible}>
				<IconButton onClick={() => handleSidebarToggle()}>
					<SidebarExpand />
				</IconButton>
			</div>
			{/* Navbar */}
			<div className="overlay-navbar-container">
				<div className="overlay-navbar" data-popover-visible={isPopoverVisible}>
					<div className="flex items-center">
						<Link to="/" className='sidebar-back opacity-50 hover:opacity-100'><ArrowLeft size={20} strokeWidth={1.5} /></Link>
						<p className='text-sm tracking-wide ml-[1rem] mr-2'>{overlayData.name}</p>
						<Badge variant="outline" className='opacity-50'>{overlayData.id}</Badge>
					</div>
					<div className="flex">
						<Button variant="ghost" size="sm"> <ClipboardClock size={16}/> </Button>
						<Button variant="ghost" size="sm"> <Shuffle size={16}/> </Button>
						<div className="test-alert-container px-2 mx-2 flex items-center">
							<Button variant="ghost" size="sm" onClick={() => useAlert('follower-latest')}> <Heart size={16}/> </Button>
							{/* <span className='border-x-1 h-[50%] mx-2'></span> */}
							{/* <span className='h-1 w-1 rounded-full bg-zinc-700 mx-2'></span> */}
							<AlertPopover listener='subscriber-latest' icon={<Star size={16} />} onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}/>
							<AlertPopover listener='tip-latest' icon={<CircleDollarSign size={16} />} onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}/>
							<AlertPopover listener='cheer-latest' icon={<Diamond size={16} />} onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}/>
							<AlertPopover listener='raid-latest' icon={<FlagTriangleRight size={16} />} onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}/>
						</div>
						<Button variant="ghost" size="sm"> <Cog size={16}/> </Button>
					</div>
				</div>
			</div>
			{/* Sidebar */}
			<Sidebar
				isVisible={isSidebarVisible}
				overlay={overlayData}
				widget={activeWidget}
				onToggle={() => handleSidebarToggle()}
			/>
			{/* Add new button */}
			<div
				className="flex gap-16 absolute OverlayButtonContainer depth-shadow"
				data-sidebar-visible={isSidebarVisible}>
				<IconPopupButton icon={<IconPlus />} popupItems={templates} popupPosition="top">
					
				</IconPopupButton>
			</div>
			{/* Chat */}
			<div className="chat-button absolute">
				<IconPopupButton icon={<MessageCircle size={16} />}>
					{(closePopup) => <Chat closePopup={closePopup}/> }
				</IconPopupButton>
			</div>
			{/* Notifications */}
			<div className="notification-area absolute flex flex-col-reverse justify-end p-10 gap-4">
				{notifications.map((notification) => {
					return <ConsoleNotification key={notification.id} notification={{...notification}}/>
				})}
			</div>
			{/* Widgets */}
			{overlayData.widgets.map((widget) => (
				<Widget
					key={widget.id}
					overlay={overlayData}
					name={widget.name}
					id={widget.id}
					src={widget.src}
					scriptVersion={widget.scriptVersion}
					template={widget.template}
					width={widget.width}
					height={widget.height}
					initialPosition={{ x: widget.posX, y: widget.posY }}
					resizable={true}
					onClick={() => handleWidgetClick(widget)}
					onDelete={() => softRemoveWidget(overlayData.name, overlayData.id, widget.name, widget.id)}
					onSettingsChange={(id, widget) =>
					{
						updateWidgetSettings(id, widget)
					}
					}
				/>
			))}
			{/* Liquid ass SVG */}
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
