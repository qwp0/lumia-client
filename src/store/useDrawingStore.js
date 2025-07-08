import { create } from "zustand";

import { HIGHLIGHTER_COLORS, PEN_COLORS } from "@/constants/colors";
import { ERASER_MODES } from "@/constants/tool";

export const useDrawingStore = create(
  (set, get) => ({
    activeTool: null,
    penColor: PEN_COLORS[0],
    highlighterColor: HIGHLIGHTER_COLORS[0],
    eraserMode: ERASER_MODES.PARTIAL,
    isDeleteModalOpen: false,
    canvasRef: null,
    currentPage: 1,
    pageDrawings: {},

    setActiveTool: (activeTool) => set({ activeTool }),
    setPenColor: (color) => set({ penColor: color }),
    setHighlighterColor: (color) => set({ highlighterColor: color }),
    setEraserMode: (mode) => set({ eraserMode: mode }),
    setDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
    setCanvasRef: (ref) => set({ canvasRef: ref }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setPageDrawings: (pageNumber, drawings) =>
      set((state) => ({
        pageDrawings: {
          ...state.pageDrawings,
          [pageNumber]: drawings,
        },
      })),

    clearCurrentPageCanvas: () => {
      const canvas = get().canvasRef;
      const page = get().currentPage;

      set((state) => ({
        pageDrawings: {
          ...state.pageDrawings,
          [page]: { drawings: [] },
        },
      }));

      if (canvas) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    },
  }),
  {
    name: "drawing-storage",
    partialize: (state) => ({
      pageDrawings: state.pageDrawings,
    }),
  },
);
