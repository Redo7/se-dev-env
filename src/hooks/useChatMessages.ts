import useEmotes, { mapEmotes, replaceEmotes } from "@/hooks/useEmotes";
import { useState } from "react";

function useChatMessages() {
  const { emotes } = useEmotes();
  const [currentHistoryState, setCurrentHistoryState] = useState<number>(-1);
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  function sendChatMessage(username: string, message: string) {
    if (!emotes) return;
    let detail = {
      listener: "message",
      event: {
        service: "twitch",
        data: {
          time: Date.now(),
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
          userId: "1",
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
          text: message,
          isAction: false,
          emotes: mapEmotes(message, emotes),
          msgId: "d0bcf318-b8d2-431d-b49d-c69aaf4b1ef8",
        },
        renderedText: replaceEmotes(message, emotes),
      },
    };
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        { listener: "onEventReceived", detail: detail },
        "*",
      );
    });
    setChatHistory([message, ...chatHistory]);
    setCurrentHistoryState(-1);
  }

  return {
    emotes,
    currentHistoryState,
    setCurrentHistoryState,
    chatHistory,
    setChatHistory,
    sendChatMessage,
  };
}

export default useChatMessages