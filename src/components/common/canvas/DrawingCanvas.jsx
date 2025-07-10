import { useEffect, useRef } from "react";

import { useCanvasDrawing } from "@/hooks/useCanvasDrawing";
import { useCanvasSetup } from "@/hooks/useCanvasSetup";
import { useDrawingStore } from "@/store/useDrawingStore";
import { renderPath } from "@/utils/renderPath";

const DrawingCanvas = ({ roomId, isDrawable, containerSize }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const pageDrawings = useDrawingStore((state) => state.pageDrawings);

  useCanvasSetup(canvasRef, contextRef, containerSize);
  const { onCanvasPointerDown, onCanvasPointerMove, onCanvasPointerUp } =
    useCanvasDrawing(contextRef, canvasRef, roomId);

  const eventHandlers = isDrawable
    ? {
        onMouseDown: onCanvasPointerDown,
        onMouseMove: onCanvasPointerMove,
        onMouseUp: onCanvasPointerUp,
      }
    : {};

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    if (!canvas || !ctx) return;

    const drawings = pageDrawings[currentPage]?.drawings || [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings.forEach((path) =>
      renderPath(path, ctx, canvas.width, canvas.height),
    );
  }, [currentPage, pageDrawings, containerSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-10"
      {...eventHandlers}
    />
  );
};

export default DrawingCanvas;
