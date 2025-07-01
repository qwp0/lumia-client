import { useEffect, useRef, useState } from "react";

import { ERASER_MODES, TOOL_NAMES } from "@/constants/tool";
import { useDrawingStore } from "@/store/useDrawingStore";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  const { setCanvasRef, setPageDrawings } = useDrawingStore();
  const activeTool = useDrawingStore((state) => state.activeTool);
  const penColor = useDrawingStore((state) => state.penColor);
  const highlighterColor = useDrawingStore((state) => state.highlighterColor);
  const eraserMode = useDrawingStore((state) => state.eraserMode);
  const currentPage = useDrawingStore((state) => state.currentPage);
  const pageDrawings = useDrawingStore((state) => state.pageDrawings);

  const isPartialEraser =
    activeTool === TOOL_NAMES.ERASER && eraserMode === ERASER_MODES.PARTIAL;

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

  const getPointerPosition = (e) => ({
    x: e.clientX,
    y: e.clientY,
  });

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

    const { x, y } = getPointerPosition(e);
    const ctx = contextRef.current;

    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.globalAlpha = style.alpha;

    ctx.beginPath();
    ctx.moveTo(x, y);

    setCurrentPath([{ x, y }]);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { x, y } = getPointerPosition(e);
    const ctx = contextRef.current;

    ctx.lineTo(x, y);
    ctx.stroke();

    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    contextRef.current.closePath();

    if (currentPath.length === 0) return;

    let newPath = null;

    if (
      activeTool === TOOL_NAMES.PEN ||
      activeTool === TOOL_NAMES.HIGHLIGHTER
    ) {
      const style = getCurrentStyle();

      newPath = {
        type: activeTool,
        color: style.color,
        width: style.width,
        alpha: style.alpha,
        points: currentPath,
      };
    } else if (isPartialEraser) {
      newPath = {
        type: "eraser",
        size: 40,
        points: currentPath,
      };
    }

    if (newPath) {
      const existing = pageDrawings[currentPage]?.drawings || [];

      setPageDrawings(currentPage, {
        drawings: [...existing, newPath],
      });
    }

    setCurrentPath([]);
  };

  const erase = (e) => {
    const { x, y } = getPointerPosition(e);
    const ctx = contextRef.current;
    const size = 40;

    ctx.clearRect(x - size / 2, y - size / 2, size, size);
    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const handleMouseDown = (e) => {
    if (isPartialEraser) {
      setCurrentPath([{ x: e.clientX, y: e.clientY }]);
      setIsDrawing(true);
    } else {
      startDrawing(e);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    if (isPartialEraser) {
      erase(e);
    } else {
      draw(e);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrawing}
    />
  );
};

export default DrawingCanvas;
