interface Props {
	fieldKey: string;
	name: string;
	label: string;
	value?: string | number | boolean;
}

const HiddenField = ({ fieldKey, name, label, value = '' }: Props) => {
	// Implement max length that matches SE then truncate
	if (label.length >= 34) {
		label = label.substring(0, 33) + '...';
	}
	return (
		<div key={fieldKey} className="hidden-field">
			<label id={name}>{label}</label>
		</div>
	);
};

export default HiddenField;
