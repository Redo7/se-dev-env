import { useState } from 'react';
import useFieldChange from '../../hooks/useFieldChange';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value: boolean;
}

const CheckboxField = ({ overlay, widget, name, label, value }: Props) => {
	const [isChecked, setIsChecked] = useState(value);
	const handleCheckboxClick = () => {
		setIsChecked(!isChecked);
		useFieldChange(overlay, widget, name, !isChecked);
	}
	return (
		<label className="checkbox-container">
			<input
				name={name}
				id={name}
				className="custom-checkbox"
				checked={isChecked}
				onChange={() => handleCheckboxClick()}
				type="checkbox"
			/>
			<span className="checkmark"></span>
			<label htmlFor="asd" onClick={() => handleCheckboxClick()}>
				{label}
			</label>
		</label>
	);
};

export default CheckboxField;
