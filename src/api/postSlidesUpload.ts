export const postSlidesUpload = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/slides/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("슬라이드 업로드에 실패했습니다.");

  const data = await res.json();

  return data.url;
};
