import { toast } from 'sonner';
import type { OverlayInstance } from '../types/';
import type { WidgetInstance } from '../types/';

const useTrashRestore = async (overlay: OverlayInstance, widget: WidgetInstance | undefined) => {
	const overlayID = overlay.id;
	const widgetID = widget ? widget.id : undefined;
	const res = await fetch('/api/restore', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ overlayID, widgetID }),
	});
	const entry = widget ? widget : overlay;
	if (!res.ok) {
		toast.error(`Error restoring ${entry.name}`);
		return;
	}
	toast.success(`Successfully restored ${entry.name}`);
};

export default useTrashRestore;
