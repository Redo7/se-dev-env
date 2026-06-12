import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { CircleArrowOutUpRight } from "lucide-react";
import useChannelPointRewards from "@/hooks/useChannelPointRewards";
import type { ChannelPointReward } from "@/types/channelPointRewards";
import Reward from "./Reward";

const ChannelPointRewards = () => {
	const [open, setOpen] = useState(false);
  const { channelPointRewards } = useChannelPointRewards();
	
  return (
	<Popover open={open} onOpenChange={setOpen}>
		<PopoverTrigger asChild>
      {/* <Button type="button" className="p-1.5! h-fit dark:hover:bg-white/10 rounded-sm" variant="ghost" onMouseDown={(e) => e.preventDefault()}></Button> */}
      <Button variant="secondary"><CircleArrowOutUpRight className='size-3'/></Button>
		</PopoverTrigger>
		<PopoverContent align="start" className="w-66 h-57.5 mb-3 p-0 pb-0 overflow-hidden flex flex-col"
      onPointerDown={(e) => e.stopPropagation()}
      onFocusOutside={(e) => e.preventDefault()}
      onOpenAutoFocus={(e) => e.preventDefault()}>
      <div className="flex items-center text-[.7rem] tracking-wide font-[400] border-b p-3">Channel point rewards</div>
      <div className="h-full w-full grid grid-cols-[auto_auto_auto] gap-2 justify-between p-2 overflow-y-scroll overflow-x-hidden">
        {channelPointRewards.map((reward: ChannelPointReward) => {
          return <Reward key={reward.id} reward={reward}/>
          })}
      </div>
		</PopoverContent>
    </Popover>
  )
}
export default ChannelPointRewards