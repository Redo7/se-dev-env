import { Link } from "react-router-dom";
import type { OverlayInstance } from "../types/";
import useRelativeTime from "@/hooks/useRelativeTime";

interface Props{
    overlay: OverlayInstance;
    onOverlayDelete: (name: string, id: string) => void;
}
const HomeScreenOverlay = ({ overlay, onOverlayDelete}: Props) => {
	return (
		<div
			className="home-screen-overlay py-3 pr-4 pl-0 rounded-md hover:bg-background dark:hover:bg-tr-50 w-100 flex items-center gap-6"
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

			<div className="overlay-action-buttons flex gap-2 p-1.5 px-2 rounded-sm">
				<button type="button">
					<i className="bi bi-pencil-square"></i>
				</button>
				<span className="overlay-action-buttons-divider"></span>
				<button type="button" onClick={() => onOverlayDelete(overlay.name, overlay.id)}>
					<i className="bi bi-trash3"></i>
				</button>
			</div>
		</div>
	);
};

export default HomeScreenOverlay;
