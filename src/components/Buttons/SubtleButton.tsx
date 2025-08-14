interface Props {
	children: React.ReactNode;
	width?: number | string;
	height?: number | string;
	padding?: string;
	cssClass?: string;
	id?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubtleButton = ({
	children,
	width = '1.25rem',
	height = '1.25rem',
	padding,
	cssClass = 'subtle',
	id,
	onClick,
}: Props) => {
	const buttonStyle = {
		width: width,
		height: height,
		padding: padding,
	};
	return (
		<button type="button" className={cssClass} id={id} style={buttonStyle} onClick={onClick}>
			{children}
		</button>
	);
};

export default SubtleButton;
