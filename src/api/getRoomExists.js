export const getRoomExists = async (roomId) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/room/${roomId}/exists`,
  );

  if (!res.ok) throw new Error("방이 존재하지 않습니다.");
  const data = await res.json();

  return data.exists;
};
