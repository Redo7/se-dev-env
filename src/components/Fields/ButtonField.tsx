import SubtleButton from '../Buttons/SubtleButton';

interface Props {
	name: string;
	label: string;
}

const ButtonField = ({ name, label }: Props) => {
	const handleButtonClick = () => {
		
		const iframe = (document?.querySelector("iframe") as HTMLIFrameElement) 
		if (iframe?.contentWindow) {
			iframe.contentWindow.postMessage(
				{
					listener: "onEventReceived",
					detail: { event: { listener: "widget-button", field: name } }
				},
				"*"
			);
		}
	}
	return (
		<div className="button-field">
			<SubtleButton id={name} onClick={handleButtonClick} width="fit-content" padding=".25rem .75rem" height="2rem">
				{label}
			</SubtleButton>
		</div>
	);
};

export default ButtonField;
