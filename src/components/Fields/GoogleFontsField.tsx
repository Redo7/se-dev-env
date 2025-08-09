import { useEffect, useState } from 'react';
import DropdownField from './DropdownField';
import { type Option } from 'react-dropdown';

interface Props {
	name: string;
	label: string;
	value: string;
}

interface GoogleFont {
    family: string;
    variants: [];
    subsets: [];
    version: string;
    lastModified: string;
    files: Object;
    category: string;
    kind: string;
    menu: string;
}

const GoogleFontsField = ({ name, label, value }: Props) => {
	const [fonts, setFonts] = useState<Object>({});

	useEffect(() => {
		const getFonts = async () => {
			const apiUrl =
				'https://www.googleapis.com/webfonts/v1/webfonts?key=' + import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
			const res = await fetch(apiUrl);
			if (!res.ok) {
				throw new Error(`HTTP error. Status: ${res.status}`);
			}
			const data = await res.json();
			const formattedFonts: Object = data.items.reduce((acc: any, currentObject: GoogleFont) => {
				acc[currentObject.family] = currentObject.family;
				return acc;
				}, {});
			setFonts(formattedFonts);
		};
		getFonts();
	}, []);

	return (
		<div className="google-fonts-field">
			<DropdownField name={name} label={label} options={fonts} value={value} />
		</div>
	);
};

export default GoogleFontsField;
