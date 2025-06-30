import { create } from "zustand";

import { highlighterColors, penColors } from "@/constants/colors";

export const useDrawingStore = create((set, get) => ({
  activeTool: null,
  penColor: penColors[0],
  highlighterColor: highlighterColors[0],
  shape: "circle",
  isDeleteModalOpen: false,
  canvasRef: null,

  setActiveTool: (activeTool) => set({ activeTool }),
  setPenColor: (color) => set({ penColor: color }),
  setHighlighterColor: (color) => set({ highlighterColor: color }),
  setShape: (shape) => set({ shape }),
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
