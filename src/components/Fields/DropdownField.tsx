import ReactDropdown, { type Group, type Option } from 'react-dropdown';

interface Props {
	fieldKey?: string;
	name: string;
	label: string;
	value: string;
	options: (Group | Option | string)[];
}

const DropdownField = ({ fieldKey, name, label, value, options }: Props) => {
	const convertedOptions: Option[] = Object.entries(options).map(([objKey, val]) => ({
		value: objKey,
		label: val,
	}));

	return (
		<div key={fieldKey} className="dropdown-field">
			<label>{label}</label>
			<ReactDropdown name={name} value={value} options={convertedOptions} placeholder="Choose an option" />
		</div>
	);
};

export default DropdownField;
