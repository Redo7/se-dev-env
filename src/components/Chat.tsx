import { useRef } from 'react';
import { Button } from './ui/button'
import { Input } from './ui/input';
import { Separator } from './ui/separator'
import { X } from 'lucide-react';

interface Props{
    closePopup: () => void;
}

const Chat = ({ closePopup }: Props) => {
    const username = "TestUser";
    const chatInput = useRef<HTMLInputElement>(null)
    const handleChatMessage = () => {
        if(!chatInput.current) return;
        let detail = {
            listener: "message",
            event: {
                service: "twitch",
                data: {
                    time: 1755989190104,
                    tags: {
                        "badge-info": "subscriber/39",
                        badges: "broadcaster/1,subscriber/0",
                        "client-nonce": "9a9d56228aa6396516a6366abffeff39",
                        color: "#ED1B53",
                        "display-name": username,
                        emotes: "emotesv2_ec4b3c3f8f2342dc87a6b3be0fc84510:10-18",
                        "first-msg": "0",
                        flags: "",
                        id: "d0bcf318-b8d2-431d-b49d-c69aaf4b1ef8",
                        mod: "0",
                        "returning-chatter": "0",
                        "room-id": "146575108",
                        subscriber: "1",
                        "tmi-sent-ts": "1755989189957",
                        turbo: "0",
                        "user-id": "146575108",
                        "user-type": ""
                    },
                    nick: username.toLowerCase(),
                    userId: "146575108",
                    displayName: username,
                    displayColor: "#ED1B53",
                    badges: [
                        {
                            type: "broadcaster",
                            version: "1",
                            url: "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3",
                            description: "Broadcaster"
                        }
                    ],
                    channel: "se-dev-env",
                    text: chatInput.current.value,
                    isAction: false,
                    emotes: [],
                    msgId: "d0bcf318-b8d2-431d-b49d-c69aaf4b1ef8"
                },
                renderedText: chatInput.current.value // Apply emotes here later
            }
        }
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
            iframe.contentWindow?.postMessage({ listener: 'onEventReceived', detail: detail }, '*');
        });
        let element = document.createElement('div');
        element.innerHTML = `<span class='font-[700]'>${username}</span>: <span class='text-zinc-300'>${chatInput.current.value}</span></div>`
        document.querySelector('.chat-container')?.prepend(element)
    }
  return (
    <div className="chat bg-zinc-900 rounded-lg border absolute w-70">
        <div className="flex justify-between items-center p-2 px-3">
            <p className='text-[.75rem] tracking-wide font-[500]'>Chat</p>
            <Button variant="ghost" size="xs" onClick={closePopup}><X size={16}/></Button>
        </div>
        <Separator />
        <div className="h-40 flex flex-col justify-end gap-1">
            <div className="chat-container overflow-y-scroll p-2 w-full text-sm flex flex-col-reverse"></div>
        </div>
        <form action={handleChatMessage}>
            <Input ref={chatInput} className='rounded-lg min-h-auto py-3' placeholder='Type your message' />
        </form>
    </div>
  )
}

export default Chat