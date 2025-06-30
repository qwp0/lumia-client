import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({ pageNumber, onLoadTotalPages }) => {
  const height = window.innerHeight;

  const options = useMemo(
    () => ({
      cMapUrl: "/cmaps/",
      cMapPacked: true,
    }),
    [],
  );

  const handleLoadSuccess = ({ numPages }) => {
    onLoadTotalPages(numPages);
  };

  return (
    <Document
      file="sample.pdf"
      onLoadSuccess={handleLoadSuccess}
      options={options}
    >
      <Page
        pageNumber={pageNumber}
        height={height}
      />
    </Document>
  );
};

export default PDFViewer;
