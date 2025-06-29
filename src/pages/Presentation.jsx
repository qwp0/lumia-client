import { useState } from "react";

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
    </div>
  );
};

export default Presentation;
