import { create } from "zustand";

import { HIGHLIGHTER_COLORS, PEN_COLORS } from "@/constants/colors";
import { ERASER_MODES } from "@/constants/tool";

export const useDrawingStore = create((set, get) => ({
  activeTool: null,
  penColor: PEN_COLORS[0],
  highlighterColor: HIGHLIGHTER_COLORS[0],
  shape: "circle",
  eraserMode: ERASER_MODES.PARTIAL,
  isDeleteModalOpen: false,
  canvasRef: null,

  setActiveTool: (activeTool) => set({ activeTool }),
  setPenColor: (color) => set({ penColor: color }),
  setHighlighterColor: (color) => set({ highlighterColor: color }),
  setShape: (shape) => set({ shape }),
  setEraserMode: (mode) => set({ eraserMode: mode }),
  setDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
  setCanvasRef: (ref) => set({ canvasRef: ref }),

  clearCanvas: () => {
    const canvas = get().canvasRef;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
}));
