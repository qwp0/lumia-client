import { SendIcon } from "@/assets";
import { useRef } from "react";

interface ChatInputFormProps {
  onSend: (message: string) => void;
}

const ChatInputForm = ({ onSend }: ChatInputFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = inputRef.current?.value || "";

        if (!value.trim()) return;
        onSend(value);
        if (inputRef.current) inputRef.current.value = "";
      }}
      className="absolute bottom-0 flex w-full items-center gap-2 px-4 py-3"
    >
      <input
        ref={inputRef}
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
