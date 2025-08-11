import { useState } from 'react';
import TextField from './TextField';
import useFieldChange from '../../hooks/useFieldChange';
interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: string | undefined;
}

const ImageInputField = ({ overlay, widget, name, label, value = undefined }: Props) => {
	const [selectedFile, setSelectedFile] = useState(value);

	const handleFileChange = (newValue: string) => {
        setSelectedFile(newValue);
		useFieldChange(overlay, widget, name, newValue);
	};

	return (
		<div className="image-input-field">
			{selectedFile && 
				<>
					<label htmlFor={name}>{label}</label>
					<img className="field-asset-preview" src={selectedFile} alt={label} id={name} />
				</>
			}
			<TextField
					name={name}
					label={`"${label}" link`}
					value={value}
					onChange={handleFileChange}
					overlay={overlay}
					widget={widget}
				/>
			</div>
	);
};

export default ImageInputField;
