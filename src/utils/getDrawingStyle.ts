import { TOOL_NAMES } from "@/constants/tool";
import type { Tool } from "@/types/drawing";

export const getDrawingStyle = (
  activeTool: Tool | null,
  penColor: string,
  highlighterColor: string,
) => {
  if (activeTool === TOOL_NAMES.PEN) {
    return { color: penColor, width: 2, alpha: 1.0 };
  }
  if (activeTool === TOOL_NAMES.HIGHLIGHTER) {
    return { color: highlighterColor, width: 30, alpha: 0.03 };
  }

  return null;
};
