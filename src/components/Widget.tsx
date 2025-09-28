import { useRef, useState, type CSSProperties, useEffect, useCallback } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import useFields from '../hooks/useFieldData';
import type { OverlayInstance, WidgetInstance } from '../types/';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { CustomCheckboxItem } from './CustomCheckboxItem';

interface Props {
	overlay: OverlayInstance;
	id: string;
	name: string;
	src: string;
	template: string;
	scriptVersion: number;
	width: number;
	height: number;
	onClick: () => void;
	onDelete: () => void;
	onSettingsChange: (overlay: string, widget: WidgetInstance) => void;

	onDragStart?: (event: React.MouseEvent<HTMLDivElement>) => void;
	onDragEnd?: (event: React.MouseEvent<HTMLDivElement>, newPosition: { x: number; y: number }) => void;
	onDragging?: (event: React.MouseEvent<HTMLDivElement>, currentPosition: { x: number; y: number }) => void;
	initialPosition?: { x: number; y: number };
	className?: string;
	style?: CSSProperties;

	resizable?: boolean;
	onResizeStart?: (event: React.MouseEvent<HTMLDivElement>, handle: string) => void;
	onResizeEnd?: (
		event: React.MouseEvent<HTMLDivElement>,
		newDimensions: { width: number; height: number },
		newPosition: { x: number; y: number }
	) => void;
	onResizing?: (
		event: React.MouseEvent<HTMLDivElement>,
		currentDimensions: { width: number; height: number },
		currentPosition: { x: number; y: number }
	) => void;
}

type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null;

interface OnWidgetLoadData {
	[key: string]: any;
}

