import '../App.css';
import SubtleButton from './Buttons/SubtleButton';
import SidebarCollapse from '../assets/Icons/SidebarCollapse';
import { useRef, useState } from 'react';
import FieldGroup from './Fields/FieldGroup';

interface Props {
	isVisible: boolean;
	onToggle: () => void;
}

const Sidebar = ({ isVisible, onToggle }: Props) => {
	return (
		<div className="sidebar depth-shadow" data-sidebar-visible={isVisible}>
			<div className="sidebar-heading flex">
				<p className="sidebar-overlay-name">Overlay Name</p>
				<SubtleButton onClick={onToggle} cssClass="subtle flex center" width={24} height={24}>
					<SidebarCollapse />
				</SubtleButton>
			</div>
			<div className="sidebar-fields-container">
				<FieldGroup />
			</div>
			<div className="add-group-container">
				<SubtleButton width="100%">+</SubtleButton>
			</div>
		</div>
	);
};

export default Sidebar;
