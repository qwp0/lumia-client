import { useState } from "react";

import { CursorIcon, EraserIcon, HighlighterIcon, PenIcon } from "@/assets";
import ConfirmModal from "@/components/modal/ConfrmModal";
import ColorPalette from "@/components/presentation/toolbar/popover/ColorPalette";
import ShapeSelector from "@/components/presentation/toolbar/popover/ShapeSelector";
import ToolBarButton from "@/components/presentation/toolbar/ToolBarButton";
import { highlighterColors, penColors } from "@/constants/colors";
import { shapeIconMap } from "@/constants/shape";

const DrawingToolbar = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [selectedPenColor, setSelectedPenColor] = useState(penColors[0]);
  const [selectedHighlighterColor, setSelectedHighLighterColor] = useState(
    highlighterColors[0],
  );
  const [selectedShape, setSelectedShape] = useState("circle");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const drawingTools = [
    { title: "펜", type: "toggle", icon: PenIcon },
    { title: "형광펜", type: "toggle", icon: HighlighterIcon },
    { title: "지우개", type: "modal", icon: EraserIcon },
    { title: "도형 그리기", type: "toggle", icon: shapeIconMap[selectedShape] },
    { title: "커서", type: "sticky", icon: CursorIcon },
  ];

  const handleToolClick = (toolName, type) => {
    if (type === "toggle") {
      setActiveTool((prev) => (prev === toolName ? null : toolName));
    } else if (type === "sticky") {
      setActiveTool(toolName);
    } else if (type === "modal") {
      setIsDeleteModalOpen(true);
    }
  };

  const popupComponents = {
    "펜": (
      <ColorPalette
        selectedColor={selectedPenColor}
        onSelect={setSelectedPenColor}
        toolName="펜"
      />
    ),
    "형광펜": (
      <ColorPalette
        selectedColor={selectedHighlighterColor}
        onSelect={setSelectedHighLighterColor}
        toolName="형광펜"
      />
    ),
    "도형 그리기": (
      <ShapeSelector
        selectedShape={selectedShape}
        onSelect={setSelectedShape}
      />
    ),
  };

  return (
    <>
      <div
        role="toolbar"
        className="fixed top-3 z-10 flex gap-5 rounded-xl bg-black px-6 py-3"
      >
        {drawingTools.map((tool) => (
          <div
            key={tool.title}
            className="relative"
          >
            <ToolBarButton
              isActive={tool.title === activeTool}
              onClick={() => handleToolClick(tool.title, tool.type)}
              {...tool}
            />
            {tool.title === activeTool && popupComponents[tool.title]}
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        type="deleteAll"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default DrawingToolbar;
