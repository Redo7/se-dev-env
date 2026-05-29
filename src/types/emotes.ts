export type Emote = {
	defaultName: string;
	id: string;
	images: Array<EmoteImage>;
}

export type EmoteImage = {
	url: string
}

export type SevenTVEmote = {
	type: "7tv";
	name: string;
	id: string;
	gif: boolean;
	animated: boolean;
	urls: {
	  "1": string;
	  "2": string;
	  "3": string;
	  "4": string;
	};
	start: number;
	end: number;
}