import { ColorPicker, useColor, type IColor } from 'react-color-palette';
import 'react-color-palette/css';
import TextField from './TextField';
import { useEffect, useState, useRef, useCallback } from 'react';
import useFieldChange from '../../hooks/useFieldChange';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value: string;
	onColorPickerToggle?: () => void;
}

const ColorPickerField = ({ overlay, widget, name, label, value = '#ed1b53', onColorPickerToggle }: Props) => {
	const [color, setColor] = useColor(value);
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleColorChange = (val: IColor) => {
		setColor(val);
	};

	const handleTextFieldColorChange = (newHex: string) => {
		try {
			const newColor = toColor(newHex, color.rgb.a, color.hsv.a);
			setColor(newColor);
		} catch { }
	};

	function toColor(hex: string, rgbAlpha = 1, hsvAlpha = 100): IColor {
		hex = hex.replace(/^#/, '').trim();

		if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
			throw new Error('Invalid hex color');
		}

		// Normalize #fff to #ffffff
		if (hex.length === 3) {
			hex = hex
				.split('')
				.map((c) => c + c)
				.join('');
		}

		// RGB
		const num = parseInt(hex, 16);
		const r = (num >> 16) & 255;
		const g = (num >> 8) & 255;
		const b = num & 255;

		//HSV
		const rNorm = r / 255;
		const gNorm = g / 255;
		const bNorm = b / 255;
		const max = Math.max(rNorm, gNorm, bNorm);
		const min = Math.min(rNorm, gNorm, bNorm);
		const delta = max - min;

		let h = 0;
		if (delta !== 0) {
			if (max === rNorm) {
				h = ((gNorm - bNorm) / delta) % 6;
			} else if (max === gNorm) {
				h = (bNorm - rNorm) / delta + 2;
			} else {
				h = (rNorm - gNorm) / delta + 4;
			}
			h *= 60;
			if (h < 0) h += 360;
		}

		const s = max === 0 ? 0 : delta / max;
		const v = max;

		return {
			hex: `#${hex}`, // Always 6-digit hex
			rgb: { r, g, b, a: rgbAlpha }, // Preserve alpha
			hsv: { h, s: s * 100, v: v * 100, a: hsvAlpha }, // Preserve alpha
		};
	}

	// Trigger parent height recalculation
	const triggerParentRecalc = useCallback(() => {
		// Try multiple methods to trigger parent recalculation
		
		// Method 1: Call the callback if provided
		if (onColorPickerToggle) {
			onColorPickerToggle();
		}
		
		// Method 2: Find parent FieldGroup and call its recalcHeight method
		let parent = containerRef.current?.parentElement;
		while (parent) {
			if (parent.classList.contains('field-group-accordion')) {
				const recalcMethod = (parent as any).recalcHeight;
				if (typeof recalcMethod === 'function') {
					recalcMethod();
				}
				break;
			}
			parent = parent.parentElement;
		}
		
		// Method 3: Dispatch a custom event that parent can listen to
		if (containerRef.current) {
			const event = new CustomEvent('fieldHeightChange', {
				bubbles: true,
				detail: { component: 'ColorPickerField', expanded: isVisible }
			});
			containerRef.current.dispatchEvent(event);
		}
	}, [onColorPickerToggle, isVisible]);

	useEffect(() => {
		if (color.hex === value) return;
		const handler = setTimeout(() => {
			useFieldChange(overlay, widget, name, color.hex);
			console.log('writing data', color.hex);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [color, overlay, widget, name, value]);

	const handleToggle = useCallback(() => {
		setIsVisible(prev => {
			const newVisible = !prev;
			
			// Trigger parent recalculation after state update
			requestAnimationFrame(() => {
				triggerParentRecalc();
			});
			
			return newVisible;
		});
	}, [triggerParentRecalc]);

	// Also trigger recalc when visibility changes (backup)
	useEffect(() => {
		const timer = setTimeout(() => {
			triggerParentRecalc();
		}, 50); // Small delay to ensure DOM has updated

		return () => clearTimeout(timer);
	}, [isVisible, triggerParentRecalc]);

	return (
		<div className="color-picker-field" ref={containerRef}>
			<div className="color-picker-input">
				<span className="color-circle" style={{ background: color.hex }} onClick={handleToggle}></span>
				<TextField
					name={name}
					label={label}
					value={color.hex}
					onChange={handleTextFieldColorChange}
					overlay={overlay}
					widget={widget}
				/>
			</div>
			{isVisible && (
				<div className="color-picker-popup">
					<ColorPicker color={color} onChange={handleColorChange} />
				</div>
			)}
		</div>
	);
};

export default ColorPickerField;