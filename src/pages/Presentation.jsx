import { useState } from "react";

import ControlToolbar from "@/components/presentation/ControlToolbar";
import DrawingToolbar from "@/components/presentation/DrawingToolbar";
import PDFViewer from "@/components/presentation/PDFViewer";
import SlideNavigation from "@/components/presentation/SlideNavigation";

const Presentation = () => {
  const [totalPagesNumber, setTotalPagesNumber] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
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
