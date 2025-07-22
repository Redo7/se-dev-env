import ReactDropdown, { type Group, type Option } from 'react-dropdown';

interface Props {
	name: string;
	label: string;
	value: string;
	options: (Group | Option | string)[];
}

const DropdownField = ({ name, label, value, options }: Props) => {
	return (
		<div className="dropdown-field">
			<label>{label}</label>
			<ReactDropdown name={name} value={value} options={options} placeholder="Choose an option" />
		</div>
	);
};

export default DropdownField;
