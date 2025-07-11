import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadCapturedPdf = async ({ pageCount, setPage }) => {
  const today = new Date().toISOString().split("T")[0];
  const fileName = `presentation_${today}.pdf`;
  let first = true;
  let pdf = null;

  for (let i = 1; i <= pageCount; i++) {
    setPage(i);
    window.__pdfReady = false;

    const element = document.getElementById("capture-target");
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (first) {
      pdf = new jsPDF({
        orientation: canvasWidth >= canvasHeight ? "landscape" : "portrait",
        unit: "px",
        format: [canvasWidth, canvasHeight],
      });
      first = false;
    } else {
      pdf.addPage(
        [canvasWidth, canvasHeight],
        canvasWidth >= canvasHeight ? "landscape" : "portrait",
      );
    }

    pdf.addImage(imgData, "PNG", 0, 0, canvasWidth, canvasHeight);
  }

  pdf.save(fileName);
};
