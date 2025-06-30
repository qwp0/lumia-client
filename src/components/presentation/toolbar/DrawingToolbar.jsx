import { useState } from "react";

import { CursorIcon, EraserIcon, HighlighterIcon, PenIcon } from "@/assets";
import ConfirmModal from "@/components/modal/ConfrmModal";
import { highlighterColors, penColors } from "@/constants/colors";
import { shapeIconMap } from "@/constants/shape";

import ColorPalette from "./popover/ColorPalette";
import ShapeSelector from "./popover/ShapeSelector";
import ToolBarButton from "./ToolBarButton";

const DrawingToolbar = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [selectedPenColor, setSelectedPenColor] = useState(penColors[0]);
  const [selectedHighlighterColor, setSelectedHighLighterColor] = useState(
    highlighterColors[0],
  );
  const [selectedShape, setSelectedShape] = useState("circle");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const drawingTools = [
    { icon: PenIcon, title: "펜" },
    { icon: HighlighterIcon, title: "형광펜" },
    { icon: EraserIcon, title: "지우개" },
    { icon: shapeIconMap[selectedShape], title: "도형 그리기" },
    { icon: CursorIcon, title: "커서" },
  ];

  const handleToolClick = (toolName) => {
    setActiveTool((prev) => (prev === toolName ? null : toolName));

    if (toolName === "지우개") {
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
              onClick={() => handleToolClick(tool.title)}
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
