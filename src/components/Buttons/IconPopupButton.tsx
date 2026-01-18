import React, { useEffect, useRef, useState } from 'react';
import './Buttons.css';
import '../../App.css';
import SubtleButton from './SubtleButton';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface Props {
	icon: React.ReactNode;
	popupItems?: {
		label: string;
		icon?: React.ReactNode;
		action: (name: string) => void;
	}[];
	children?: (closePopup: () => void) => React.ReactNode;
	popupPosition?: 'top' | 'bottom' | 'left' | 'right';
	disabled?: boolean;
	onClose?: () => void;
}

const IconPopupButton = ({ children, icon, popupItems, popupPosition }: Props) => {
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);
	const closePopup = () => setIsPopupVisible(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')
			) {
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

	if(popupItems && children) return;

	return (
		<div className="icon-button-container" style={{ position: 'relative' }}>
			<button
				className="regular depth-shadow"
				ref={buttonRef}
				onClick={() => setIsPopupVisible(!isPopupVisible)}>
				{icon}
			</button>
			{isPopupVisible && children && <>{children(closePopup)}</>}
			{isPopupVisible && popupItems && (
				<div
					ref={popupRef}
					className={`popup-list popup-${popupPosition}`}
					style={{
						position: 'absolute',
						...getPopupPosition(),
					}}>
					{popupItems.sort((a, b) => {
                        const nameA = a.label[0].toLowerCase();
                        const nameB = b.label[0].toLowerCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    }).map((item, index) => (
						<Popover key={index}>
							<PopoverTrigger asChild>
								<div className="popup-item">
									<button className="popup-trigger">
										{item.icon && <span className="popup-icon">{item.icon}</span>}
										<span className="popup-label">{item.label}</span>
									</button>
								</div>
							</PopoverTrigger>
							<PopoverContent
								className="flex flex-col gap-4"
								onOpenAutoFocus={(e) => e.preventDefault()}
								onInteractOutside={(event) => {
									if ((event.target as HTMLElement).closest('button')) {
										event.preventDefault();
									}
								}}
								style={{ zIndex: 1000 }}>
								<div>
									<Label htmlFor="name">Widget name</Label>
									<Input ref={nameRef} id="name" placeholder="Widget name" />
								</div>
								<SubtleButton
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										if (nameRef.current) {
											item.action(nameRef.current.value);
											setIsPopupVisible(false);
										}
									}}
									width="100%"
									height="2rem">
									Create
								</SubtleButton>
							</PopoverContent>
						</Popover>
					))}
					<SubtleButton width="100%">+</SubtleButton>
				</div>
			)}
		</div>
	);
};

export default IconPopupButton;
