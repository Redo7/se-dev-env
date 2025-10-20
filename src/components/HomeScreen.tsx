import '../App.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { OverlayInstance } from '../types/';
import 'bootstrap-icons/font/bootstrap-icons.css';
import useSoftDelete from '@/hooks/useSoftDelete';
import HomeScreenSidebar from './HomeScreenSidebar';
import { Separator } from './ui/separator';
import HomeScreenOverlay from './HomeScreenOverlay';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';
import { BookA, ClockFading } from 'lucide-react';

const HomeScreen = () => {
	const [overlays, setOverlays] = useState<OverlayInstance[]>([]);
	const [filterInput, setFilterInput] = useState('');
	const [sortOrder, setSortOrder] = useState('A-Z');
	const containerRef = useRef<HTMLDivElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);

	document.body.setAttribute('clean-bg', 'true');
	document.title = "se-dev-env"

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
		const data: OverlayInstance[] = await res.json();
		setOverlays(data);
	};

	useEffect(() => {
		getOverlays();
	}, []);

	const softRemoveOverlay = async (overlayName: string, overlayID: string) => {
		try {
			await useSoftDelete(overlayName, overlayID, undefined, undefined);
			getOverlays();
		} catch (error) {
			console.error(`Error removing ${overlayID}`, error);
		}
	};

	const recentOverlays = useMemo(() => {
		return overlays
			.filter((o) => !o.deleteAfter)
			.sort((a, b) => {
				if (!a.lastUpdate && !b.lastUpdate) return 0;
				if (!a.lastUpdate) return 1;
				if (!b.lastUpdate) return -1;
				return b.lastUpdate - a.lastUpdate;
			});
	}, [overlays]);

	const sortOverlays = (a: OverlayInstance, b: OverlayInstance) => {
		switch (sortOrder) {
			case 'A-Z':
				return a.name.localeCompare(b.name);

			case 'Z-A':
				return b.name.localeCompare(a.name);

			case 'Newest first':
				if (!a.lastUpdate && !b.lastUpdate) return 0;
				if (!a.lastUpdate) return 1;
				if (!b.lastUpdate) return -1;
				return b.lastUpdate - a.lastUpdate;

			case 'Oldest first':
				if (!a.lastUpdate && !b.lastUpdate) return 0;
				if (!a.lastUpdate) return 1;
				if (!b.lastUpdate) return -1;
				return a.lastUpdate - b.lastUpdate;

			default:
				return 0;
		}
	};

	const visibleOverlays = useMemo(() => {
		return overlays
			.filter(
				(overlay) =>
					!overlay.deleteAfter && (filterInput === '' || overlay.name.toLowerCase().includes(filterInput))
			)
			.sort(sortOverlays);
	}, [overlays, filterInput, sortOrder]);

	const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterInput(e.target.value.toLowerCase());
	};

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		el.scrollLeft = 0;
	}, [sortOrder]);

	return (
		<div className="flex">
			<HomeScreenSidebar />
			<div className="home-screen flex p-50 w-full">
				{/* Recent */}
				<div className="recent-overlays flex flex-col gap-1.5 w-100 box-content">
					<div className="home-screen-heading w-100 min-h-10 flex justify-between items-center">
						<h1>Overlays</h1>
						<Popover>
							<PopoverTrigger className="home-screen-create p-4 py-2 rounded-sm bg-tr-100">
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
					<div className="flex gap-4 items-center">
						<p>Recent</p>
						<Separator className="data-[orientation=horizontal]:w-auto grow" />
					</div>
					<div className="overlay-container overflow-hidden flex flex-col gap-4">
						{recentOverlays.map((overlay: OverlayInstance) => {
							return (
								<HomeScreenOverlay
									key={overlay.id}
									overlay={overlay}
									onOverlayDelete={softRemoveOverlay}
								/>
							);
						})}
					</div>
				</div>
				{/* All Overlays */}
				<div className="all-overlays flex flex-col gap-1.5 grow">
					<div className="min-h-10 w-full pl-10 flex justify-between items-center align-middle">
						<span className="flex gap-2 items-center">
							<p className="text-[0.75rem] opacity-50 leading-0 h-fit">Sorting:</p>
							<DropdownMenu>
								<DropdownMenuTrigger className="hover:bg-tr-100 p-2 rounded-sm transition-colors flex items-center gap-1">
									{sortOrder.includes('A') ? (
										<BookA size={16} strokeWidth={1.5} />
									) : (
										<ClockFading size={16} strokeWidth={1.5} />
									)}
									<p className="text-sm">{sortOrder}</p>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
										<DropdownMenuLabel className="text-[0.75rem] opacity-50 px-1.5 flex gap-1 items-center">
											<BookA size={12} strokeWidth={1.5} /> Alphabetical
										</DropdownMenuLabel>
										<DropdownMenuRadioItem value="A-Z">A-Z</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Z-A">Z-A</DropdownMenuRadioItem>
										<DropdownMenuSeparator />
										<DropdownMenuLabel className="text-[0.75rem] opacity-50 px-1.5 flex gap-1 items-center">
											<ClockFading size={12} strokeWidth={1.5} /> Date
										</DropdownMenuLabel>
										<DropdownMenuRadioItem value="Newest first">Newest first</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Oldest first">Oldest first</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</span>
						<Input
							onChange={handleFilterInput}
							className="w-60 border-0 border-b rounded-none bg-transparent dark:bg-transparent! focus-visible:ring-[0px]"
							placeholder="Search"
						/>
					</div>
					<div className="flex gap-4 items-center 2-full pl-10">
						<p>All Overlays</p>
						<Separator className="data-[orientation=horizontal]:w-auto grow" />
					</div>
					<div
						ref={containerRef}
						className="all-overlays-container flex flex-col gap-4 flex-wrap h-full overflow-scroll pl-10 pr-4 scroll-px-10 snap-x snap-mandatory">
						{visibleOverlays.map((overlay: OverlayInstance) => {
							return (
								<HomeScreenOverlay
									key={overlay.id}
									overlay={overlay}
									onOverlayDelete={softRemoveOverlay}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
