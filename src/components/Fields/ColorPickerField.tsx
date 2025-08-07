import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import TextField from './TextField';
import { useState } from 'react';

interface Props {
	name: string;
	label: string;
	overlay: string;
	widget: string;
	onColorPickerToggle: () => void;
}

const ColorPickerField = ({ name, label, overlay, widget, onColorPickerToggle }: Props) => {
	const [color, setColor] = useColor('#ed1b53');
	const [isVisible, setIsVisible] = useState(false);

	const handleToggle = () => {
		setIsVisible(!isVisible);
		requestAnimationFrame(() => onColorPickerToggle());
	};

	return (
		<div className="color-picker-field">
			<span className="color-circle" style={{ background: color.hex }} onClick={() => handleToggle()}></span>
			<TextField name={name} label={label} value={color.hex} overlay={overlay} widget={widget} />
			{isVisible && (
				<div className="color-picker-popup">
					<ColorPicker color={color} onChange={setColor} />
				</div>
			)}
		</div>
	);
};

export default ColorPickerField;
