import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postSlidesUpload } from "@/api/postSlidesUpload";
import DragOverlay from "@/components/home/DragOverlay";
import Header from "@/components/home/Header";
import Slogan from "@/components/home/Slogan";
import Uploader from "@/components/home/Uploader";
import { useDraggingFile } from "@/hooks/useDraggingFile";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { isDragging, droppedFile } = useDraggingFile();

  const handleUpload = async (file) => {
    setIsLoading(true);
    const url = await postSlidesUpload(file);

    setIsLoading(false);

    if (url) {
      navigate("/presentation", { state: { url } });
    }
  };

  return (
    <main className="flex h-full min-h-screen flex-col justify-center bg-[#08090A] text-white">
      <Header />
      <div className="flex flex-col items-center gap-30 py-30">
        <Slogan />
        <Uploader
          onUpload={handleUpload}
          droppedFile={droppedFile}
          isLoading={isLoading}
        />
      </div>
      {isDragging && <DragOverlay />}
    </main>
  );
};

export default Home;
