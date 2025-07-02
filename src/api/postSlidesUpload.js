export const postSlidesUpload = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/slides/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();

      return data.url;
    }
  } catch (error) {
    console.log(error.message);
  }
};
