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
	const [currentValueVisible, setCurrentValueVisible] = useState<Boolean>(false)
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
				onPointerDown={() => setCurrentValueVisible(true)}
				onPointerUp={() => setCurrentValueVisible(false)}
				onChange={(event) => {
					const value = event.target.value.includes('.') ? parseFloat(event.target.value) : parseInt(event.target.value)
					setInputValue(value);
					useFieldChange(overlay, widget, name, value);
				}}
			/>
			<div className="slider-field-range">
				<p>{min}</p>
				{/* <p>{inputValue}</p> */}
				<p>{max}</p>
				<p className='slider-field-current absolute' style={{"--slider-value": inputValue, "--max": max} as React.CSSProperties} data-value={inputValue} data-visible={currentValueVisible}>{inputValue}</p>
			</div>
		</div>
	);
};

export default SliderField;
