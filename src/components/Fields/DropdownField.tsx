import ReactDropdown, { type Group, type Option } from 'react-dropdown';

interface Props {
	name: string;
	label: string;
	options: (Group | Option | string)[];
}

const DropdownField = ({ name, label, options }: Props) => {
	return (
		<div className="dropdown-field">
			<label>{label}</label>
			<ReactDropdown name={name} options={options} placeholder="Choose an option" />
		</div>
	);
};

export default DropdownField;
