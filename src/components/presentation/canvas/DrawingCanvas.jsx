import { useEffect, useRef, useState } from "react";

import { TOOL_NAMES } from "@/constants/tool";
import { useDrawingStore } from "@/store/useDrawingStore";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const setCanvasRef = useDrawingStore((state) => state.setCanvasRef);
  const activeTool = useDrawingStore((state) => state.activeTool);
  const penColor = useDrawingStore((state) => state.penColor);
  const highlighterColor = useDrawingStore((state) => state.highlighterColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    contextRef.current = ctx;
    setCanvasRef(canvas);
  }, []);

  const getCurrentStyle = () => {
    if (activeTool === TOOL_NAMES.PEN) {
      return { color: penColor, width: 2, alpha: 1.0 };
    }
    if (activeTool === TOOL_NAMES.HIGHLIGHTER) {
      return { color: highlighterColor, width: 30, alpha: 0.05 };
    }

    return null;
  };

  const startDrawing = (e) => {
    const style = getCurrentStyle();

    if (!style) return;

    const ctx = contextRef.current;

    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.globalAlpha = style.alpha;

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const ctx = contextRef.current;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
    />
  );
};

export default DrawingCanvas;
