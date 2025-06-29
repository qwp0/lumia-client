import { useRef } from "react";

import { FileUploadIcon } from "@/assets";

const Uploader = () => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section
      className="flex h-[300px] w-[800px] flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-gray-300 font-light"
      onClick={handleClick}
    >
      <FileUploadIcon />
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        className="hidden"
      />
      <p>여기에 발표 자료를 드래그하거나 클릭해서 업로드하세요.</p>
      <p className="text-gray-400">PDF</p>
    </section>
  );
};

export default Uploader;
