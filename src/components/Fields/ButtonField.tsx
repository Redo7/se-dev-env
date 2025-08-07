import SubtleButton from '../Buttons/SubtleButton';

interface Props {
	key: string;
	name: string;
	label: string;
	value?: string;
}

const ButtonField = ({ key, name, label, value }: Props) => {
	return (
		<div key={key} className="button-field">
			<SubtleButton id={name} width="fit-content" padding=".25rem .75rem" height="2rem">
				{label}
			</SubtleButton>
		</div>
	);
};

export default ButtonField;
