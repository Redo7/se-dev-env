export interface Overlay{
	name: string,
	id: string,
	widgets: WidgetInstance[]
}

export interface WidgetInstance {
	id: string;
	internalName: string;
	name: string;
	template: string;
	src: string;

	width: number;
	height: number;
	posX: number;
	posY: number;
}