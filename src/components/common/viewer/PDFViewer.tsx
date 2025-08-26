import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Dispatch, SetStateAction, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string;
  pageNumber: number;
  onLoadTotalPages: Dispatch<SetStateAction<number | null>>;
  width: number;
}

const PDFViewer = ({
  file,
  pageNumber,
  onLoadTotalPages,
  width,
}: PDFViewerProps) => {
  const options = useMemo(
    () => ({
      cMapUrl: "/cmaps/",
      cMapPacked: true,
    }),
    [],
  );

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    onLoadTotalPages(numPages);
  };

  const handleRenderSuccess = () => {
    window.__pdfReady = true;
  };

  return (
    <Document
      file={file}
      onLoadSuccess={handleLoadSuccess}
      options={options}
    >
      <Page
        pageNumber={pageNumber}
        width={width}
        onRenderSuccess={handleRenderSuccess}
      />
    </Document>
  );
};

export default PDFViewer;
