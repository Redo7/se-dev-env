export interface Overlay{
	name: string,
	id: string,
	widgets: WidgetInstance[]
}

export interface WidgetInstance {
	name: string;
	id: string;
	src: string;
	template: string;
	deleteAfter?: number;

	width: number;
	height: number;
	posX: number;
	posY: number;
}