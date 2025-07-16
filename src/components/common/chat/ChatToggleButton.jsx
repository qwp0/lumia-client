import { ChatIcon, CloseIcon } from "@/assets";
import { useChatStore } from "@/store/useChatStore";

const ChatToggleButton = ({ onClick, isChatOpen }) => {
  const isUnread = useChatStore((state) => state.isUnread);

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed right-6 bottom-6 z-30 rounded-full bg-white/90 p-3 shadow-md"
      title="피드백 보내기"
    >
      <div className="relative">
        {isChatOpen ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <ChatIcon className="pointer-events-none h-6 w-6 text-black" />
        )}
        {isUnread && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
    </button>
  );
};

export default ChatToggleButton;
