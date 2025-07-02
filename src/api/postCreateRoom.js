export const postCreateRoom = async (slideUrl) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/room/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slideUrl }),
    });

    if (res.ok) {
      const data = await res.json();

      return data.roomId;
    }
  } catch (error) {
    console.log(error.message);
  }
};
