const ChatMessage = ({ message }) => {
  const getColorFromNickname = (nickname) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-red-500",
    ];
    const index = nickname.charCodeAt(0) % colors.length;

    return colors[index];
  };
  const color = getColorFromNickname(message.nickname);

  return (
    <li className="flex items-start gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${color}`}
      >
        {message.nickname.charAt(0)}
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-zinc-800">
          {message.nickname}
        </div>
        <div className="mb-1 text-xs text-zinc-400">{message.time}</div>
        <div className="max-w-[260px] rounded-lg bg-zinc-100 px-4 py-2 text-sm text-zinc-800">
          {message.text}
        </div>
      </div>
    </li>
  );
};

export default ChatMessage;
