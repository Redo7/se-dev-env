import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Smile } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import useEmotes from "@/hooks/useEmotes";
import type { Emote } from "@/types/emotes";

interface Props{
    onEmoteClick: (emote: string) => void;
}

const EmotePicker = ({ onEmoteClick }: Props) => {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const { emotes_1x } = useEmotes();

	return (
    <Popover open={open} onOpenChange={setOpen}>
		<PopoverTrigger asChild>
            <Button type="button" className="p-1.5! h-fit dark:hover:bg-white/10 rounded-sm" variant="ghost" onMouseDown={(e) => e.preventDefault()}><Smile /></Button>
		</PopoverTrigger>
		<PopoverContent align="end" className="w-67.5 h-57.5 mb-4 p-2 pb-0 overflow-hidden flex flex-col"
            onPointerDown={(e) => e.stopPropagation()}
            onFocusOutside={(e) => e.preventDefault()}
            onOpenAutoFocus={(e) => e.preventDefault()}>
            <Input placeholder="Search" className="h-7 rounded-sm text-xs! w-full" 
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}/>
            <div className="mt-2 overflow-y-scroll pr-[2.5px] -mr-[6.5px] flex-1 pb-2 rounded-t-xs">
                <div className="grid grid-cols-6 gap-2">
                {emotes_1x?.filter(
                    (emote: Emote) => inputValue != "" ? emote.defaultName.toLowerCase().includes(inputValue) : true)
                        .map((emote: Emote) => {
                            return (
                            <img 
                                key={emote.id} data-name={emote.defaultName} 
                                className="aspect-square rounded-xs hover:bg-white/20 hover:brightness-125 transition-colors object-contain"
                                src={emote.images[0].url}
                                onClick={() => onEmoteClick(emote.defaultName)}
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                                loading="lazy"
                                decoding="async"
                            />)
                        })
                }
                </div>
		  </div>
		</PopoverContent>
    </Popover>
	);
};
export default EmotePicker;