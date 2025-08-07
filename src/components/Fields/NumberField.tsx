import { useState } from 'react';
import './fields.css';

interface Props {
	fieldKey: string;
	name: string;
	label: string;
	value?: number | '';
	min?: number;
	max?: number;
	step?: number;
}

const NumberField = ({ fieldKey, name, label, value = 0 }: Props) => {
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
		<div key={fieldKey} className="number-field">
			<input
				name={name}
				id={name}
				type="number"
				value={inputValue}
				required
				onChange={(event) => setInputValue(parseInt(event.target.value))}
			/>
			<span className="bar"></span>
			<label className="label" htmlFor={name}>
				{labelChars}
			</label>
		</div>
	);
};

export default NumberField;
