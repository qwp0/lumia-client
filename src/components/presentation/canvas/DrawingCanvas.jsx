import { useEffect, useRef } from "react";

import { useCanvasDrawing } from "@/hooks/useCanvasDrawing";
import { useCanvasSetup } from "@/hooks/useCanvasSetup";
import { useDrawingStore } from "@/store/useDrawingStore";
import { renderPath } from "@/utils/renderPath";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const pageDrawings = useDrawingStore((state) => state.pageDrawings);

  const { onCanvasPointerDown, onCanvasPointerMove, onCanvasPointerUp } =
    useCanvasDrawing(contextRef);

  useCanvasSetup(canvasRef, contextRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    if (!canvas || !ctx) return;

    const drawings = pageDrawings[currentPage]?.drawings || [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawings.forEach((path) => renderPath(path, ctx));
  }, [currentPage, pageDrawings]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10"
      onMouseDown={onCanvasPointerDown}
      onMouseMove={onCanvasPointerMove}
      onMouseUp={onCanvasPointerUp}
    />
  );
};

export default DrawingCanvas;
