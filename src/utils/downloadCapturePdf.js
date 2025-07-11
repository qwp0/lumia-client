import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const waitForRender = async () => {
  return new Promise((resolve) => {
    const check = () => {
      const element = document.getElementById("capture-target");
      const canvas = element?.querySelector("canvas");

      const canvasReady = canvas && canvas.width > 0 && canvas.height > 0;
      const pdfReady = window.__pdfReady === true;

      if (canvasReady && pdfReady) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    };

    check();
  });
};

export const downloadCapturedPdf = async ({ pageCount, setPage }) => {
  const today = new Date().toISOString().split("T")[0];
  const fileName = `presentation_${today}.pdf`;
  let first = true;
  let pdf = null;

  for (let i = 1; i <= pageCount; i++) {
    if (i === 1) {
      setPage(2);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setPage(i);
    window.__pdfReady = false;
    await waitForRender();
    await new Promise((resolve) => setTimeout(resolve, 300));

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
