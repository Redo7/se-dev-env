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
					if(isNaN(parseInt(event.target.value))) return;
					setInputValue(parseInt(event.target.value));
					useFieldChange(overlay, widget, name, parseInt(event.target.value));
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
