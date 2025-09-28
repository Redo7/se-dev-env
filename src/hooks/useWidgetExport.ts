import { toast } from 'sonner';
import type { OverlayInstance } from '../types/';

const useWidgetExport = async (overlay: OverlayInstance, widgetID: string, widgetName: string) => {
	const res = await fetch(
		`/api/widget-io-export/${encodeURIComponent(overlay.id)}/${encodeURIComponent(widgetID)}/${encodeURIComponent(
			widgetName
		)}/`
	);
	if (!res.ok) {
		console.error('Failed to fetch export:', res.statusText);
		return;
	}

	const blob = await res.blob();

	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${widgetName}.zip`;
	document.body.appendChild(a);
	a.click();

	a.remove();
	window.URL.revokeObjectURL(url);
	toast.success(`${widgetName} has been exported`);
};

export default useWidgetExport;
