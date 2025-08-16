// import ReactDropdown, { type Group, type Option } from 'react-dropdown';
import useFieldChange from '../../hooks/useFieldChange';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value: string;
	options: Object;
}

const DropdownField = ({ overlay, widget, name, label, value, options }: Props) => {
	const [open, setOpen] = useState(false);
	const convertedOptions = Object.entries(options).map(([objKey, val]) => ({
		value: objKey,
		label: val.toString(),
	}));

	const initialKey =
	convertedOptions.find((option) => option.label === value)?.value || value;

	const [inputValue, setInputValue] = useState(initialKey);

	const handleChange = (value: string) => {
		setInputValue(value);
		useFieldChange(overlay, widget, name, value);
	};

	return (
		<div className="dropdown-field">
			<Label>{label}</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between">
						{inputValue ? convertedOptions.find((option) => option.value === inputValue)?.label : "Select options..."}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search options..." className="h-9" />
						<CommandList>
							<CommandEmpty>No option found.</CommandEmpty>
							<CommandGroup>
								{convertedOptions.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={(currentValue) => {
											setOpen(false);
											handleChange(currentValue);
										}}>
										{option.label}
										<Check
											className={cn(
												'ml-auto',
												inputValue === option.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DropdownField;
