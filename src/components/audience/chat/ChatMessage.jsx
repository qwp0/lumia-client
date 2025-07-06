const ChatMessage = ({ message }) => {
  const { nickname, role, text, time } = message;

  const isHost = role === "host";

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
  const profileColor = isHost ? "bg-black" : getColorFromNickname(nickname);

  return (
    <li className="flex items-start gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${profileColor}`}
      >
        {nickname.charAt(0)}
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-zinc-800">{nickname}</div>
        <div className="mb-1 text-xs text-zinc-400">{time}</div>
        <div className="max-w-[260px] rounded-lg bg-zinc-100 px-4 py-2 text-sm break-words text-zinc-800">
          {text}
        </div>
      </div>
    </li>
  );
};

export default ChatMessage;
