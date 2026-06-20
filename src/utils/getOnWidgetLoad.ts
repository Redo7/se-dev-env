import { toast } from "sonner";
import { getFieldData } from "./getFields";

export interface OnWidgetLoadData {
	[key: string]: any;
}

export async function getOnWidgetLoadObject(overlayID: string, widgetID: string) {
	try {
		const [data, fieldData] = await Promise.all([
			fetchOnWidgetLoadData(),
			getFieldData(overlayID, widgetID),
		]);

		if (data && fieldData) {
			const combinedData = {
				...data,
				fieldData: { ...fieldData },
				widgetId: widgetID,
			};
			return combinedData;
		}
	} catch (error) {
		console.error('[Parent App] Error getting widget load data:', error);
	}
	return undefined;
}

async function fetchOnWidgetLoadData(): Promise<OnWidgetLoadData | undefined> {
	try {
		const res = await fetch(`/api/data/onWidgetLoad`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.error('[Parent App] Error fetching onWidgetLoad data:', error);
		toast.error(`Error fetching onWidgetLoad data:`, {
			description: `${error}`,
		});
		return undefined;
	}
}