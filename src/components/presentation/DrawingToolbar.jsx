import {
  CircleIcon,
  CursorIcon,
  EraserIcon,
  HighlighterIcon,
  PenIcon,
} from "@/assets";

import ToolBarButton from "./ToolBarButton";

const drawingTools = [
  { icon: PenIcon, title: "펜" },
  { icon: HighlighterIcon, title: "형광펜" },
  { icon: EraserIcon, title: "지우개" },
  { icon: CircleIcon, title: "도형 그리기" },
  { icon: CursorIcon, title: "커서" },
];

const DrawingToolbar = () => {
  return (
    <div
      role="toolbar"
      className="fixed top-3 flex gap-5 rounded-xl bg-black px-6 py-3"
    >
      {drawingTools.map((tool) => (
        <ToolBarButton
          key={tool.title}
          {...tool}
        />
      ))}
    </div>
  );
};

export default DrawingToolbar;
