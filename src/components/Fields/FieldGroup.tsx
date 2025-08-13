import { useCallback, useEffect, useRef, useState } from 'react';
import './fields.css';

interface Props {
	children: React.ReactNode;
	name: string;
}

const FieldGroup = ({ children, name }: Props) => {
	const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
	const [maxHeight, setMaxHeight] = useState<string>('0px');
	const contentRef = useRef<HTMLDivElement>(null);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);

	const updateMaxHeight = useCallback(() => {
		if (!contentRef.current) return;
		
		if (isAccordionExpanded) {
			// Measure the content height
			const scrollHeight = contentRef.current.scrollHeight;
			setMaxHeight(`${scrollHeight}px`);
		} else {
			setMaxHeight('0px');
		}
	}, [isAccordionExpanded]);

	const toggleAccordion = useCallback(() => {
		setIsAccordionExpanded(prev => !prev);
	}, []);

	// Update max-height when expansion state changes
	useEffect(() => {
		// Small delay to ensure DOM is ready
		const timer = setTimeout(() => {
			updateMaxHeight();
		}, 10);

		return () => clearTimeout(timer);
	}, [isAccordionExpanded, updateMaxHeight]);

	// Set up ResizeObserver to watch for content changes
	useEffect(() => {
		if (!contentRef.current) return;

		resizeObserverRef.current = new ResizeObserver(() => {
			if (isAccordionExpanded) {
				updateMaxHeight();
			}
		});

		const observer = resizeObserverRef.current;
		const element = contentRef.current;
		
		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [isAccordionExpanded, updateMaxHeight]);

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
			<button className="field-group-btn" onClick={toggleAccordion}>
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
				data-is-expanded={isAccordionExpanded}>
				{children}
			</div>
		</div>
	);
};

export default FieldGroup;