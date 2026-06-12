import type { Emote } from "./emotes"

export type ChannelPointReward = {
	// The ID of the reward
	id: string, 
	// The name of the reward
	name: string, 
	// The description of the reward
	description?: string, 
	// Should the user be required to attach a message when redeeming this reward
	requireMessage: boolean, 
	// How many channel points should be taken when the reward is redeemed
	amount: number, 
	// Color of the reward in the reward picker
	color: string, 
	// Reward icon in the reward picker. Icons are required on twitch, but until this is fully implemented in this app, they're not :^)
	icon?: Emote, 
	// Should the reward not go to the Moderators Reward Requests?
	skipRewardRequestsQueue: boolean, 
	limits?: {
		// How much time needs to pass between each redemption for the reward to be available again
		cooldown?: number, 
		// How many times per stream ALL USERS COLLECTIVELY can redeem this reward
		maxUsesPerStream?: number, 
		// How many times per stream a user can redeem this reward
		maxUsesPerUserPerStream?: number, 
	}
	// When the reward was made
	createdAt: string, 
	// When the reward expires (no idea what it means really. Maybe something to do with the rewards queue)
	expiresAt: string, 
	// When is the last time the reward was updated. Same value as createdAt when freshly made.
	updatedAt: string, 
}

export type channelPointRedemption = {
    type: "channelPointsRedemption",
	// Twitch, YouTube, etc...
    provider: string,
	// Channel id
    channel: string,
	// idfk, (maybe whether it was flagged in chat or something)
    flagged: boolean,
	// When the reward was made
    createdAt: string,
    data: {
		// Reward price
		amount: number,
		// The redeemers username (login)
		username: string,
		// The redeemers display name
		displayName: string,
		// SE internal ID of the provider?
		providerId: number,
		// The message attached to the redemption. Only visible when requireMessage is set to true
		message?: string,
		// Reward name
		redemption: string,
		// Idk
		quantity: 0,
		// The redeemers avatar
		avatar: string
	},
	// ID of the reward
    _id: string,
	// How much time until the reward expires
    expiresAt: string,
	// Last updated date of the reward
    updatedAt: string,
	// ID of the reward
    activityId: string,
	// The amount of times this specific reward was redeemed during a stream
    sessionEventsCount: number
}