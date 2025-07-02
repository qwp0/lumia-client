import { useState } from "react";
import { useLocation } from "react-router-dom";

import DrawingCanvas from "@/components/presentation/canvas/DrawingCanvas";
import ControlToolbar from "@/components/presentation/toolbar/ControlToolbar";
import DrawingToolbar from "@/components/presentation/toolbar/DrawingToolbar";
import PDFViewer from "@/components/presentation/viewer/PDFViewer";
import SlideNavigation from "@/components/presentation/viewer/SlideNavigation";
import { useDrawingStore } from "@/store/useDrawingStore";

const Presentation = () => {
  const [totalPagesNumber, setTotalPagesNumber] = useState(null);
  const location = useLocation();
  const slideUrl = location.state.url;

  const currentPage = useDrawingStore((state) => state.currentPage);
  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <DrawingCanvas />
      <PDFViewer
        file={slideUrl}
        pageNumber={currentPage}
        onLoadTotalPages={setTotalPagesNumber}
      />
      <SlideNavigation
        totalPagesNumber={totalPagesNumber}
        pageNumber={currentPage}
        onPageChange={setCurrentPage}
      />
      <DrawingToolbar />
      <ControlToolbar />
    </div>
  );
};

export default Presentation;
