import { useState } from "react";

import {
  CircleIcon,
  CursorIcon,
  EraserIcon,
  HighlighterIcon,
  PenIcon,
} from "@/assets";

import ColorPalette from "./popover/ColorPalette";
import ToolBarButton from "./ToolBarButton";

const drawingTools = [
  { icon: PenIcon, title: "펜" },
  { icon: HighlighterIcon, title: "형광펜" },
  { icon: EraserIcon, title: "지우개" },
  { icon: CircleIcon, title: "도형 그리기" },
  { icon: CursorIcon, title: "커서" },
];

const DrawingToolbar = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#EB4C60");

  const handleToolClick = (toolName) => {
    setActiveTool(toolName);
  };

  const isShowColorPalette = activeTool === "펜" || activeTool === "형광펜";

  return (
    <div
      role="toolbar"
      className="fixed top-3 z-10 flex gap-5 rounded-xl bg-black px-6 py-3"
    >
      {drawingTools.map((tool) => (
        <ToolBarButton
          key={tool.title}
          isActive={tool.title === activeTool}
          onClick={() => handleToolClick(tool.title)}
          {...tool}
        />
      ))}
      {isShowColorPalette && (
        <ColorPalette
          selectedColor={selectedColor}
          onSelect={(color) => {
            setSelectedColor(color);
          }}
          toolName={activeTool}
        />
      )}
    </div>
  );
};

export default DrawingToolbar;
