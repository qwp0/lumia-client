import { useState } from "react";

import DrawingCanvas from "@/components/presentation/canvas/DrawingCanvas";
import ControlToolbar from "@/components/presentation/toolbar/ControlToolbar";
import DrawingToolbar from "@/components/presentation/toolbar/DrawingToolbar";
import PDFViewer from "@/components/presentation/viewer/PDFViewer";
import SlideNavigation from "@/components/presentation/viewer/SlideNavigation";

const Presentation = () => {
  const [totalPagesNumber, setTotalPagesNumber] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <DrawingCanvas />
      <PDFViewer
        pageNumber={pageNumber}
        onLoadTotalPages={setTotalPagesNumber}
      />
      <SlideNavigation
        totalPagesNumber={totalPagesNumber}
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
      />
      <DrawingToolbar />
      <ControlToolbar />
    </div>
  );
};

export default Presentation;
