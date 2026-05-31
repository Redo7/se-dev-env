import { useRef } from 'react';
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { X } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupTextarea,
  } from "@/components/ui/input-group"
import EmotePicker from './EmotePicker';
import useEmotes, { mapEmotes, replaceEmotes } from '@/hooks/useEmotes';

interface Props{
    closePopup: () => void;
}

const Chat = ({ closePopup }: Props) => {
  const username = "TestUser";
  const chatInput = useRef<HTMLTextAreaElement>(null);
	const { emotes } = useEmotes();
  const handleChatMessage = () => {
    if (!chatInput.current || !emotes) return;
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
            "user-type": "",
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
              description: "Broadcaster",
            },
          ],
          channel: "se-dev-env",
          text: chatInput.current.value,
          isAction: false,
          emotes: mapEmotes(chatInput.current.value, emotes),
          msgId: "d0bcf318-b8d2-431d-b49d-c69aaf4b1ef8",
        },
        renderedText: replaceEmotes(chatInput.current.value, emotes),
      },
    };
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
          iframe.contentWindow?.postMessage({ listener: 'onEventReceived', detail: detail }, '*');
      });
      let element = document.createElement('div');
      element.innerHTML = `<span class='font-[700]'>${username}</span>: <span class='text-zinc-300 break-all'>${chatInput.current.value}</span></div>`
      document.querySelector('.chat-container')?.prepend(element)
    }
    
    const handleEmoteClick = (emote: string) => {        
        if(!chatInput.current) return;
        chatInput.current.value = chatInput.current.value + `${emote} `
        chatInput.current?.focus();
    }

    const handleTextAreaKeybinds = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      }
    };
    
  return (
    <div className="chat bg-zinc-900 rounded-lg border border-b-0 absolute w-70">
      <div className="flex justify-between items-center p-2 px-3">
        <p className="text-[.75rem] tracking-wide font-[500]">Chat</p>
        <Button variant="ghost" size="xs" onClick={closePopup}>
          <X size={16} />
        </Button>
      </div>
      <Separator />
      <div className="h-60 flex flex-col justify-end gap-1">
        <div className="chat-container overflow-y-scroll p-2 w-full text-sm flex flex-col-reverse"></div>
      </div>
      <form action={handleChatMessage}>
        <InputGroup className="overflow-hidden h-fit break-word p-0!">
          <InputGroupTextarea
            ref={chatInput}
            className="relative break-word min-h-fit py-1"
            placeholder="Type your message"
            onKeyDown={handleTextAreaKeybinds}
          />
          <InputGroupAddon align="inline-end" className="pr-3 py-1 self-end">
            <EmotePicker onEmoteClick={handleEmoteClick} />
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
}

export default Chat