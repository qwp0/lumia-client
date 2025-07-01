import { TOOL_NAMES } from "@/constants/tool";

export const getDrawingStyle = (activeTool, penColor, highlighterColor) => {
  if (activeTool === TOOL_NAMES.PEN) {
    return { color: penColor, width: 2, alpha: 1.0 };
  }
  if (activeTool === TOOL_NAMES.HIGHLIGHTER) {
    return { color: highlighterColor, width: 30, alpha: 0.03 };
  }

  return null;
};
