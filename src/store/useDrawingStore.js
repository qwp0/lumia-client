import { create } from "zustand";

import { highlighterColors, penColors } from "@/constants/colors";

export const useDrawingStore = create((set) => ({
  activeTool: null,
  penColor: penColors[0],
  highlighterColor: highlighterColors[0],
  shape: "circle",
  isDeleteModalOpen: false,

  setActiveTool: (activeTool) => set({ activeTool }),
  setPenColor: (color) => set({ penColor: color }),
  setHighlighterColor: (color) => set({ highlighterColor: color }),
  setShape: (shape) => set({ shape }),
  setDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
}));
