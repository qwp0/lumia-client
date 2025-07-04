import { useState } from "react";

import { ERASER_MODES, TOOL_NAMES } from "@/constants/tool";
import { useDrawingStore } from "@/store/useDrawingStore";
import { getDrawingStyle } from "@/utils/getDrawingStyle";
import { getPointerPosition } from "@/utils/getPointerPosition";

export const useCanvasDrawing = (contextRef) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  const { setPageDrawings } = useDrawingStore();
  const activeTool = useDrawingStore((state) => state.activeTool);
  const penColor = useDrawingStore((state) => state.penColor);
  const highlighterColor = useDrawingStore((state) => state.highlighterColor);
  const eraserMode = useDrawingStore((state) => state.eraserMode);
  const currentPage = useDrawingStore((state) => state.currentPage);
  const pageDrawings = useDrawingStore((state) => state.pageDrawings);

  const isPartialEraser =
    activeTool === TOOL_NAMES.ERASER && eraserMode === ERASER_MODES.PARTIAL;

  const style = getDrawingStyle(activeTool, penColor, highlighterColor);

  const startDrawing = (e) => {
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

  const erase = (e) => {
    const { x, y } = getPointerPosition(e);
    const ctx = contextRef.current;
    const size = 40;

    ctx.clearRect(x - size / 2, y - size / 2, size, size);
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
      newPath = {
        type: activeTool,
        color: style.color,
        width: style.width,
        alpha: activeTool === TOOL_NAMES.HIGHLIGHTER ? 0.3 : style.alpha,
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

  const onCanvasPointerDown = (e) => {
    if (isPartialEraser) {
      const { x, y } = getPointerPosition(e);

      setCurrentPath([{ x, y }]);
      setIsDrawing(true);
    } else {
      startDrawing(e);
    }
  };

  const onCanvasPointerMove = (e) => {
    if (!isDrawing) return;

    if (isPartialEraser) {
      erase(e);
    } else {
      draw(e);
    }
  };

  return {
    onCanvasPointerDown,
    onCanvasPointerMove,
    onCanvasPointerUp: stopDrawing,
  };
};
