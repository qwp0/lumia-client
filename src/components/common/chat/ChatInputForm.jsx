import { SendIcon } from "@/assets";

const ChatInputForm = ({ onSend }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = e.target.message.value;

        if (!value.trim()) return;
        onSend(value);
        e.target.reset();
      }}
      className="absolute bottom-0 flex w-full items-center gap-2 px-4 py-3"
    >
      <input
        name="message"
        type="text"
        autoComplete="off"
        placeholder="의견을 남겨보세요!"
        className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none"
      />
      <button
        type="submit"
        className="text-[#EB4C60] hover:text-[#dc3e55]"
      >
        <SendIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInputForm;