const fetchOnWidgetLoad = async (): Promise<OnWidgetLoadData | undefined> => {
	try {
		const res = await fetch(`/api/data/onWidgetLoad`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('[Parent App] Error fetching onWidgetLoad data:', error);
		toast.error(`Error fetching onWidgetLoad data:`, {
			description: `${error}`,
		});
		return undefined;
	}
};

const Widget = ({
	overlay,
	template,
	name,
	id,
	src,
	scriptVersion,
	width: initialWidth,
	height: initialHeight,
	onClick,
	onDelete,
	onSettingsChange,
	onDragStart,
	onDragEnd,
	onDragging,
	initialPosition = { x: 0, y: 0 },
	style,
	resizable = false,
	onResizeStart,
	onResizeEnd,
	onResizing,
}: Props) => {
	const [isDragging, setIsDragging] = useState(false);
	const [pointerEvents, setPointerEvents] = useState(false);
	const [isResizing, setIsResizing] = useState<ResizeHandle>(null);
	const [position, setPosition] = useState(initialPosition);
	const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });

	const offset = useRef({ x: 0, y: 0 });
	const resizeStartData = useRef({
		startX: 0,
		startY: 0,
		startWidth: 0,
		startHeight: 0,
		startLeft: 0,
		startTop: 0,
	});

	const iframeRef = useRef<HTMLIFrameElement>(null);
	const hasIframeInitialized = useRef(false);
	const [onWidgetLoadData, setOnWidgetLoadData] = useState<OnWidgetLoadData | undefined>(undefined);
	const [currentScriptVersion, setCurrentScriptVersion] = useState(scriptVersion);
	const widgetIdRef = useRef(id);

	const pendingDataRef = useRef<OnWidgetLoadData | undefined>(undefined);
	const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const updateIframeScript = async () => {
		const res = await fetch(`/api/update-iframe-files`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ overlayID: overlay.id, widgetID: id }),
		});
		const data = await res.json();
		if (!res.ok) {
			toast.error(`Something went wrong while updating iframe files for ${id}`);
			throw new Error(`Something went wrong while updating iframe files for ${id}`);
		}
		onSettingsChange(overlay.id, {
			name: name,
			id: id,
			src: src,
			template: template,
			scriptVersion: data.scriptVersion,

			width: Math.max(dimensions.width, 50),
			height: Math.max(dimensions.height, 50),
			posX: position.x,
			posY: position.y,
		});
		toast.success(`Successfully updated iframe files for ${name}`);
		setCurrentScriptVersion(data.scriptVersion);
	};

	const getOnWidgetLoadData = useCallback(async () => {
		try {
			const [data, fieldData] = await Promise.all([
				fetchOnWidgetLoad(),
				useFields(overlay.id, widgetIdRef.current),
			]);

			if (data && fieldData) {
				const combinedData = {
					...data,
					fieldData: { ...fieldData },
					widgetId: widgetIdRef.current,
				};
				setOnWidgetLoadData(combinedData);
				return combinedData;
			}
		} catch (error) {
			console.error('[Parent App] Error getting widget load data:', error);
		}
		return undefined;
	}, [overlay]);

	// Send data to iframe with retry mechanism
	const sendDataToIframe = useCallback((data: OnWidgetLoadData, retryCount = 0) => {
		if (!iframeRef.current?.contentWindow) {
			if (retryCount < 3) {
				console.warn(`[Parent App] Iframe not ready, retrying... (${retryCount + 1}/3)`);
				retryTimeoutRef.current = setTimeout(() => {
					sendDataToIframe(data, retryCount + 1);
				}, 100);
			} else {
				console.error('[Parent App] Failed to send data to iframe after 3 retries');
			}
			return;
		}

		try {
			const messageToSend = {
				listener: 'onWidgetLoad',
				detail: data,
			};
			iframeRef.current.contentWindow.postMessage(messageToSend, '*');
			// console.log(`[Parent App] Data sent to iframe ${widgetIdRef.current}`);
		} catch (error) {
			console.error('[Parent App] Error sending message to iframe:', error);
		}
	}, []);

	useEffect(() => {
		getOnWidgetLoadData();

		return () => {
			if (retryTimeoutRef.current) {
				clearTimeout(retryTimeoutRef.current);
			}
		};
	}, [getOnWidgetLoadData]);

	useEffect(() => {
		const handleIncomingMessage = (event: MessageEvent) => {
			// More permissive origin check for development
			const allowedOrigins = ['http://localhost:5173', 'null', window.location.origin];
			if (!allowedOrigins.includes(event.origin)) {
				console.warn('[Parent App] Message from unknown origin:', event.origin);
				return;
			}

			if (typeof event.data !== 'object' || event.data === null) {
				return;
			}

			const { type, listener, iframeId } = event.data; // widgetId: messageWidgetId,

			// Match by iframe element ID instead of widget ID
			if (iframeId && iframeId !== id) {
				return;
			}

			switch (type || listener) {
				case 'iframeInitialized':
					// console.log(`[Parent App] Iframe initialized for ${widgetIdRef.current}`);
					hasIframeInitialized.current = true;

					// Send data immediately if available
					if (onWidgetLoadData) {
						sendDataToIframe(onWidgetLoadData);
					} else if (pendingDataRef.current) {
						sendDataToIframe(pendingDataRef.current);
					} else {
						console.warn('[Parent App] No data available to send to initialized iframe');
					}
					break;

				case 'widgetLoadComplete':
					// console.log(`[Parent App] Widget load complete for ${widgetIdRef.current}`);
					break;

				case 'widgetLoadError':
					console.error(`[Parent App] Widget load error for ${widgetIdRef.current}:`, event.data.error);
					break;

				default:
				// Uncomment for debugging
				// console.log('[Parent App] Unknown message type from iframe:', event.data);
			}
		};

		window.addEventListener('message', handleIncomingMessage);
		return () => {
			window.removeEventListener('message', handleIncomingMessage);
		};
	}, [onWidgetLoadData, sendDataToIframe, id]);

	// Handle data updates
	useEffect(() => {
		if (onWidgetLoadData) {
			pendingDataRef.current = onWidgetLoadData;

			if (hasIframeInitialized.current) {
				sendDataToIframe(onWidgetLoadData);
			}
		}
	}, [onWidgetLoadData, sendDataToIframe]);

	useEffect(() => {
		if (!import.meta.hot) {
			return;
		}

		const handleIframeContentUpdate = async (dataPayloadFromPlugin: any) => {
			if (dataPayloadFromPlugin?.file && dataPayloadFromPlugin?.type) {
				const { widgetId: incomingWidgetId } = dataPayloadFromPlugin;

				if (incomingWidgetId === widgetIdRef.current) {
					// console.log(`[Parent App] Hot reload triggered for ${widgetIdRef.current}`);

					if (iframeRef.current) {
						hasIframeInitialized.current = false;

						try {
							const newData = await getOnWidgetLoadData();
							if (newData) {
								pendingDataRef.current = newData;
							}
							iframeRef.current.contentWindow?.location.reload();
						} catch (error) {
							console.error('[Parent App] Error during hot reload:', error);
						}
					}
				}
			}
		};

		import.meta.hot.on('iframe-content-update', handleIframeContentUpdate);

		return () => {
			if (import.meta.hot) {
				import.meta.hot.off('iframe-content-update', handleIframeContentUpdate);
			}
		};
	}, [getOnWidgetLoadData]);

	const widgetRef = useRef<HTMLDivElement>(null);

	const handleGlobalMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isDragging) {
				const newX = e.clientX - offset.current.x;
				const newY = e.clientY - offset.current.y;
				setPosition({ x: newX, y: newY });
				onDragging?.(e as unknown as React.MouseEvent<HTMLDivElement>, { x: newX, y: newY });
			} else if (isResizing) {
				const { startX, startY, startWidth, startHeight, startLeft, startTop } = resizeStartData.current;
				let newWidth = dimensions.width;
				let newHeight = dimensions.height;
				let newX = position.x;
				let newY = position.y;

				switch (isResizing) {
					case 'bottom-right':
						newWidth = startWidth + (e.clientX - startX);
						newHeight = startHeight + (e.clientY - startY);
						break;
					case 'bottom-left':
						newWidth = startWidth - (e.clientX - startX);
						newHeight = startHeight + (e.clientY - startY);
						newX = startLeft + (e.clientX - startX);
						break;
					case 'top-right':
						newWidth = startWidth + (e.clientX - startX);
						newHeight = startHeight - (e.clientY - startY);
						newY = startTop + (e.clientY - startY);
						break;
					case 'top-left':
						newWidth = startWidth - (e.clientX - startX);
						newHeight = startHeight - (e.clientY - startY);
						newX = startLeft + (e.clientX - startX);
						newY = startTop + (e.clientY - startY);
						break;
				}

				newWidth = Math.max(newWidth, 50);
				newHeight = Math.max(newHeight, 50);

				setDimensions({ width: newWidth, height: newHeight });
				setPosition({ x: newX, y: newY });

				onResizing?.(
					e as unknown as React.MouseEvent<HTMLDivElement>,
					{ width: newWidth, height: newHeight },
					{ x: newX, y: newY }
				);
			}
		},
		[isDragging, isResizing, position, dimensions, onDragging, onResizing]
	);

	const handleGlobalMouseUp = useCallback(
		(e: MouseEvent) => {
			if (isDragging) {
				setIsDragging(false);
				onDragEnd?.(e as unknown as React.MouseEvent<HTMLDivElement>, position);
			} else if (isResizing) {
				const currentDims = {
					width: Math.max(dimensions.width, 50),
					height: Math.max(dimensions.height, 50),
				};
				setIsResizing(null);
				onResizeEnd?.(e as unknown as React.MouseEvent<HTMLDivElement>, currentDims, position);
			}
			onSettingsChange(overlay.id, {
				name: name,
				id: id,
				src: src,
				template: template,
				scriptVersion: scriptVersion,

				width: Math.max(dimensions.width, 50),
				height: Math.max(dimensions.height, 50),
				posX: position.x,
				posY: position.y,
			});
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
		},
		[
			isDragging,
			isResizing,
			position,
			dimensions,
			onDragEnd,
			onResizeEnd,
			handleGlobalMouseMove,
			overlay,
			id,
			name,
			template,
			src,
			onSettingsChange,
		]
	);

	useEffect(() => {
		if (isDragging || isResizing) {
			document.addEventListener('mousemove', handleGlobalMouseMove);
			document.addEventListener('mouseup', handleGlobalMouseUp);
		}
		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
		};
	}, [isDragging, isResizing, handleGlobalMouseMove, handleGlobalMouseUp]);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target instanceof HTMLElement) {
			if (e.target.dataset.resizeHandle || e.target.closest('.widget-remove-button')) {
				return;
			}
		}

		if (widgetRef.current) {
			setIsDragging(true);
			const rect = widgetRef.current.getBoundingClientRect();
			offset.current = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			};
			onDragStart?.(e);
		}
	};

	const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, handle: ResizeHandle) => {
		e.stopPropagation();
		if (widgetRef.current && handle) {
			setIsResizing(handle);
			resizeStartData.current = {
				startX: e.clientX,
				startY: e.clientY,
				startWidth: dimensions.width,
				startHeight: dimensions.height,
				startLeft: position.x,
				startTop: position.y,
			};
			onResizeStart?.(e, handle);
		}
	};

	useEffect(() => {
		setDimensions({ width: initialWidth, height: initialHeight });
	}, [initialWidth, initialHeight]);

	const combinedStyle: CSSProperties = {
		position: 'absolute',
		left: position.x,
		top: position.y,
		width: dimensions.width,
		height: dimensions.height,
		cursor: isDragging ? 'grabbing' : isResizing ? 'grabbing' : 'grab',
		userSelect: 'none',
		boxSizing: 'border-box',
		...style,
	};

	return (
		<div
			className="widget-container relative depth-shadow"
			ref={widgetRef}
			style={combinedStyle}
			onClick={onClick}
			onMouseDown={handleMouseDown}>
			{currentScriptVersion == 1.3 ? (
				<iframe
					ref={iframeRef}
					id={id}
					name={name}
					src={src}
					sandbox="allow-scripts allow-same-origin"
					className={pointerEvents ? 'pointer-events-auto' : 'pointer-events-none'}
				/>
			) : (
				<div className="script-notice flex gap-4 p-4 py-3 bg-zinc-50 dark:bg-zinc-900">
					<i className="bi bi-exclamation-diamond-fill text-md text-rose-500 opacity-50"></i>
					<div className="flex flex-col gap-1 justify-center">
						<span className="text-[0.75rem] flex items-center gap-1">
							<p className="opacity-50">Script is outdated</p>
							<Tooltip>
								<TooltipTrigger>
									<i className="bi bi-question-circle-fill opacity-50 hover:opacity-75"></i>
								</TooltipTrigger>
								<TooltipContent className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200 depth-shadow">
									{' '}
									<p className="text-center">
										This widget was created on an older version of the app,
										<br />
										and requires the iframe files to be updated in order to work properly.
									</p>{' '}
								</TooltipContent>
							</Tooltip>
						</span>
						<p className="text-[0.875rem] text-zinc-900 dark:text-zinc-300">Click the button to update</p>
					</div>
					<Button
						variant="secondary"
						className="bg-zinc-900 hover:bg-zinc-700 text-zinc-300 dark:bg-zinc-50 dark:hover:bg-zinc-300 dark:text-zinc-900 h-8"
						onClick={() => updateIframeScript()}>
						{' '}
						Update{' '}
					</Button>
				</div>
			)}
			<div className="widget-context-menu absolute top-0 right-0">
				{/* <SubtleButton width="2rem" height="2rem" onClick={onDelete}>
					<IconTrash />
				</SubtleButton> */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SubtleButton width="2rem" height="2rem">
							<EllipsisVertical strokeWidth={1} />
						</SubtleButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem disabled>Rename</DropdownMenuItem>
						<DropdownMenuItem disabled>Export</DropdownMenuItem>
						<DropdownMenuItem disabled>Make a template</DropdownMenuItem>
						<DropdownMenuItem disabled>Open folder</DropdownMenuItem>
						<DropdownMenuItem disabled>Open in Editor</DropdownMenuItem>
						<CustomCheckboxItem mirror={true} checked={pointerEvents} onCheckedChange={setPointerEvents}>
							Pointer events
						</CustomCheckboxItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="text-red-500 hover:bg-red-500/20! hover:text-red-500!"
							onClick={onDelete}>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{resizable && (
				<>
					<div
						className="resize-handle top-left"
						data-resize-handle="top-left"
						onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
					/>
					<div
						className="resize-handle top-right"
						data-resize-handle="top-right"
						onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
					/>
					<div
						className="resize-handle bottom-left"
						data-resize-handle="bottom-left"
						onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
					/>
					<div
						className="resize-handle bottom-right"
						data-resize-handle="bottom-right"
						onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
					/>
				</>
			)}
		</div>
	);
};

export default Widget;
