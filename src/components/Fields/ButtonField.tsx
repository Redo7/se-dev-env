import SubtleButton from '../Buttons/SubtleButton';

interface Props {
	name: string;
	label: string;
    value: string;
}

const ButtonField = ({ name, label, value }: Props) => {
	const handleButtonClick = () => {
		const iframes = document?.querySelectorAll('iframe') as NodeListOf<HTMLIFrameElement>;
		iframes.forEach((iframe) => {
			if (iframe?.contentWindow) {
				const obj = {
						listener: 'onEventReceived',
						detail: { listener: 'event:test', event: { listener: 'widget-button', field: name, value: value, }, },
					};
				iframe.contentWindow.postMessage( obj, '*' );
			}
		});
	};
	return (
		<div className="button-field">
			<SubtleButton
				id={name}
				onClick={handleButtonClick}
				cssClass='subtle text-sm whitespace-nowrap'
				width="fit-content"
				padding=".25rem .75rem"
				height="2rem">
				{label}
			</SubtleButton>
		</div>
	);
};

export default ButtonField;
