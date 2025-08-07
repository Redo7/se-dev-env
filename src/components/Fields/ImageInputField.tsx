import SubtleButton from '../Buttons/SubtleButton';
interface Props {
	name: string;
	label: string;
	value?: string;
}

const ImageInputField = ({ name, label, value }: Props) => {
	return (
		<div className="image-input-field">
			<label htmlFor={name}>{label}</label>
			{value && <img className="field-asset-preview" src={value} alt={label} id={name} />}
			<SubtleButton width="100%" height="1.5rem">
				Select an Image
			</SubtleButton>
		</div>
	);
};

export default ImageInputField;
