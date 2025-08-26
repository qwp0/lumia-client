import { useEffect } from "react";

import { useDrawingStore } from "@/store/useDrawingStore";
import type { CanvasRef, ContextRef } from "@/types/canvas";

interface UseCanvasSetupParams {
  canvasRef: CanvasRef;
  contextRef: ContextRef;
  containerSize: { width: number; height: number } | null;
}

export const useCanvasSetup = ({
  canvasRef,
  contextRef,
  containerSize,
}: UseCanvasSetupParams) => {
  const setCanvasRef = useDrawingStore((state) => state.setCanvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !containerSize) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = containerSize.width;
    canvas.height = containerSize.height;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    contextRef.current = ctx;
    setCanvasRef(canvas);
  }, [containerSize]);
};
