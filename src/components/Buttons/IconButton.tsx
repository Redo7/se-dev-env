import React from 'react';
import './Buttons.css';
import '../../App.css';

interface Props {
	children: React.ReactNode;
	onClick: () => void;
}

const IconButton = ({ children, onClick }: Props) => {
	return (
		<button className="regular depth-shadow" onClick={onClick}>
			{children}
		</button>
	);
};

export default IconButton;
