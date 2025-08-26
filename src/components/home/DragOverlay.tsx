import {
  CornerLeftBottomIcon,
  CornerLeftTopIcon,
  CornerRightBottomIcon,
  CornerRightTopIcon,
} from "@/assets";

const DragOverlay = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[3px]">
      <div className="absolute top-4 left-4">
        <CornerLeftTopIcon />
      </div>
      <div className="absolute bottom-4 left-4">
        <CornerLeftBottomIcon />
      </div>
      <div className="absolute top-4 right-4">
        <CornerRightTopIcon />
      </div>
      <div className="absolute right-4 bottom-4">
        <CornerRightBottomIcon />
      </div>
      <p className="text-[36px]">발표용 PDF 파일을 여기에 놓아주세요!</p>
    </div>
  );
};

export default DragOverlay;
