import type { ChannelPointReward } from "@/types/channelPointRewards"
import { sendMessageToWidgets } from "@/utils/sendMessageToWidgets";
import useChatMessages from "./useChatMessages";
import type { User } from "@/types/user";

function useChannelPointRewards(){
	const { sendChatMessage } = useChatMessages();
	const channelPointRewards: ChannelPointReward[] = [
		{
			id: "c5963a9f5f7aa86dea95",
			name: "NewlyMadeReward", 
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consectetur in nobis repudiandae minima suscipit eveniet! Quibusdam totam eveniet facere?", 
			requireMessage: false, 
			amount: 10, 
			color: "#ED1B53", 
			skipRewardRequestsQueue: false, 
			"createdAt": "2026-06-11T22:22:48.032Z",
			"expiresAt": "2026-07-09T22:22:48.038Z",
			"updatedAt": "2026-06-11T22:22:48.032Z",
		},
		{
			id: "9e03dee17aa536fd3f07",
			name: "Reward", 
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa consectetur in nobis repudiandae minima suscipit eveniet! Quibusdam totam eveniet facere?", 
			requireMessage: false, 
			amount: 50, 
			color: "#4f1262", 
			skipRewardRequestsQueue: false, 
			"createdAt": "2026-06-11T22:22:48.032Z",
			"expiresAt": "2026-07-09T22:22:48.038Z",
			"updatedAt": "2026-06-11T22:22:48.032Z",
		},
		{
			id: "160c5933c5bf5ed3fe23",
			name: "Some other reward", 
			requireMessage: false, 
			amount: 10, 
			color: "#121212", 
			skipRewardRequestsQueue: false, 
			"createdAt": "2026-06-11T22:22:48.032Z",
			"expiresAt": "2026-07-09T22:22:48.038Z",
			"updatedAt": "2026-06-11T22:22:48.032Z",
		},
		{
			id: "a5a9d9abc183252c384d",
			name: "Some other reward", 
			requireMessage: false, 
			amount: 10, 
			color: "#121212", 
			skipRewardRequestsQueue: false, 
			"createdAt": "2026-06-11T22:22:48.032Z",
			"expiresAt": "2026-07-09T22:22:48.038Z",
			"updatedAt": "2026-06-11T22:22:48.032Z",
		},
	]

	function redeemReward(user: User, reward: ChannelPointReward, message?: string){
		const detail = {
			listener: "event",
			event: {
				type: "channelPointsRedemption",
				provider: "twitch",
				channel: user.name,
				flagged: false,
				createdAt: reward.createdAt,
				data: {
					amount: reward.amount,
					username: user.name.toLowerCase(),
					displayName: user.name,
					providerId: "1",
					message: reward.requireMessage ?? message,
					redemption: reward.name,
					quantity: 0,
					avatar: "not implemented yet"
				},
				_id: reward.id,
				expiresAt: reward.expiresAt,
				updatedAt: reward.updatedAt,
				activityId: reward.id,
				sessionEventsCount: 1
			}
		}
		sendMessageToWidgets(detail);
		if(reward.requireMessage && message) sendChatMessage(user.name, message);
	}

	return { channelPointRewards, redeemReward }
}

export default useChannelPointRewards