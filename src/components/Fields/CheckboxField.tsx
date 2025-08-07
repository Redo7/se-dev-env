import { useState } from 'react';

interface Props {
	name: string;
	label: string;
	value: boolean;
}

const CheckboxField = ({ name, label, value }: Props) => {
	const [isChecked, setIsChecked] = useState(value);
	return (
		<label className="checkbox-container">
			<input
				name={name}
				id={name}
				className="custom-checkbox"
				checked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
				type="checkbox"
			/>
			<span className="checkmark"></span>
			<label htmlFor="asd" onClick={() => setIsChecked(!isChecked)}>
				{label}
			</label>
		</label>
	);
};

export default CheckboxField;
