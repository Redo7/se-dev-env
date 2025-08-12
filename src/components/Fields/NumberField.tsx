import { useState } from 'react';
import './fields.css';
import useFieldChange from '../../hooks/useFieldChange';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: number | '';
	min?: number;
	max?: number;
	step?: number;
}

const NumberField = ({ overlay, widget, name, label, step = 1, value = 0 }: Props) => {
	const [inputValue, setInputValue] = useState<number | ''>(value);
	const labelChars = label
		.replaceAll(' ', '\u00a0')
		.split('')
		.map((e, i) => (
			<span className="label-char" key={i} style={{ '--index': i } as React.CSSProperties}>
				{e}
			</span>
		));

	return (
		<div className="number-field">
			<input
				name={name}
				id={name}
				step={step}
				type="number"
				value={inputValue}
				required
				onChange={(event) => {
					const rawValue = event.target.value;
					if (rawValue === '') {
						setInputValue(0);
						useFieldChange(overlay, widget, name, 0); // Or 0, depending on your default
						return;
					}
					const parsedValue = parseFloat(rawValue);
					if (isNaN(parsedValue)) { return; }
					setInputValue(parsedValue);
					useFieldChange(overlay, widget, name, parsedValue);
				}}
			/>
			<span className="bar"></span>
			<label className="label" htmlFor={name}>
				{labelChars}
			</label>
		</div>
	);
};

export default NumberField;
