import { useRef, useState } from 'react';
import useFieldChange from '../../hooks/useFieldChange';
import TextField from './TextField';
import useFieldUpdates from '@/hooks/useFieldUpdates';
import { Input } from '../ui/input';
import SubtleButton from '../Buttons/SubtleButton';
import useWidgetFileUpload from '@/hooks/useWidgetFileUpload';
interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: string;
}

const VideoInputField = ({ overlay, widget, name, label, value }: Props) => {
	const [selectedFile, setSelectedFile] = useState(value);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useFieldUpdates({ overlay, widget, name, setInputValue: setSelectedFile });

	const handleFileChange = (newValue: string) => {
        setSelectedFile(newValue);
		useFieldChange(overlay, widget, name, newValue);
	};
	return (
		<div className="video-input-field">
            <label htmlFor={name}>{label}</label>
			<div className="grid place-items-center group">
				<SubtleButton
					width="fit-content"
					padding="0 .5rem"
                    onClick={() => fileInputRef.current?.click()}
					cssClass={ '!absolute whitespace-nowrap text-[.75rem] z-1 backdrop-blur-[.125rem] backdrop-brightness-50 opacity-0 transition-opacity group-hover:opacity-100' }>
					Upload a file
				</SubtleButton>
				<form className="hidden">
					<Input
						ref={fileInputRef}
						type="file"
						accept=".mp4, .webm, .mov"
						id="imageinput"
						onChange={async (e) => await useWidgetFileUpload(e, fileInputRef, overlay, widget, name, handleFileChange)}
					/>
				</form>
                <video className="field-asset-preview" src={value} id={name} autoPlay loop muted />
			</div>
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
