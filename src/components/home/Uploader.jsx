import { FileUploadIcon } from "@/assets";

const Uploader = () => {
  return (
    <section className="flex h-[300px] w-[800px] flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-gray-300 font-light">
      <FileUploadIcon />
      <p>여기에 발표 자료를 드래그하거나 클릭해서 업로드하세요.</p>
      <p className="text-gray-400">PDF, PNG, JPG</p>
    </section>
  );
};

export default Uploader;
