import { create } from "zustand";

import { HIGHLIGHTER_COLORS, PEN_COLORS } from "@/constants/colors";
import { ERASER_MODES } from "@/constants/tool";
import type { EraserMode, PageDrawings, Tool } from "@/types/drawing";

interface DrawingState {
  activeTool: Tool | null;
  penColor: string;
  highlighterColor: string;
  eraserMode: EraserMode;
  isDeleteModalOpen: boolean;
  canvasRef: HTMLCanvasElement | null;
  currentPage: number;
  pageDrawings: Record<number, PageDrawings>;

  setActiveTool: (tool: Tool | null) => void;
  setPenColor: (color: string) => void;
  setHighlighterColor: (color: string) => void;
  setEraserMode: (mode: EraserMode) => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
  setCanvasRef: (ref: HTMLCanvasElement | null) => void;
  setCurrentPage: (page: number) => void;
  setPageDrawings: (pageNumber: number, drawings: PageDrawings) => void;
  clearPageDrawings: () => void;
  clearCurrentPageCanvas: () => void;
}

export const useDrawingStore = create<DrawingState>((set, get) => ({
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
  clearPageDrawings: () => set({ pageDrawings: {} }),
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
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
}));
