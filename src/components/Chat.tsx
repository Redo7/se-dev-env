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
import useChatMessages from '@/hooks/useChatMessages';

interface Props{
    closePopup: () => void;
}

const Chat = ({ closePopup }: Props) => {
  const username = "TestUser";
  const chatInput = useRef<HTMLTextAreaElement>(null);
  const { currentHistoryState, setCurrentHistoryState, chatHistory, sendChatMessage } = useChatMessages();

  const handleChatMessage = () => {
    if(!chatInput.current?.value) return;
    sendChatMessage(username, chatInput.current.value);
  }
    
  const handleEmoteClick = (emote: string) => {        
    if(!chatInput.current) return;
    chatInput.current.value = chatInput.current.value + `${emote} `
    chatInput.current?.focus();
  }

  const handleTextAreaKeybinds = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if(chatInput.current?.value === "") return;
      e.currentTarget.form?.requestSubmit();
    }
    if(!chatInput.current) return;
    if(e.key === 'ArrowUp' && chatHistory.length !== 0 && currentHistoryState + 1 < chatHistory.length){
      setCurrentHistoryState(currentHistoryState + 1);
      chatInput.current.value = chatHistory[currentHistoryState + 1];
    } else if(e.key === 'ArrowDown' && chatHistory.length !== 0 && currentHistoryState !== -1 && currentHistoryState - 1 > -1){
      setCurrentHistoryState(currentHistoryState - 1);
      chatInput.current.value = chatHistory[currentHistoryState - 1];
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
        <div className="chat-container overflow-y-scroll p-2 w-full text-sm flex flex-col-reverse">
          {chatHistory.map((message: string, index: number) => {
            return (
              <div key={index}>
                <span className="font-[700]">{username}</span>:
                <span className="text-zinc-300 break-all">{message}</span>
              </div>
            );
          })}
        </div>
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