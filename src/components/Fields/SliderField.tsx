import { useState } from 'react';
import './fields.css';
import useFieldChange from '../../hooks/useFieldChange';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: number;
	min: number;
	max: number;
	step?: number;
}

const SliderField = ({ overlay, widget, name, label, value = 0, min, max, step = 1 }: Props) => {
	const [inputValue, setInputValue] = useState<number | ''>(value);
	return (
		<div className="slider-field">
			<label htmlFor={name}>{label}</label>
			<input
				type="range"
				name={name}
				id={name}
				min={min}
				max={max}
				step={step}
				defaultValue={inputValue}
				onChange={(event) => {
					const value = event.target.value.includes('.') ? parseFloat(event.target.value) : parseInt(event.target.value)
					setInputValue(value);
					useFieldChange(overlay, widget, name, value);
				}}
			/>
			<div className="slider-field-range">
				<p>{min}</p>
				<p>{max}</p>
			</div>
		</div>
	);
};

export default SliderField;
