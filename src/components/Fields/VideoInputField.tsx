import { useState } from 'react';
import useFieldChange from '../../hooks/useFieldChange';
import TextField from './TextField';
interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: string;
}

const VideoInputField = ({ overlay, widget, name, label, value }: Props) => {
	const [selectedFile, setSelectedFile] = useState(value);

	const handleFileChange = (newValue: string) => {
        setSelectedFile(newValue);
		useFieldChange(overlay, widget, name, newValue);
	};
	return (
		<div className="video-input-field">
			{selectedFile && 
				<>
					<label htmlFor={name}>{label}</label>
					<video className="field-asset-preview" src={value} id={name} autoPlay loop muted />
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

export default VideoInputField;
