import { useState } from "react";

import {
  CircleIcon,
  CursorIcon,
  EraserIcon,
  HighlighterIcon,
  PenIcon,
} from "@/assets";

import ToolBarButton from "./ToolBarButton";

const DrawingToolbar = () => {
  const [activeTool, setActiveTool] = useState(null);

  const drawingTools = [
    { icon: PenIcon, title: "펜" },
    { icon: HighlighterIcon, title: "형광펜" },
    { icon: EraserIcon, title: "지우개" },
    { icon: CircleIcon, title: "도형 그리기" },
    { icon: CursorIcon, title: "커서" },
  ].map((tool) => ({
    ...tool,
    onClick: () => setActiveTool(tool.title),
  }));

  return (
    <div
      role="toolbar"
      className="fixed top-3 z-10 flex gap-5 rounded-xl bg-black px-6 py-3"
    >
      {drawingTools.map((tool) => (
        <ToolBarButton
          key={tool.title}
          {...tool}
          isActive={tool.title === activeTool}
        />
      ))}
    </div>
  );
};

export default DrawingToolbar;
