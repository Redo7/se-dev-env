import '../App.css';
import { useEffect, useState } from 'react';
import type { OverlayInstance, WidgetInstance } from '../types/';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useRelativeTime from '@/hooks/useRelativeTime';
import HomeScreenSidebar from './HomeScreenSidebar';
import useTrashRestore from '@/hooks/useTrashRestore';

const Trash = () => {
	const [overlays, setOverlays] = useState<OverlayInstance[]>([]);

	document.body.setAttribute('clean-bg', 'true');

	const getDeleted = async () => {
		const res = await fetch('/api/data/deletion-data');
		const data = await res.json();
		const arr = Object.keys(data).map((key) => ({ ...data[key] }));
		setOverlays(arr);
	};

	useEffect(() => {
		getDeleted();
	}, []);

	const handleRestore = async (overlay: OverlayInstance, widget: WidgetInstance | undefined) => {
		await useTrashRestore(overlay, widget);
		getDeleted();
	};

	if (overlays.length === 0) {
		return (
			<div className="h-screen flex">
				<HomeScreenSidebar />
				<div className="w-full flex center">
					<h1 className="text-5xl opacity-25 font-extrabold">Nothing to display</h1>
					<h1 className=" absolute text-9xl opacity-5 blur-xs font-extrabold">Nothing to display</h1>
				</div>
			</div>
		);
	}

	return (
		<div className="flex">
			<HomeScreenSidebar />
			<div className="home-screen flex flex-col p-50 gap-4">
				<div className="overlay-container flex flex-col gap-4">
					{overlays.map((overlay: OverlayInstance) => {
						return (
							<div className="flex flex-col gap-2" key={overlay.id}>
								<div className="trash-overlay py-3 px-4 rounded-md hover:bg-background dark:hover:bg-tr-50 w-100 flex items-center gap-6">
									<i className="bi bi-folder-fill tx text-xl"></i>
									<div className="tx flex flex-col gap-1 flex-grow">
										<p>{overlay.name}</p>
										<p className="overlay-last-opened">
											{overlay.deleteAfter &&
												'Will be deleted ' + useRelativeTime(overlay.deleteAfter)}
										</p>
									</div>
									<div className="overlay-action-buttons flex gap-2 p-1.5 px-2 rounded-sm">
										<button type="button" onClick={() => handleRestore(overlay, undefined)}>
											{' '}
											<i className="bi bi-arrow-counterclockwise"></i>{' '}
										</button>
									</div>
								</div>
								{overlay.widgets.map((widget: WidgetInstance) => {
									return (
										<div
											key={widget.id}
											className="trash-widget py-3 pr-4 pl-0 rounded-md hover:bg-background dark:hover:bg-tr-50 w-88 flex items-center gap-6">
											<i className="bi bi-folder-fill tx text-xl"></i>
											<div className="tx flex flex-col gap-1 flex-grow">
												<p>{widget.name}</p>
												<p className="overlay-last-opened">
													{widget.deleteAfter &&
														'Will be deleted ' + useRelativeTime(widget.deleteAfter)}
												</p>
											</div>
											<div className="overlay-action-buttons flex gap-2 p-1.5 px-2 rounded-sm">
												<button type="button" onClick={() => handleRestore(overlay, widget)}>
													{' '}
													<i className="bi bi-arrow-counterclockwise"></i>{' '}
												</button>
											</div>
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Trash;
