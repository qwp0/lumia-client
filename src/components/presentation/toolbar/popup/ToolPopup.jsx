import ShapeSelector from "@/components/presentation/toolbar/popup//ShapeSelector";
import ColorPalette from "@/components/presentation/toolbar/popup/ColorPalette";
import EraserSelector from "@/components/presentation/toolbar/popup/EraserSelector";
import { HIGHLIGHTER_COLORS, PEN_COLORS } from "@/constants/colors";
import { TOOL_NAMES } from "@/constants/tool";
import { useDrawingStore } from "@/store/useDrawingStore";

const ToolPopup = ({ activeTool }) => {
  const penColor = useDrawingStore((state) => state.penColor);
  const setPenColor = useDrawingStore((state) => state.setPenColor);
  const highlighterColor = useDrawingStore((state) => state.highlighterColor);
  const setHighlighterColor = useDrawingStore(
    (state) => state.setHighlighterColor,
  );

  switch (activeTool) {
    case TOOL_NAMES.PEN:
      return (
        <ColorPalette
          selectedColor={penColor}
          onSelect={setPenColor}
          colors={PEN_COLORS}
        />
      );
    case TOOL_NAMES.HIGHLIGHTER:
      return (
        <ColorPalette
          selectedColor={highlighterColor}
          onSelect={setHighlighterColor}
          colors={HIGHLIGHTER_COLORS}
        />
      );
    case TOOL_NAMES.SHAPE:
      return <ShapeSelector />;
    case TOOL_NAMES.ERASER:
      return <EraserSelector />;
    default:
      return null;
  }
};

export default ToolPopup;
