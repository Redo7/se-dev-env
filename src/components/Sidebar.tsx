import '../App.css';
import SubtleButton from './Buttons/SubtleButton';
import SidebarCollapse from '../assets/Icons/SidebarCollapse';
import { useEffect, useMemo, useRef, useState } from 'react';
import FieldGroup from './Fields/FieldGroup';
import type { OverlayInstance, WidgetInstance } from '../types/';
import useFields from '../hooks/useFields';
import componentMap from '../utils/componentMap';
import useFieldData from '../hooks/useFieldData';
import { Input } from './ui/input';
import useRename from '@/hooks/useRename';

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
	const [widgetName, setWidgetName] = useState(widget ? widget.name : 'No widget selected');
	const renameTimeout = useRef<NodeJS.Timeout | null>(null);
	const rename = useRename();
	useEffect(() => {
		if (!widget) return;
		const fetchFields = async () => {
			const fields = await useFields(overlay.id, widget.id);
			setCurrWidgetFields(fields);
			const fieldData = await useFieldData(overlay.id, widget.id);
			setCurrWidgetFieldData(fieldData);
		};
		fetchFields();
		setWidgetName(widget.name);
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

	const handleNameInput = async (name: string) => {
		setWidgetName(name);
		if (renameTimeout.current) {
			clearTimeout(renameTimeout.current);
			renameTimeout.current = null;
		}
		renameTimeout.current = setTimeout(async () => {
			rename(overlay, widget, name, true);
			if (widget) {
				widget.name = name;
			}
		}, 500);
	};

	return (
		<div className="sidebar depth-shadow" data-sidebar-visible={isVisible}>
			<div className="sidebar-heading flex">
				{widget ? (
					<Input
						value={widgetName}
						onChange={(e) => handleNameInput(e.target.value)}
						size={widgetName.length || 1}
						className="dark:bg-transparent! dark:border-0 text-[12px]! dark:hover:bg-tr-50! transition-colors rounded-sm h-6 focus-visible:ring-[0px] dark:focus-visible:bg-tr-50! w-fit! -translate-x-2 px-2!"
					/>
				) : (
					<p className="sidebar-overlay-name">No widget selected</p>
				)}
				<SubtleButton onClick={onToggle} cssClass="subtle flex center" width={24} height={24}>
					<SidebarCollapse />
				</SubtleButton>
			</div>
			<div className="sidebar-fields-container">
				{currWidgetFieldData &&
					Object.entries(groupedFields).map(([groupName, fieldsInGroup]) => (
						<FieldGroup key={groupName} name={groupName}>
							{fieldsInGroup.map(({ fieldName, fieldConfig }) => {
								const componentName =
									fieldConfig.type.toLowerCase() === 'googlefont'
										? 'googleFont'
										: fieldConfig.type.toLowerCase();
								const Component = componentMap[componentName];

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
