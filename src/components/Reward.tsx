import useChannelPointRewards from "@/hooks/useChannelPointRewards";
import useUser from "@/hooks/useUser";
import type { ChannelPointReward } from "@/types/channelPointRewards"
import { CircleArrowOutUpRight } from "lucide-react";

interface Props{
  reward: ChannelPointReward,
}

const Reward = ({ reward }: Props) => {
  const { redeemReward } = useChannelPointRewards();
  const { user } = useUser();
  const { name, amount, color} = reward;
  const { cooldown: _cooldown, maxUsesPerStream: _maxUsesPerStream, maxUsesPerUserPerStream: _maxUsesPerUserPerStream } = reward.limits ?? {}; // Underscored to get rid of "all deconstructed elements are unused" error
  return (
    <div className="font-medium aspect-[1/1.3] w-19 max-h-fit rounded-md text-[0.6em] flex items-center justify-around flex-col text-center p-2 box-border select-none hover:brightness-120 hover:scale-105 transition-[filter,scale] will-change-transform" style={{backgroundColor: color}} onClick={() => {redeemReward(user, reward)}}>
    {/* TODO: Adjust text color when contrast gets low */}
    <div className="aspect-square bg-white mix-blend-soft-light size-5 m-3 rounded-sm"></div> {/* Icon placeholder */}
    <p className="break-words max-w-full overflow-hidden">{name}</p> 
    <p>{amount} <CircleArrowOutUpRight className='size-2' strokeWidth={3}/></p>
  </div>
  )
}
export default Reward