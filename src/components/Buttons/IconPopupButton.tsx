import React, { useEffect, useRef, useState } from 'react';
import './Buttons.css';
import '../../App.css';
import SubtleButton from './SubtleButton';

interface Props {
	children: React.ReactNode;
	popupItems?: {
		label: string;
		icon?: React.ReactNode;
		action: () => void;
	}[];
	popupPosition?: 'top' | 'bottom' | 'left' | 'right';
	disabled?: boolean;
}

const IconPopupButton = ({ children, popupItems, popupPosition }: Props) => {
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
					setIsPopupVisible(false);
				}
			}
		};
		if (isPopupVisible) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isPopupVisible]);

	// Add a direction prop, which decides whether the list should go up or down (when set to left/right in popupPosition), left or right (when set to up/down in popupPositio )
	// Add a reverseList prop, which will reverse the flex-direction
	const getPopupPosition = () => {
		if (!buttonRef.current) return {};
		const buttonRect = buttonRef.current.getBoundingClientRect();
		switch (popupPosition) {
			case 'top':
				return { bottom: `${buttonRect.height}px`, left: '0%', transform: 'translateX(0%)', margin: '1rem 0' };
			case 'bottom':
				return { top: `${buttonRect.height}px`, left: '50%', transform: 'translateX(-50%)' };
			case 'left':
				return { right: `${buttonRect.width}px`, top: '50%', transform: 'translateY(-50%)' };
			case 'right':
				return { left: `${buttonRect.width}px`, top: '50%', transform: 'translateY(-50%)' };
			default:
				return {};
		}
	};

	return (
		<div className="icon-button-container" style={{ position: 'relative' }}>
			<button
				className="regular"
				ref={buttonRef}
				onClick={() => popupItems && setIsPopupVisible(!isPopupVisible)}>
				{children}
			</button>
			{isPopupVisible && popupItems && (
				<div
					ref={popupRef}
					className={`popup-list popup-${popupPosition}`}
					style={{
						position: 'absolute',
						...getPopupPosition(),
						zIndex: 1000,
					}}>
					{popupItems.map((item, index) => (
						<div
							key={index}
							className="popup-item"
							onClick={() => {
								item.action();
								setIsPopupVisible(false);
							}}>
							{item.icon && <span className="popup-icon">{item.icon}</span>}
							<span className="popup-label">{item.label}</span>
						</div>
					))}
					<SubtleButton width="100%">+</SubtleButton>
				</div>
			)}
		</div>
	);
};

export default IconPopupButton;
