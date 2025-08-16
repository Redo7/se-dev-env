import { Link } from 'react-router-dom';
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ThemeToggle } from './ThemeToggle';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { OverlayInstance, WidgetInstance } from '../types/';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from './ui/button';
import useSoftDelete from '@/hooks/useSoftDelete';

const HomeScreen = () => {
	const [overlays, setOverlays] = useState<OverlayInstance[]>([]);
	const nameRef = useRef<HTMLInputElement>(null);

	document.body.setAttribute('clean-bg', 'true');

	const createOverlay = async (name: string) => {
		const res = await fetch('/api/create-overlay', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name }),
		});
		const data = await res.json();
		if (data) getOverlays();
	};

	const getOverlays = async () => {
		const res = await fetch('/api/get-overlays');
		const data = await res.json();
		const filteredData = data.filter((overlay: {name: string, id: string, deleteAfter?: number, widgets: WidgetInstance[]}) => !overlay.deleteAfter)
		setOverlays(filteredData);
	};

	useEffect(() => {
		getOverlays();
	}, []);

	const softRemoveWidget = async (overlayName: string, overlayID: string) => {
		try {
			await useSoftDelete(overlayName, overlayID, undefined, undefined);
			getOverlays();
		} catch (error) {
			console.error(`Error removing ${overlayID}`, error);
		}
	};

	return (
		<div className="flex">
			<div className="home-screen-sidebar flex flex-col py-8 w-20 items-center justify-between">
				<div className="home-screen-sidebar-logo flex items-top justify-center">
					<svg width="1.25rem" height="1rem" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"> {' '} <path d="M19.0988 2.26274C19.6758 1.66262 20 0.848692 20 0H4.61538C3.46452 0.000837149 2.35549 0.448806 1.50578 1.25604C0.656073 2.06329 0.127009 3.17156 0.0223517 4.36349C-0.0823053 5.55543 0.244996 6.74503 0.940061 7.69898C1.63513 8.65292 2.64781 9.3024 3.77949 9.52L3.74929 9.57156L0 16H3.07692L8.67692 6.4H4.61538C4.20736 6.4 3.81604 6.23143 3.52753 5.93137C3.23901 5.63132 3.07692 5.22435 3.07692 4.8C3.07692 4.37565 3.23901 3.96868 3.52753 3.66863C3.81604 3.36857 4.20736 3.2 4.61538 3.2H16.923C17.7391 3.2 18.5217 2.86285 19.0988 2.26274Z" fill="currentColor" />{' '} <path d="M19.0986 15.0628C19.6757 14.4627 19.9999 13.6487 19.9999 12.8H12.3075V9.6H16.3075C17.1236 9.6 17.9062 9.26284 18.4832 8.66275C19.0603 8.06262 19.3845 7.24869 19.3845 6.4H12.3075V3.84H9.23064V12.8C9.23064 13.6487 9.55481 14.4627 10.1319 15.0628C10.7089 15.6628 11.4915 16 12.3075 16H16.9229C17.739 16 18.5216 15.6628 19.0986 15.0628Z" fill="currentColor" />{' '} </svg>
				</div>
				<div className="home-screen-sidebar-buttons flex flex-col gap-2">
					<ThemeToggle />
					<Button variant="ghost" size="icon"> <i className="bi bi-trash3"></i> </Button>
					<Button variant="ghost" size="icon"> <i className="bi bi-gear-wide"></i> </Button>
				</div>
			</div>
			<div className="home-screen flex flex-col p-50 gap-4">
				<div className="flex justify-between">
					<div className="home-screen-heading pb-5 w-100 flex justify-between">
						<h1>Overlays</h1>
						<Popover>
							<PopoverTrigger className="home-screen-create p-4 py-2 rounded-md bg-tr-100">
								<i className="bi bi-file-earmark-plus-fill"></i> Create New
							</PopoverTrigger>
							<PopoverContent className="flex flex-col gap-4">
								<div>
									<Label htmlFor="name">Overlay name</Label>
									<Input ref={nameRef} id="name" placeholder="Overlay name" />
								</div>
								<SubtleButton
									onClick={() => {
										if (nameRef.current) {
											createOverlay(nameRef.current.value);
										}
									}}
									width="100%"
									height="2rem">
									Create
								</SubtleButton>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<div className="overlay-container flex flex-col gap-4">
					{overlays.map((overlay: OverlayInstance) => {
						return (
							<div
								className="home-screen-overlay py-3 pr-4 pl-0 rounded-md hover:bg-background dark:hover:bg-tr-50 w-100 flex items-center gap-6"
								key={overlay.id}>
								<Link className="flex items-center gap-6 flex-grow" to={`/${overlay.id}`}>
									<i className="bi bi-folder-fill tx text-xl"></i>
									<div className="tx flex flex-col gap-1">
										<p>{overlay.name}</p>
										<p className="overlay-last-opened">15 minutes ago</p>
									</div>
								</Link>

								<div className="overlay-action-buttons flex gap-2 p-1.5 px-2 rounded-sm">
									<button type="button">
										<i className="bi bi-pencil-square"></i>
									</button>
									<span className="overlay-action-buttons-divider"></span>
									<button type="button" onClick={() => softRemoveWidget(overlay.name, overlay.id)}>
										<i className="bi bi-trash3"></i>
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
