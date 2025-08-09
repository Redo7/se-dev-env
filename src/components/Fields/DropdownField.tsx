import ReactDropdown, { type Group, type Option } from 'react-dropdown';
import useFieldChange from '../../hooks/useFieldChange';
import { useState } from 'react';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value: string;
	options: (Group | Option | string)[] | Object;
}

const DropdownField = ({ overlay, widget, name, label, value, options }: Props) => {
	const [inputValue, setInputValue] = useState(value);
	const convertedOptions: Option[] = Object.entries(options).map(([objKey, val]) => ({
		value: objKey,
		label: val.toString(),
	}));

	const handleChange = (option: Option) => {
		console.log(option.value)
		setInputValue(option.value)
		useFieldChange(overlay, widget, name, option.value);
	};

	return (
		<div className="dropdown-field">
			<label>{label}</label>
			<ReactDropdown name={name} value={inputValue} onChange={handleChange} options={convertedOptions} placeholder="Choose an option" />
		</div>
	);
};

export default DropdownField;
