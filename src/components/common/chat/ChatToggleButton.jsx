import { ChatIcon } from "@/assets";

const ChatToggleButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed right-6 bottom-6 z-30 rounded-full bg-white/90 p-3 shadow-md"
      title="피드백 보내기"
    >
      <ChatIcon className="pointer-events-none h-6 w-6 text-black" />
    </button>
  );
};

export default ChatToggleButton;
