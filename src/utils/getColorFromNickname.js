export const getColorFromNickname = (nickname) => {
  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
    "bg-orange-500",
  ];
  const index = nickname.charCodeAt(0) % colors.length;

  return colors[index];
};
