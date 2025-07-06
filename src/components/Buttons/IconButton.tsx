import React from 'react';
import './Buttons.css';
import '../../App.css';

interface Props {
	children: React.ReactNode;
}

const IconButton = ({ children }: Props) => {
	return <button className="depthShadow">{children}</button>;
};

export default IconButton;
