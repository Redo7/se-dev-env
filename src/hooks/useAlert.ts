const names = ['sigmacw', 'NiceAesth', 'flip', 'eternum', 'Haruka', 'Xootynator', 'Melonturtle', 'shiki_gfx', 'Eden', 'Shivrer', 'Accalix', 'WatermelonTortoise', 'ReiyuGuiGui', 'daph', 'VeryImportantPerson', 'Redo_7'];

const useAlert = (
	listener: string,
	amount?: number | 'random',
	username: string = '',
	message: string = '',
	tier?: string | undefined,
    communityGift?: boolean | undefined
) => {
	let eventUsername = username ? username : names[Math.floor(Math.random() * names.length)];
	let eventAmount;
	if (amount === 'random' && listener === 'cheer-latest') {
		eventAmount = (Math.floor(Math.random() * 10) + 1) * 1000;
	} else if (amount === 'random') {
		eventAmount = Math.floor(Math.random() * 50) + 1;
	} else if (listener === 'follower-latest') {
		eventAmount = undefined;
	} else {
		eventAmount = amount;
	}
	let detail: { [k: string]: any } = {
		listener: listener,
		event: {
			amount: eventAmount,
			avatar: 'https://cdn.streamelements.com/assets/dashboard/my-overlays/overlay-default-preview-2.jpg',
			displayName: eventUsername,
			providerId: '146575108',
			name: eventUsername.toLowerCase(),
			_id: '68a900304dd875b88c22ed67',
			sessionTop: false,
			type: listener.replace('-latest', ''),
			originalEventName: listener,
		},
	};
	if (message !== '') { detail.event.message = message; }
	if (tier) { detail.event.tier = tier; }
    if(communityGift && eventAmount && eventAmount > 1){
        detail.event.bulkGifted = true;
    } else if (communityGift){
		const filtered = names.filter(name => name != eventUsername);
        detail.event.sender = filtered[Math.floor(Math.random() * (filtered.length))];
        detail.event.gifted = true;
    }
    
	const iframes = document.querySelectorAll('iframe');
	iframes.forEach((iframe) => {
		iframe.contentWindow?.postMessage({ listener: 'onEventReceived', detail: detail }, '*');
	});
	return;
};

export default useAlert