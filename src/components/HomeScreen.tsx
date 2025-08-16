import { Link } from 'react-router-dom';
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { OverlayInstance, WidgetInstance } from '../types/';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useSoftDelete from '@/hooks/useSoftDelete';
import HomeScreenSidebar from './HomeScreenSidebar';

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
			<HomeScreenSidebar />
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
