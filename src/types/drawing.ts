import { ERASER_MODES, TOOL_NAMES } from "@/constants/tool";

export type EraserMode = (typeof ERASER_MODES)[keyof typeof ERASER_MODES];

export type Tool = (typeof TOOL_NAMES)[keyof typeof TOOL_NAMES];

export interface Point {
  x: number;
  y: number;
}

export interface PenPath {
  type: typeof TOOL_NAMES.PEN;
  color: string;
  width: number;
  alpha: number;
  points: Point[];
}

export interface HighlighterPath {
  type: typeof TOOL_NAMES.HIGHLIGHTER;
  color: string;
  width: number;
  alpha: number;
  points: Point[];
}

export interface EraserPath {
  type: typeof TOOL_NAMES.ERASER;
  size: number;
  points: Point[];
}

export type Path = PenPath | HighlighterPath | EraserPath;

export interface PageDrawings {
  drawings: Path[];
}
