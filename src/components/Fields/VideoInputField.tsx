import SubtleButton from '../Buttons/SubtleButton';
interface Props {
	name: string;
	label: string;
	value?: string;
}

const VideoInputField = ({ name, label, value }: Props) => {
	return (
		<div className="video-input-field">
			<label htmlFor={name}>{label}</label>
			{value && <video className="field-asset-preview" src={value} id={name} autoPlay loop muted />}
			<SubtleButton width="100%" height="1.5rem">
				Select a video
			</SubtleButton>
		</div>
	);
};

export default VideoInputField;
