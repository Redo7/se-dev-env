import { useRef, useState, type CSSProperties, useEffect, useCallback } from 'react';
import SubtleButton from './Buttons/SubtleButton';
import IconTrash from '../assets/Icons/IconTrash';
import useFields from '../hooks/useFieldData';

interface Props {
	overlay: string;
	template: string;
	id: string;
	src: string;
	width: number;
	height: number;
	onClick: () => void;
	onDelete: () => void;
	onSettingsChange: (id: string, width: number, height: number, posX: number, posY: number) => void;

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

	const getOnWidgetLoadData = useCallback(async () => {
		const [data, fieldData] = await Promise.all([fetchOnWidgetLoad(), useFields(overlay, `${template}-${id}`)]);

		if (data && fieldData) {
			const combinedData = { ...data, fieldData: { ...fieldData } };
			setOnWidgetLoadData(combinedData);
		}
	}, [overlay, template, id]);

	useEffect(() => {
		getOnWidgetLoadData();
	}, [getOnWidgetLoadData]);

	useEffect(() => {
		const handleIncomingMessage = (event: MessageEvent) => {
			if (event.origin !== 'http://localhost:5173' && event.origin !== 'null') {
				console.warn('[Parent App] Message from unknown origin:', event.origin);
				return;
			}

			if (typeof event.data !== 'object' || event.data === null || (!event.data.type && !event.data.listener)) {
				return;
			}

			const { type, listener, detail } = event.data;

			switch (type || listener) {
				case 'iframeInitialized':
					if (!hasIframeInitialized.current && onWidgetLoadData) {
						hasIframeInitialized.current = true;
						if (iframeRef.current && iframeRef.current.contentWindow) {
							const messageToSend = {
								listener: 'onWidgetLoad',
								detail: {
									...onWidgetLoadData,
								},
							};
							iframeRef.current.contentWindow.postMessage(messageToSend, '*');
						}
					} else if (!onWidgetLoadData) {
						console.warn('[Parent App] iframeInitialized received, but onWidgetLoad data not yet loaded.');
					}
					break;
				default:
				// console.log('[Parent App] Unknown message type from iframe:', event.data);
			}
		};

		window.addEventListener('message', handleIncomingMessage);
		return () => {
			window.removeEventListener('message', handleIncomingMessage);
		};
	}, [onWidgetLoadData]);

	useEffect(() => {
		if (!import.meta.hot) {
			return;
		}

		const handleIframeContentUpdate = async (dataPayloadFromPlugin: any) => {
			if (dataPayloadFromPlugin && dataPayloadFromPlugin.file && dataPayloadFromPlugin.type) {
				const { widgetId: incomingWidgetId } = dataPayloadFromPlugin;

				if (incomingWidgetId === `${template}-${id}`) {
					if (iframeRef.current) {
						hasIframeInitialized.current = false;
						await getOnWidgetLoadData();
						iframeRef.current.contentWindow?.location.reload();
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
	}, [id, template, getOnWidgetLoadData]);

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
				id,
				Math.max(dimensions.width, 50),
				Math.max(dimensions.height, 50),
				position.x,
				position.y
			);
			document.removeEventListener('mousemove', handleGlobalMouseMove);
			document.removeEventListener('mouseup', handleGlobalMouseUp);
		},
		[isDragging, isResizing, position, dimensions, onDragEnd, onResizeEnd, handleGlobalMouseMove]
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
			<iframe ref={iframeRef} id={id} src={src}></iframe>

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