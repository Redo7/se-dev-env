import { useCallback, useEffect, useRef, useState } from 'react';
import './fields.css';
import type { WidgetInstance } from '@/types/index';
import { getOpenFieldGroups, toggleFieldGroup } from '@/utils/openFieldGroups';

interface Props {
	children: React.ReactNode;
	name: string;
	widget: WidgetInstance | undefined;
}

const FieldGroup = ({ children, name, widget }: Props) => {
	const fieldGroupID = `${widget?.id}-${name[0].toLowerCase() + name.replaceAll(" ", "").slice(1)}`
	const [maxHeight, setMaxHeight] = useState<string>('0px');
	const contentRef = useRef<HTMLDivElement>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const [openIds, setOpenIds] = useState<Set<string>>(getOpenFieldGroups);

	const updateMaxHeight = useCallback(() => {
		if (!contentRef.current) return;
		
		const scrollHeight = contentRef.current.scrollHeight;
		const newHeight = `${scrollHeight}px`;
		
		setMaxHeight(prev => prev === newHeight ? prev : newHeight);
	}, []);

	const handleFieldGroupToggle = useCallback((isOpen: boolean) => {
		toggleFieldGroup(fieldGroupID, isOpen)
		setOpenIds(getOpenFieldGroups());
	}, []);

	// Update max-height when expansion state changes
	useEffect(() => {
		if (openIds.has(fieldGroupID)) {
			const timer = setTimeout(() => {
				updateMaxHeight();
			}, 10);
			return () => clearTimeout(timer);
		} else {
			setMaxHeight('0px');
		}
	}, [openIds, fieldGroupID, updateMaxHeight]);

	// Set up ResizeObserver to watch for content changes
	useEffect(() => {
		if (!contentRef.current) return;

		resizeObserverRef.current = new ResizeObserver(() => {
			if (openIds.has(fieldGroupID)) {
				updateMaxHeight();
			}
		});

		const observer = resizeObserverRef.current;
		const element = contentRef.current;
		
		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [openIds, updateMaxHeight]);

	// Public method to trigger height recalculation
	const recalcHeight = useCallback(() => {
		updateMaxHeight();
	}, [updateMaxHeight]);

	// Listen for custom height change events from children
	useEffect(() => {
		if (!contentRef.current) return;

		const handleFieldHeightChange = () => {
			setTimeout(() => {
				updateMaxHeight();
			}, 10);
		};

		const element = contentRef.current;
		element.addEventListener('fieldHeightChange', handleFieldHeightChange);

		return () => {
			element.removeEventListener('fieldHeightChange', handleFieldHeightChange);
		};
	}, [updateMaxHeight]);

	// Expose recalcHeight to children via ref
	useEffect(() => {
		if (contentRef.current) {
			(contentRef.current as any).recalcHeight = recalcHeight;
		}
	}, [recalcHeight]);

	return (
		<div className="field-group">
			<button className="field-group-btn" onClick={() => handleFieldGroupToggle(!openIds.has(fieldGroupID))}>
				{name}
			</button>
			<div
				ref={contentRef}
				className="field-group-accordion"
				style={{ 
					maxHeight: maxHeight,
					overflow: 'hidden',
					transition: 'max-height 0.3s ease-in-out'
				}}
				data-is-expanded={openIds.has(fieldGroupID)}>
				{children}
			</div>
		</div>
	);
};

export default FieldGroup;
