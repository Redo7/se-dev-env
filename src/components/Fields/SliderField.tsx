import './fields.css';

interface Props {
	fieldKey: string;
	name: string;
	label: string;
	value?: number;
	min: number;
	max: number;
	step?: number;
}

const SliderField = ({ fieldKey, name, label, value = 0, min, max, step = 1 }: Props) => {
	return (
		<div key={fieldKey} className="slider-field">
			<label htmlFor={name}>{label}</label>
			<input type="range" name={name} id={name} min={min} defaultValue={value} max={max} step={step} />
			<div className="slider-field-range">
				<p>{min}</p>
				<p>{max}</p>
			</div>
		</div>
	);
};

export default SliderField;
