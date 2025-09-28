import * as React from 'react';
import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CustomCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem> {
	mirror?: boolean;
}

const CustomCheckboxItem = React.forwardRef<React.ElementRef<typeof DropdownMenuCheckboxItem>, CustomCheckboxItemProps>(
	({ mirror, className, children, ...props }, ref) => {
		return (
			<DropdownMenuCheckboxItem
				ref={ref}
				className={cn(mirror && 'pl-2! pr-8! [&>span]:left-[unset] [&>span]:right-2', className)}
				{...props}>
				{children}
			</DropdownMenuCheckboxItem>
		);
	}
);

CustomCheckboxItem.displayName = 'CustomCheckboxItem';

export { CustomCheckboxItem };
