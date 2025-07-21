import { useCallback, useEffect, useRef, useState } from 'react';
import {
	TextField,
	CheckboxField,
	ColorPickerField,
	NumberField,
	SliderField,
	ImageInputField,
	VideoInputField,
	AudioInputField,
	ButtonField,
	HiddenField,
	DropdownField,
} from './';
import './fields.css';
import GoogleFontsField from './GoogleFontsField';

const FieldGroup = () => {
	const [isAccordionExpanded, setIsAccordionExpanded] = useState(true);
	const [contentHeight, setContentHeight] = useState(0);
	const [contentVersion, setContentVersion] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggleAccordion = () => {
		setIsAccordionExpanded((prev) => {
			if (!prev) {
				requestAnimationFrame(() => setContentVersion((v) => v + 1));
			}
			return !prev;
		});
	};

	// Something causes the field group to not open sometimes
	useEffect(() => {
		if (!contentRef.current) {
			console.log('asd');
			return;
		}

		if (isAccordionExpanded) {
			const prevHeight = contentRef.current.offsetHeight;
			contentRef.current.style.height = 'auto';

			requestAnimationFrame(() => {
				if (contentRef.current) {
					const newScrollHeight = contentRef.current.scrollHeight;
					contentRef.current.style.height = `${prevHeight}px`;

					requestAnimationFrame(() => {
						setContentHeight(newScrollHeight);
					});
				}
			});
		} else {
			setContentHeight(contentRef.current.scrollHeight);
			requestAnimationFrame(() => {
				setContentHeight(0);
			});
		}
	}, [isAccordionExpanded, contentVersion]);

	const recalcHeight = useCallback(() => {
		setContentVersion((prev) => prev + 1);
	}, []);

	return (
		<div className="field-group">
			<button className="field-group-btn" onClick={toggleAccordion}>
				Field Group
			</button>
			<div
				ref={contentRef}
				className="field-group-accordion"
				style={{ height: contentHeight }}
				data-is-expanded={isAccordionExpanded}>
				<TextField name="textField" label="Text" />
				<CheckboxField name="checkbox" label="Checkbox" />
				<ColorPickerField
					name="colorPicker"
					label="Color Picker"
					onColorPickerToggle={() => {
						requestAnimationFrame(() => recalcHeight());
					}}
				/>
				<NumberField name="Test" label="test" value={0} />
				<SliderField name="slider" label="Slider" min={0} max={10} step={1} />
				<DropdownField
					name="dropdownField"
					label="Dropdown field"
					options={[
						{ value: 'blue', label: 'Blue thing' },
						{ value: 'apple', label: 'Some apple' },
						{ value: 'apple1', label: 'Some apple 1' },
						{ value: 'apple2', label: 'Some apple 2' },
						{ value: 'apple3', label: 'Some apple 3' },
						{ value: 'apple4', label: 'Some apple 4' },
						{ value: '7', label: 'Lucky number' },
					]}
				/>
				<GoogleFontsField name="googleFontsField" label="Google Fonts Field" />
				<ImageInputField
					name="imageInput"
					label="Image Input"
					value="https://cdn.streamelements.com/uploads/01jwexgd85ch1j41t06eqh56ar.jpeg"
				/>
				<VideoInputField
					name="videoInput"
					label="Video Input"
					value="https://cdn.streamelements.com/uploads/7fdbb928-cdc2-47bd-a3ad-07f944b41729.webm"
				/>
				<AudioInputField
					name="audioInput"
					label="Audio input"
					value="https://cdn.streamelements.com/static/alertbox/default.ogg"
				/>
				<HiddenField name="hiddenField" label="asdsadasdasdasdasdasdasdasdasdasdas" />
				<ButtonField name="buttonField" label="Some Button" />
			</div>
		</div>
	);
};

export default FieldGroup;
