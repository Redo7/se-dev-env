import type { Emote, EmoteImage, SevenTVEmote } from "@/types/emotes";
import { useQuery } from "@tanstack/react-query";

const useEmotes = () => {
	const fetchEmotes = async () => {
		const response = await fetch("https://7tv.io/v4/gql", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			operationName: "EmoteSearch",
			query: `query EmoteSearch($query: String, $tags: [String!]!, $sortBy: SortBy!, $filters: Filters, $page: Int, $perPage: Int!) {
			  emotes {
				search(query: $query, tags: {tags: $tags, match: ANY}, sort: {sortBy: $sortBy, order: DESCENDING}, filters: $filters, page: $page, perPage: $perPage) {
				items { id defaultName images { url } }
				totalCount
				}
			  }
				}`,
			variables: {
			  filters: {},
			  page: 1,
			  perPage: 72,
			  query: null,
			  sortBy: "TOP_ALL_TIME",
			  tags: [],
			},
		  }),
		});
	  
		const data = await response.json();
		const emotes_1x = data.data.emotes.search.items.map((emote: Emote) => ({
			...emote,
			images: [
				{url: emote.images.find((img: EmoteImage) => img.url.endsWith("1x.avif"))?.url}
			]
		}));
		return {emotes: data.data.emotes.search.items, emotes_1x};
	};
	const { data } = useQuery({
		queryKey: ['emotes'],
		queryFn: fetchEmotes,
		staleTime: Infinity,
	  });
	  
	  return { 
		emotes: data?.emotes, 
		emotes_1x: data?.emotes_1x 
	  };
}

export function replaceEmotes(text: string, emotes: Emote[]): string {
	const emoteMap = new Map<string, Emote>();
	emotes.forEach((emote) => emoteMap.set(emote.defaultName, emote));
  
	const words = text.split(/(\s+)/);
  
	return words
	  .map((word) => {
		const trimmed = word.trim();
		if (!trimmed || !emoteMap.has(trimmed)) return word;
  
		const emote = emoteMap.get(trimmed)!;
		const getUrl = (size: string) =>
		  emote.images.find((img) => img.url.includes(`/${size}.webp`))?.url;
  
		const url1x = getUrl("1x");
		const url2x = getUrl("2x");
		const url4x = getUrl("4x");
  
		if (!url1x) return word;
  
		return `<img src=\"${url1x}\" srcset=\"${url1x} 1x, ${url2x} 2x, ${url4x} 4x\" title=\"${emote.defaultName}\" class=\"emote\" />`;
	  })
	  .join("");
  }
  
export function mapEmotes(text: string, emotes: Emote[]): SevenTVEmote[] {
	const emoteMap = new Map<string, Emote>();
	emotes.forEach((emote) => emoteMap.set(emote.defaultName, emote));

	const result: SevenTVEmote[] = [];
	let position = 0;

	const words = text.split(/(\s+)/);

	for (const word of words) {
		const trimmed = word.trim();
		const emote = emoteMap.get(trimmed);

		if (emote && trimmed) {
		const hasGif = emote.images.some((img) => img.url.endsWith(".gif"));
		const hasAnimated = emote.images.some(
			(img) => !img.url.includes("_static")
		);

		const getUrl = (size: string) =>
			emote.images.find((img) => img.url.includes(`/${size}.webp`))?.url ||
			"";

		result.push({
			type: "7tv",
			name: emote.defaultName,
			id: emote.id,
			gif: hasGif,
			animated: hasAnimated,
			urls: {
			"1": getUrl("1x"),
			"2": getUrl("2x"),
			"3": getUrl("3x"),
			"4": getUrl("4x"),
			},
			start: position,
			end: position + trimmed.length,
		});
		}

		position += word.length;
	}

	return result;
}

export default useEmotes