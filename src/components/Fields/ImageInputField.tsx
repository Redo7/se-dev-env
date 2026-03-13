import { useRef, useState } from 'react';
import TextField from './TextField';
import useFieldChange from '../../hooks/useFieldChange';
import useFieldUpdates from '@/hooks/useFieldUpdates';
import SubtleButton from '../Buttons/SubtleButton';
import { Input } from '../ui/input';
import axios from 'axios';
import { toast } from 'sonner';
import useWidgetFileUpload from '@/hooks/useWidgetFileUpload';

interface Props {
	overlay: string;
	widget: string;
	name: string;
	label: string;
	value?: string | undefined;
}

const ImageInputField = ({ overlay, widget, name, label, value = undefined }: Props) => {
	const [selectedFile, setSelectedFile] = useState(value);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useFieldUpdates({ overlay, widget, name, setInputValue: setSelectedFile });

	const handleFileChange = (newValue: string) => {
        setSelectedFile(newValue);
		useFieldChange(overlay, widget, name, newValue);
	};

	return (
		<div className="image-input-field">
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
						accept=".jpg,.jpeg,.png,.gif,.webp"
						id="imageinput"
						onChange={async (e) => await useWidgetFileUpload(e, fileInputRef, overlay, widget, name, handleFileChange)}
					/>
				</form>
				<img className="field-asset-preview" src={selectedFile} alt={label} id={name} />
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

export default ImageInputField;
