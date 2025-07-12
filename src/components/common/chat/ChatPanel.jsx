import ChatInputForm from "@/components/common/chat/ChatInputForm";
import ChatMessage from "@/components/common/chat/ChatMessage";

const ChatPanel = ({ messages, onSend, isOpen }) => {
  return (
    <aside
      className={`fixed right-6 bottom-20 z-30 flex h-[75%] w-[360px] flex-col rounded-2xl bg-white shadow-xl transition-all duration-300 ${
        isOpen
          ? "translate-y-0"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
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
