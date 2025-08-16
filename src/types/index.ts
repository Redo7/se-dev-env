export interface OverlayInstance{
	name: string,
	id: string,
	widgets: WidgetInstance[]
	deleteAfter?: number;
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