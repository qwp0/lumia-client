import { CloseIcon } from "@/assets";
import ChatMessage from "@/components/audience/chat/ChatMessage";

import ChatInputForm from "./ChatInputForm";

const ChatPanel = ({ messages, onClose, onSend }) => {
  return (
    <aside className="fixed right-0 bottom-0 z-30 flex h-[75%] w-[360px] flex-col rounded-t-xl bg-white shadow-xl">
      <div className="absolute top-4 right-4">
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-700"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <ul className="scrollbar-hidden mb-7 flex-1 space-y-4 overflow-y-auto px-4 py-10">
        {messages.map((message, index) => {
          if (!message || !message.nickname) return null;

          return (
            <ChatMessage
              key={index}
              message={message}
            />
          );
        })}
      </ul>
      <ChatInputForm onSend={onSend} />
    </aside>
  );
};

export default ChatPanel;
