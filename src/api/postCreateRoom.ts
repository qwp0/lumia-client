export const postCreateRoom = async (slideUrl: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/room/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slideUrl }),
  });

  if (!res.ok) throw new Error("방 생성에 실패했습니다.");

  const data = await res.json();

  return data.roomId;
};
