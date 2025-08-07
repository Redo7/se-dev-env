import { useState } from 'react';

interface Props {
	key: string;
	name: string;
	label: string;
	value: boolean;
}

const CheckboxField = ({ key, name, label, value }: Props) => {
	const [isChecked, setIsChecked] = useState(value);
	return (
		<label key={key} className="checkbox-container">
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
