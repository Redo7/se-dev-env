import { Link } from 'react-router-dom';
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { ThemeToggle } from './ThemeToggle';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Overlay } from '../types/'

const HomeScreen = () => {
	const [overlays, setOverlays] = useState<Overlay[]>([]);
	const nameRef = useRef<HTMLInputElement>(null);

	const createOverlay = async (name: string) => {
		const res = await fetch('/api/create-overlay', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name }),
		});
		const data = await res.json();
		if(data) getOverlays();
	};

	const getOverlays = async () => {
		const res = await fetch('/api/get-overlays');
		const data = await res.json();
		setOverlays(data);
	};

	const deletionExpiryCheck = async () => {
		// Change the shape of the objects to:
		// {
		// 	'overlayID': [
		// 		{
		// 			name: 'some name',
		// 			internalName: 'some-name-29832752837529',
		// 			deleteAfter: 1234567890
		// 		}
		// 	]
		// }
		// Future proofing for the bin display
		const res = await fetch(`/api/data/deletion-data`);
		type DeletionData = Record<string, Record<string, number>>;
		const data: DeletionData = await res.json();
		const now = Date.now();
		const widgetsToDelete: { overlay: string; widget: string }[] = [];

		for (const [overlayID, widgets] of Object.entries(data)) {
			for (const [widgetID, timestamp] of Object.entries(widgets)) {
			if (timestamp < now) {
				widgetsToDelete.push({ overlay: overlayID, widget: widgetID });
			}
			}
		}
		widgetsToDelete.forEach(entry => {
			removeWidget(entry.overlay, entry.widget);
		})
	};

	useEffect(() => {
		deletionExpiryCheck();
		getOverlays();
	}, []);

	const removeWidget = async (overlayID: string, widgetID: string) => {
		console.log('deleting', overlayID, widgetID);
		try {
			await fetch('/api/delete-widget', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ overlayID, widgetID }), 
			}).then((response) => {
				if (!response.ok) {
					throw new Error(`Something went wrong while deleting ${widgetID}`);
				}
				getOverlays();
			});
		} catch (error) {
			console.error(`Error removing ${widgetID}`, error);
		}
	};

	return (
		<div className="home-screen flex flex-col p-50 gap-4">
			<div className="flex justify-between">
				<div className="home-screen-heading w-100 flex justify-between">
					<h1>Overlays</h1>
					<Popover>
						<PopoverTrigger>Create New</PopoverTrigger>
						<PopoverContent className='flex flex-col gap-4'>
							<div>
								<Label htmlFor="name">Overlay name</Label>
								<Input ref={nameRef} id='name' placeholder="Overlay name" />
							</div>
							<SubtleButton onClick={() => {
								if (nameRef.current) {
									createOverlay(nameRef.current.value);
								  }
							}} width='100%' height='2rem'>Create</SubtleButton>
						</PopoverContent>
					</Popover>
				</div>
				<ThemeToggle />
			</div>
			<div className="overlay-container flex flex-col gap-2">
				{overlays.map((overlay: Overlay) => {
					return (
						<Link className="px-6 py-4 rounded-md bg-zinc-100 dark:bg-zinc-900 w-100" key={overlay.id} to={`/${overlay.id}`}>
							{overlay.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default HomeScreen;
