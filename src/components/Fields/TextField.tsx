import { useState } from 'react';
import './fields.css';
import useFieldChange from '../../hooks/useFieldChange';

interface Props {
	fieldKey?: string;
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: string;
}

const TextField = ({ fieldKey, overlay, widget, name, label, value = '' }: Props) => {
	const [inputValue, setInputValue] = useState(value);
	const labelChars = label
		.replaceAll(' ', '\u00a0')
		.split('')
		.map((e, i) => (
			<span className="label-char" key={i} style={{ '--index': i } as React.CSSProperties}>
				{e}
			</span>
		));

	return (
		<div key={fieldKey} className="text-field">
			<input
				name={name}
				id={name}
				type="text"
				value={inputValue}
				required
				onChange={(event) => {
					setInputValue(event.target.value);
					useFieldChange(overlay, widget, name, event.target.value);
				}}
			/>
			<span className="bar"></span>
			<label className="label" htmlFor={name}>
				{labelChars}
			</label>
		</div>
	);
};

export default TextField;
