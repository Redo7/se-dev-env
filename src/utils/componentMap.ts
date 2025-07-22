import {
	TextField,
	CheckboxField,
	ColorPickerField,
	NumberField,
	SliderField,
	ImageInputField,
	VideoInputField,
	SoundInputField,
	ButtonField,
	HiddenField,
	GoogleFontsField,
	DropdownField,
} from '../components/Fields';

interface ComponentMap {
	[key: string]: React.FC<any>;
}

const componentMap: ComponentMap = {
	text: TextField,
	checkbox: CheckboxField,
	colorpicker: ColorPickerField,
	number: NumberField,
	slider: SliderField,
	dropdown: DropdownField,
	'image-input': ImageInputField,
	'video-input': VideoInputField,
	'sound-input': SoundInputField,
	googleFont: GoogleFontsField,
	button: ButtonField,
	hidden: HiddenField,
};

export default componentMap;
