import '../App.css';
import { useEffect, useRef, useState } from 'react';
import Widget from './Widget';
import IconPopupButton from './Buttons/IconPopupButton';
import { SidebarExpand, IconPlus, IconPlusSm } from '../assets/Icons/';
import Sidebar from './Sidebar';
import IconButton from './Buttons/IconButton';
import type { OverlayInstance, WidgetInstance } from '../types/';
import { Link, useParams } from 'react-router-dom';
import useSoftDelete from '@/hooks/useSoftDelete';
import {
	ArrowLeft,
	CircleDollarSign,
	ClipboardClock,
	Cog,
	Diamond,
	FlagTriangleRight,
	Heart,
	MessageCircle,
	Shuffle,
	Star,
	Trash,
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import useAlert from '@/hooks/useAlert';
import AlertPopover from './AlertPopover';
import Chat from './Chat';
import ConsoleNotification from './ConsoleNotification';
import type { Notification } from './ConsoleNotification';
import Widgetio from './Widgetio';
import { toast } from 'sonner';
import useLocaleDate from '@/hooks/useLocaleDate';
import useTrashRestore from '@/hooks/useTrashRestore';
import useRename from '@/hooks/useRename';
import { Input } from './ui/input';

interface Template {
	label: string;
	icon: React.ReactNode | null;
	action: () => void;
}

const Overlay = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) return <>Incorrect Overlay ID: {id}</>;
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const [isNavbarOver, setIsNavbarOver] = useState(false);
	const [isPopoverVisible, setIsPopoverVisible] = useState(false);
	const [templates, setTemplates] = useState<Template[]>([]);
	const [overlayData, setOverlayData] = useState<OverlayInstance>({
		name: 'Overlay Name',
		id: 'overlay-id',
		widgets: [],
	});
	const [activeWidget, setActiveWidget] = useState<WidgetInstance>();
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [overlayName, setOverlayName] = useState(overlayData.name);
	const renameTimeout = useRef<NodeJS.Timeout | null>(null);
	const rename = useRename();

	document.body.setAttribute('clean-bg', 'false');

	const getOverlayData = async () => {
		const res = await fetch(`/api/get-overlay-data/${encodeURIComponent(id)}`);
		const data = await res.json();
		const filteredData = { ...data, widgets: data.widgets.filter((widget: WidgetInstance) => !widget.deleteAfter) };
		setOverlayData(filteredData);
		setOverlayName(filteredData.name);
	};

	useEffect(() => {
		// Fetch overlay data
		getOverlayData();
		// Fetch templates
		const getTemplates = async () => {
			const res = await fetch('/api/get-templates');
			const data = await res.json();

			const templateArray: Template[] = data[0].map((template: string) => ({
				label: template[0].toUpperCase() + template.slice(1).replaceAll('-', ' '),
				icon: <IconPlusSm />,
				source: overlayData.id,
				action: (name: string) => addWidget(name, template, overlayData.id),
			}));
			setTemplates(templateArray);
		};
		getTemplates();
		// Listen for iframe console logs and send notifications
		window.addEventListener('message', (event) => {
			if (event.data?.type === 'iframeConsole') {
				const { level, args } = event.data;
				const id = crypto.randomUUID();
				const duration = 5300;
				const notification = {
					id,
					level: level,
					duration,
					content: args,
					close: (id: string) => removeNotification(id),
				};
				setNotifications((prev) => [...prev, notification]);
			}
			if (event.data?.type === 'iframeError') {
				const { error, iframeName } = event.data;
				setNotifications((prev) => [
					...prev,
					{
						id: crypto.randomUUID(),
						level: 'error',
						title: `${iframeName} - Line ${error.lineno}:${error.colno}`,
						content: [{ message: error.message, messageType: 'string' }],
						close: removeNotification,
						duration: 5300,
					},
				]);
			}
		});
	}, []);

	const removeNotification = (id: string) => {
		setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, closing: true } : n)));

		setTimeout(() => {
			setNotifications((prev) => prev.filter((n) => n.id !== id));
		}, 300);
	};

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
			toast.success(`Created ${data.name}`);
		} catch (error) {
			console.error(error);
			toast.error(`Error creating widget`, {
				description: `${error}`,
			});
		}
	};

	const softRemoveWidget = async (overlay: OverlayInstance, widget: WidgetInstance) => {
		try {
			await useSoftDelete(overlay.name, overlay.id, widget.name, widget.id);
			getOverlayData();
			toast(`${widget.name} was moved to trash`, {
				description: (
					<>
						You can recover it until
						<br />
						{useLocaleDate(Date.now() + 2592000000)}
					</>
				),
				icon: <Trash size={16} />,
				action: (
					<Button
						onClick={async () => {
							await useTrashRestore(overlay, widget);
							getOverlayData();
						}}>
						Undo
					</Button>
				),
			});
		} catch (error) {
			console.error(`Error removing ${widget.name}`, error);
			toast.error(`Error removing ${widget.name}`, {
				description: `${error}`,
			});
		}
	};

	const updateWidgetSettings = async (overlayID: string, widget: WidgetInstance) => {
		await fetch('/api/update-widget-settings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				overlayID: overlayID,
				id: widget.id,
				scriptVersion: widget.scriptVersion,
				width: widget.width,
				height: widget.height,
				posX: widget.posX,
				posY: widget.posY,
			}),
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

	const handleNameInput = async (name: string) => {
		setOverlayName(name);
		if (renameTimeout.current) {
			clearTimeout(renameTimeout.current);
			renameTimeout.current = null;
		}
		renameTimeout.current = setTimeout(async () => {
			rename(overlayData, undefined, name, true);
			overlayData.name = name;
		}, 500);
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
			<div
				className={`overlay-navbar ${isNavbarOver}`}
				data-popover-visible={isPopoverVisible}
				onMouseEnter={() => setIsNavbarOver(true)}
				onMouseLeave={() => setIsNavbarOver(false)}>
				<div className="flex items-center">
					<Link to="/" className="sidebar-back opacity-50 hover:opacity-100">
						<ArrowLeft size={20} strokeWidth={1.5} />
					</Link>
					<Input
						value={overlayName}
						size={overlayName.length - 1 || 1}
						onChange={(e) => handleNameInput(e.target.value)}
						className="ml-[1rem] mr-2 tracking-wide dark:bg-transparent! dark:border-0 text-sm! dark:hover:bg-tr-50! transition-colors rounded-sm h-6 focus-visible:ring-[0px] dark:focus-visible:bg-tr-50! w-fit! -translate-x-1 px-2!"
					/>
					{/* <p className="text-sm tracking-wide ml-[1rem] mr-2">{overlayData.name}</p> */}
					<Badge variant="outline" className="opacity-50">
						{overlayData.id}
					</Badge>
				</div>
				<div className="flex">
					<Button variant="ghost" size="sm">
						{' '}
						<ClipboardClock size={16} />{' '}
					</Button>
					<Button variant="ghost" size="sm">
						{' '}
						<Shuffle size={16} />{' '}
					</Button>
					<div className="test-alert-container px-2 mx-2 flex items-center">
						<Button variant="ghost" size="sm" onClick={() => useAlert('follower-latest')}>
							{' '}
							<Heart size={16} />{' '}
						</Button>
						{/* <span className='border-x-1 h-[50%] mx-2'></span> */}
						{/* <span className='h-1 w-1 rounded-full bg-zinc-700 mx-2'></span> */}
						<AlertPopover
							listener="subscriber-latest"
							icon={<Star size={16} />}
							onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}
						/>
						<AlertPopover
							listener="tip-latest"
							icon={<CircleDollarSign size={16} />}
							onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}
						/>
						<AlertPopover
							listener="cheer-latest"
							icon={<Diamond size={16} />}
							onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}
						/>
						<AlertPopover
							listener="raid-latest"
							icon={<FlagTriangleRight size={16} />}
							onPopoverToggle={() => setIsPopoverVisible(!isPopoverVisible)}
						/>
					</div>
					<Button variant="ghost" size="sm">
						{' '}
						<Cog size={16} />{' '}
					</Button>
				</div>
			</div>
			<div
				className="overlay-navbar-container"
				onMouseEnter={() => setIsNavbarOver(true)}
				onMouseLeave={() => setIsNavbarOver(false)}></div>
			{/* Sidebar */}
			<Sidebar
				isVisible={isSidebarVisible}
				overlay={overlayData}
				widget={activeWidget}
				onToggle={() => handleSidebarToggle()}
			/>
			{/* Add new button */}
			<div className="flex gap-4 absolute OverlayButtonContainer" data-sidebar-visible={isSidebarVisible}>
				<IconPopupButton icon={<IconPlus />} popupItems={templates} popupPosition="top" />
				<Widgetio overlay={overlayData} widgets={overlayData.widgets} onWidgetImport={getOverlayData} />
			</div>
			{/* Chat */}
			<div className="chat-button absolute">
				<IconPopupButton icon={<MessageCircle size={16} />}>
					{(closePopup) => <Chat closePopup={closePopup} />}
				</IconPopupButton>
			</div>
			{/* Notifications */}
			<div className="notification-area absolute flex flex-col-reverse justify-end p-10 gap-4">
				{notifications.map((notification) => {
					return <ConsoleNotification key={notification.id} notification={{ ...notification }} />;
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
					onDelete={() => softRemoveWidget(overlayData, widget)}
					onSettingsChange={(id, widget) => {
						updateWidgetSettings(id, widget);
					}}
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
