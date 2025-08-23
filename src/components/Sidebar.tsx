import '../App.css';
import SubtleButton from './Buttons/SubtleButton';
import SidebarCollapse from '../assets/Icons/SidebarCollapse';
import { useEffect, useMemo, useState } from 'react';
import FieldGroup from './Fields/FieldGroup';
import type { OverlayInstance, WidgetInstance } from '../types/';
import useFields from '../hooks/useFields';
import componentMap from '../utils/componentMap';
import useFieldData from '../hooks/useFieldData';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface StreamElementsField {
	type: string;
	label: string;
	value: any;
	[key: string]: any;
}

interface StreamElementsConfig {
	[key: string]: StreamElementsField;
}

interface GroupedFields {
	[groupName: string]: {
		fieldName: string;
		fieldConfig: StreamElementsField;
	}[];
}
interface Props {
	isVisible: boolean;
	overlay: OverlayInstance;
	widget: WidgetInstance | undefined;
	onToggle: () => void;
}

const Sidebar = ({ isVisible, overlay, widget, onToggle }: Props) => {
	const [currWidgetFields, setCurrWidgetFields] = useState<StreamElementsConfig>();
	const [currWidgetFieldData, setCurrWidgetFieldData] = useState<StreamElementsConfig>();
	useEffect(() => {
		if (!widget) return;
		const fetchFields = async () => {
			const fields = await useFields(overlay.id, widget.id);
			setCurrWidgetFields(fields);
			const fieldData = await useFieldData(overlay.id, widget.id);
			setCurrWidgetFieldData(fieldData);
		};
		fetchFields();
	}, [widget]);

	const groupedFields = useMemo(() => {
		const groups: GroupedFields = {};
		const DEFAULT_GROUP_NAME = 'Fields';

		if (currWidgetFields) {
			Object.entries(currWidgetFields).forEach(([fieldName, fieldConfig]) => {
				const groupName = fieldConfig.group || DEFAULT_GROUP_NAME;

				if (!groups[groupName]) {
					groups[groupName] = [];
				}
				groups[groupName].push({ fieldName, fieldConfig });
			});
		}
		return groups;
	}, [currWidgetFields]);

	return (
		<div className="sidebar depth-shadow" data-sidebar-visible={isVisible}>
			<div className="sidebar-heading flex">
				<p className="sidebar-overlay-name">{widget ? widget.name : 'No widget selected'}</p>
				<SubtleButton onClick={onToggle} cssClass="subtle flex center" width={24} height={24}>
					<SidebarCollapse />
				</SubtleButton>
			</div>
			<div className="sidebar-fields-container">
				{currWidgetFieldData &&
					Object.entries(groupedFields).map(([groupName, fieldsInGroup]) => (
						<FieldGroup key={groupName} name={groupName}>
							{fieldsInGroup.map(({ fieldName, fieldConfig }) => {
								const Component = componentMap[fieldConfig.type];

								if (!Component) {
									console.warn(`No component found for type: ${fieldConfig.type}`);
									return null;
								}

								const { type, label, value, group, ...restProps } = fieldConfig; // Include 'group' in destructuring to exclude it from restProps
								let assignedValue;

								if (fieldConfig.options) {
									assignedValue = fieldConfig.options[`${currWidgetFieldData[fieldName]}`];
								} else {
									assignedValue = currWidgetFieldData[fieldName];
								}
								return (
									<Component
										key={fieldName}
										overlay={overlay.id}
										widget={widget?.id}
										name={fieldName}
										label={label}
										value={assignedValue}
										{...restProps}
									/>
								);
							})}
						</FieldGroup>
					))}
			</div>
			<div className="add-group-container">
				<SubtleButton width="100%">+</SubtleButton>
			</div>
		</div>
	);
};

export default Sidebar;
