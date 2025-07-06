interface Props {
	children: React.ReactNode;
	width?: number | string;
	height?: number | string;
	cssClass?: string;
	onClick?: () => void;
}

const SubtleButton = ({ children, width = '1.25rem', height = '1.25rem', cssClass = 'subtle', onClick }: Props) => {
	const buttonStyle = {
		width: width,
		height: height,
	};
	return (
		<button className={cssClass} style={buttonStyle} onClick={onClick}>
			{children}
		</button>
	);
};

export default SubtleButton;
