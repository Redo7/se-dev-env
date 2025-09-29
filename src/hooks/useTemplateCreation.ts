import { toast } from 'sonner';

const useTemplateCreation = async (overlayID: string, widgetID: string, templateName: string) => {
	const res = await fetch('/api/make-template', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ overlayID, widgetID, templateName }),
	});
	if (res.ok) {
		toast.success(`${templateName} template has been created successfully.`);
		return;
	}
	const { error } = await res.json();
	toast.error(`Error creating template`, {
		description: `${error}`,
	});
};

export default useTemplateCreation;
