import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SubtleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	width?: number | string;
	height?: number | string;
	padding?: string;
	cssClass?: string;
}

const SubtleButton = React.forwardRef<HTMLButtonElement, SubtleButtonProps>(
	({ children, width = '1.25rem', height = '1.25rem', padding, cssClass = 'subtle', style, ...props }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				className={cn(cssClass)}
				style={{ width, height, padding, ...style }}
				{...props}>
				{children}
			</button>
		);
	}
);

SubtleButton.displayName = 'SubtleButton';

export default SubtleButton;
