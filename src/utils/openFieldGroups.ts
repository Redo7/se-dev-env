export const getOpenFieldGroups = (): Set<string> => {
	const stored = localStorage.getItem("openFieldGroups");
	return new Set(stored ? JSON.parse(stored) : []);
};

export const saveOpenFieldGroups = (openIds: Set<string>) => {
	localStorage.setItem("openFieldGroups", JSON.stringify([...openIds]));
};

export const toggleFieldGroup = (id: string, isOpen: boolean) => {
	const openIds = getOpenFieldGroups();
	if (isOpen) {
		openIds.add(id);
	} else {
		openIds.delete(id);
	}
	saveOpenFieldGroups(openIds);
};
