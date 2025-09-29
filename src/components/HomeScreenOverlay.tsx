import { Link } from 'react-router-dom';
import type { OverlayInstance } from '../types/';
import useRelativeTime from '@/hooks/useRelativeTime';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import useRename from '@/hooks/useRename';
import { useState } from 'react';
interface Props {
	overlay: OverlayInstance;
	onOverlayDelete: (name: string, id: string) => void;
}
const HomeScreenOverlay = ({ overlay, onOverlayDelete }: Props) => {
	const [overlayName, setOverlayName] = useState(overlay.name);
	const [dialogOpen, setDialogOpen] = useState(false);
	const rename = useRename();
	const handleNameInput = async (name: string) => {
		rename(overlay, undefined, name, false);
	};
	return (
		<div
			className="home-screen-overlay snap-start py-3 pr-4 pl-0 rounded-md hover:bg-background dark:hover:bg-tr-50 w-100 flex items-center gap-6"
			key={overlay.id}>
			<Link className="flex items-center gap-6 flex-grow" to={`/${overlay.id}`}>
				<i className="bi bi-folder-fill tx text-xl"></i>
				<div className="tx flex flex-col gap-1">
					<p className="max-w-[24ch] truncate">{overlay.name}</p>
					<p className="overlay-last-opened">
						{overlay.lastUpdate ? useRelativeTime(overlay.lastUpdate) : 'Never opened'}
					</p>
				</div>
			</Link>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<div className="overlay-action-buttons flex gap-2 p-1.5 px-2 rounded-sm">
					<DialogTrigger className="w-full" onClick={() => setDialogOpen(true)} asChild>
						<button type="button">
							<i className="bi bi-pencil-square"></i>
						</button>
					</DialogTrigger>
					<span className="overlay-action-buttons-divider"></span>
					<button type="button" onClick={() => onOverlayDelete(overlay.name, overlay.id)}>
						<i className="bi bi-trash3"></i>
					</button>
				</div>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Rename widget</DialogTitle>
						<DialogDescription>Thie action will rename it in both the app and the files.</DialogDescription>
					</DialogHeader>
					<div className="flex items-center gap-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="name" className="sr-only">
								New name
							</Label>
							<Input
								id="name"
								onChange={(e) => setOverlayName(e.target.value)}
								defaultValue={overlayName}
							/>
						</div>
					</div>
					<DialogFooter className="sm:justify-start">
						<Button
							onClick={() => handleNameInput(overlayName)}
							className="ml-auto"
							type="button"
							variant="default">
							Rename
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default HomeScreenOverlay;
