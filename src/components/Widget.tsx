import { useRef, useState, type CSSProperties, useEffect, useCallback } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import IconTrash from '../assets/Icons/IconTrash';
import useFields from '../hooks/useFieldData';
import type { WidgetInstance } from '../types/widget';

interface Props {
	overlay: string;
	template: string;
	id: string;
	name: string;
	src: string;
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
		return undefined;
	}
};

const Widget = ({
	overlay,
	template,
	name,
	id,
	src,
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
	const widgetIdRef = useRef(`${template}-${id}`);
	const pendingDataRef = useRef<OnWidgetLoadData | undefined>(undefined);
	const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const getOnWidgetLoadData = useCallback(async () => {
		try {
			const [data, fieldData] = await Promise.all([
				fetchOnWidgetLoad(), 
				useFields(overlay, widgetIdRef.current)
			]);

			if (data && fieldData) {
				const combinedData = { 
					...data, 
					fieldData: { ...fieldData },
					widgetId: widgetIdRef.current
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
			console.log(`[Parent App] Data sent to iframe ${widgetIdRef.current}`);
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

			const { type, listener, widgetId: messageWidgetId, iframeId } = event.data;

			// Match by iframe element ID instead of widget ID
			if (iframeId && iframeId !== id) {
				return;
			}

			switch (type || listener) {
				case 'iframeInitialized':
					console.log(`[Parent App] Iframe initialized for ${widgetIdRef.current}`);
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
					console.log(`[Parent App] Widget load complete for ${widgetIdRef.current}`);
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
					console.log(`[Parent App] Hot reload triggered for ${widgetIdRef.current}`);
					
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
			onSettingsChange(
				overlay,
				{	
					id: id,
					name: name,
					template: template,
					src: src,
				
					width: Math.max(dimensions.width, 50),
					height: Math.max(dimensions.height, 50),
					posX: position.x,
					posY: position.y
				}
			);
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
		},
		[isDragging, isResizing, position, dimensions, onDragEnd, onResizeEnd, handleGlobalMouseMove, overlay, id, name, template, src, onSettingsChange]
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
			<div className="widget-remove-button absolute top-0 right-0 z-20">
				<SubtleButton width="2rem" height="2rem" onClick={onDelete}>
					<IconTrash />
				</SubtleButton>
			</div>
			<iframe 
				ref={iframeRef} 
				id={id} 
				src={src} 
				sandbox='allow-scripts allow-same-origin'
				style={{ width: '100%', height: '100%', border: 'none' }}
			/>

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