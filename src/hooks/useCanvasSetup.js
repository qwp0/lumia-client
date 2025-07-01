import { useEffect } from "react";

import { useDrawingStore } from "@/store/useDrawingStore";

export const useCanvasSetup = (canvasRef, contextRef) => {
  const setCanvasRef = useDrawingStore((s) => s.setCanvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    contextRef.current = ctx;
    setCanvasRef(canvas);
  }, []);
};
