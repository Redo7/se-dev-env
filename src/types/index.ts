export interface OverlayInstance {
	name: string;
	id: string;
	widgets: WidgetInstance[];
	deleteAfter?: number;
	lastUpdate?: undefined | number;
}

export interface WidgetInstance {
	name: string;
	id: string;
	src: string;
	template: string;
	scriptVersion: number;
	deleteAfter?: number;

	width: number;
	height: number;
	posX: number;
	posY: number;
	blur: boolean;
	pointerEvents: boolean;
	frameVisible: boolean;
	zIndex: number;
}
