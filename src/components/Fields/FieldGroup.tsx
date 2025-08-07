import { useCallback, useEffect, useRef, useState } from 'react';
import './fields.css';

interface Props {
	children: React.ReactNode;
	name: string;
}

const FieldGroup = ({ children, name }: Props) => {
	const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const [contentVersion, setContentVersion] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggleAccordion = () => {
		setIsAccordionExpanded((prev) => {
			if (!prev) {
				requestAnimationFrame(() => setContentVersion((v) => v + 1));
			}
			return !prev;
		});
	};

	// Something causes the field group to not open sometimes
	useEffect(() => {
		if (!contentRef.current) {
			return;
		}

		if (isAccordionExpanded) {
			const prevHeight = contentRef.current.offsetHeight;
			contentRef.current.style.height = 'auto';

			requestAnimationFrame(() => {
				if (contentRef.current) {
					const newScrollHeight = contentRef.current.scrollHeight;
					contentRef.current.style.height = `${prevHeight}px`;

					requestAnimationFrame(() => {
						setContentHeight(newScrollHeight);
					});
				}
			});
		} else {
			setContentHeight(contentRef.current.scrollHeight);
			requestAnimationFrame(() => {
				setContentHeight(0);
			});
		}
	}, [isAccordionExpanded, contentVersion]);

	const recalcHeight = useCallback(() => {
		setContentVersion((prev) => prev + 1);
	}, []);

	return (
		<div className="field-group">
			<button className="field-group-btn" onClick={toggleAccordion}>
				{name}
			</button>
			<div
				ref={contentRef}
				className="field-group-accordion"
				style={{ height: contentHeight }}
				data-is-expanded={isAccordionExpanded}>
				{children}
			</div>
		</div>
	);
};

export default FieldGroup;
