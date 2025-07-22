const useFieldData = async (overlay: string, widget: string) => {
	try {
		const res = await fetch(`/api/field-data/${encodeURIComponent(overlay)}/${encodeURIComponent(widget)}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
		const data = await res.json();
		// console.log('[Parent App] Fetched field data:', data);
		return data;
	} catch (error) {
		console.error('[Parent App] Error fetching field data:', error);
		return undefined; // Return undefined on error
	}
};

export default useFieldData;
