import { useState } from "react";

import { ERASER_MODES, TOOL_NAMES } from "@/constants/tool";
import { sendDrawData } from "@/socket/events";
import { useDrawingStore } from "@/store/useDrawingStore";
import { getCanvasPointerPosition } from "@/utils/getCanvasPointerPosition";
import { getDrawingStyle } from "@/utils/getDrawingStyle";
import { getNormalizedPointerPosition } from "@/utils/getNormalizedPointerPosition";
import type { CanvasRef, ContextRef } from "@/types/canvas";
import type { Point, Path } from "@/types/drawing";

export const useCanvasDrawing = (
  contextRef: ContextRef,
  canvasRef: CanvasRef,
  roomId: string,
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);

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

  const startDrawing = (e: MouseEvent) => {
    if (!style) return;

    const { x, y } = getNormalizedPointerPosition(e, canvasRef.current);
    const { canvasX, canvasY } = getCanvasPointerPosition(
      x,
      y,
      canvasRef.current,
    );
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.globalAlpha = style.alpha;

    ctx.beginPath();
    ctx.moveTo(canvasX, canvasY);

    setCurrentPath([{ x, y }]);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent) => {
    if (!isDrawing) return;

    const { x, y } = getNormalizedPointerPosition(e, canvasRef.current);
    const { canvasX, canvasY } = getCanvasPointerPosition(
      x,
      y,
      canvasRef.current,
    );
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.lineTo(canvasX, canvasY);
    ctx.stroke();

    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const erase = (e: MouseEvent) => {
    const { x, y } = getNormalizedPointerPosition(e, canvasRef.current);
    const { canvasX, canvasY } = getCanvasPointerPosition(
      x,
      y,
      canvasRef.current,
    );
    const ctx = contextRef.current;

    const size = 40;

    ctx?.clearRect(canvasX - size / 2, canvasY - size / 2, size, size);
    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    contextRef.current?.closePath();

    if (currentPath.length === 0) return;

    let newPath: Path | null = null;

    if (
      activeTool === TOOL_NAMES.PEN ||
      activeTool === TOOL_NAMES.HIGHLIGHTER
    ) {
      if (!style) return;

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
      const updatedDrawings: Path[] = [...existing, newPath];

      setPageDrawings(currentPage, { drawings: updatedDrawings });

      if (roomId) {
        sendDrawData({ roomId, page: currentPage, drawings: updatedDrawings });
      }
    }

    setCurrentPath([]);
  };

  const onCanvasPointerDown = (e: MouseEvent) => {
    if (isPartialEraser) {
      const { x, y } = getNormalizedPointerPosition(e, canvasRef.current);

      setCurrentPath([{ x, y }]);
      setIsDrawing(true);
    } else {
      startDrawing(e);
    }
  };

  const onCanvasPointerMove = (e: MouseEvent) => {
    if (!isDrawing) return;
    isPartialEraser ? erase(e) : draw(e);
  };

  return {
    onCanvasPointerDown,
    onCanvasPointerMove,
    onCanvasPointerUp: stopDrawing,
  };
};
