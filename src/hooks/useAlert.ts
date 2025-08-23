const names = ['sigmacw', 'NiceAesth', 'flip', 'eternum', 'Haruka', 'Xootynator', 'Melonturtle', 'shiki_gfx', 'Eden', 'Shivrer', 'Accalix', 'WatermelonTortoise', 'ReiyuGuiGui', 'daph', 'VeryImportantPerson', 'Redo_7'];
const useAlert = (listener: string) => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const detail = {
        "listener": listener,
        "event": {
            "amount": listener === 'follower-latest' ? undefined : listener === 'cheer-latest' ? (Math.floor(Math.random() * 10) + 1) * 1000 : Math.floor(Math.random() * 50) + 1,
            "avatar": "https://cdn.streamelements.com/assets/dashboard/my-overlays/overlay-default-preview-2.jpg",
            "displayName": randomName,
            "providerId": "146575108",
            "name": randomName.toLowerCase(),
            "_id": "68a900304dd875b88c22ed67",
            "sessionTop": false,
            "type": listener.replace('-latest', ''),
            "originalEventName": listener
        }
    }
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.contentWindow?.postMessage({ listener: 'onEventReceived', detail: detail }, "*");
    });
  return
}

export default useAlert