import { toast } from 'sonner';
import type { OverlayInstance } from '../types/';
import { useNavigate } from 'react-router-dom';

const useRename = () => {
	const navigate = useNavigate();
	const rename = async (
		overlay: OverlayInstance,
		widget: { name: string; id: string } | undefined,
		newName: string,
		redirect: boolean
	) => {
		const entry = widget ? 'Widget' : 'Overlay';
		const overlayID = overlay.id;
		const widgetID = widget ? widget.id : undefined;
		if ((widget && newName === widget.name) || newName === overlay.name) return;
		const res = await fetch('/api/rename', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ overlayID, widgetID, name: newName }),
		});

		const data = await res.json();

		if (res.ok) {
			toast.success(`${entry} renamed to ${newName}`, {
				description: `Was ${entry === 'Widget' ? widget?.name : overlay.name}`,
			});
			if (entry === 'Overlay' && redirect) navigate(`/${data.id}`);
			return true;
		}

		toast.error(`Failed to rename ${entry}`, {
			description: data.error,
		});
		return false;
	};
	return rename;
};

export default useRename;
