import { postSlidesUpload } from "@/api/postSlidesUpload";
import DragOverlay from "@/components/home/DragOverlay";
import Header from "@/components/home/Header";
import Slogan from "@/components/home/Slogan";
import Uploader from "@/components/home/Uploader";
import { useDraggingFile } from "@/hooks/useDraggingFile";

const Home = () => {
  const { isDragging, droppedFile } = useDraggingFile();

  const handleUpload = async (file) => {
    const url = await postSlidesUpload(file);

    if (url) {
      console.log("업로드 성공:", url);
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
        />
      </div>
      {isDragging && <DragOverlay />}
    </main>
  );
};

export default Home;
