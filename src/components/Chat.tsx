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
import ChannelPointRewards from './ChannelPointRewards';
import useUser from '@/hooks/useUser';

interface Props{
    closePopup: () => void;
}

const Chat = ({ closePopup }: Props) => {
  const { user } = useUser();
  const chatInput = useRef<HTMLTextAreaElement>(null);
  const { currentHistoryState, setCurrentHistoryState, chatHistory, sendChatMessage } = useChatMessages();

  const handleChatMessage = () => {
    if(!chatInput.current?.value) return;
    sendChatMessage(user.name, chatInput.current.value);
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
    <div className="chat bg-zinc-900 rounded-lg border absolute w-70 overflow-hidden">
      <div className="flex justify-between items-center p-2 px-3">
        <div className="flex items-center text-[.75rem] tracking-wide font-[500]">
          <p>Chat</p>
          <p className="opacity-25 font-extralight ml-1">•</p>
          <span className='flex items-center gap-1 py-1 px-2 pl-1 rounded-full transition-colors hover:bg-white/10'>
            <img className="rounded-full size-4 border-2 box-border border-white/50" src="https://a.ppy.sh/2460045?1365236350.jpg" alt="Avatar" />
            <p className="select-none">{user.name}</p>
          </span>
        </div>
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
                <span className="font-[700]">{user.name}</span>:
                <span className="text-zinc-300 break-all">{message}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-[#18181b] p-2 border-t flex gap-1 w-full items-center">
        <ChannelPointRewards />
        <form action={handleChatMessage} className='w-full'>
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
    </div>
  );
}

export default Chat