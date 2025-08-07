import { useEffect, useState } from 'react';
import DropdownField from './DropdownField';
import { type Option } from 'react-dropdown';

interface Props {
	fieldKey: string;
	name: string;
	label: string;
	value: string;
}

const GoogleFontsField = ({ fieldKey, name, label, value }: Props) => {
	const [fonts, setFonts] = useState<Option[]>([]);

	useEffect(() => {
		const getFonts = async () => {
			const apiUrl =
				'https://www.googleapis.com/webfonts/v1/webfonts?key=' + import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
			const res = await fetch(apiUrl);
			if (!res.ok) {
				throw new Error(`HTTP error. Status: ${res.status}`);
			}
			const data = await res.json();
			const formattedFonts: Option[] = data.items.map((font: any) => ({
				value: font.family,
				label: font.family,
			}));
			setFonts(formattedFonts);
		};
		getFonts();
	}, []);

	return (
		<div key={fieldKey} className="google-fonts-field">
			<DropdownField name={name} label={label} options={fonts} value={value} />
		</div>
	);
};

export default GoogleFontsField;
