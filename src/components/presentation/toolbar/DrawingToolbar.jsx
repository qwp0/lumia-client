import { CursorIcon, EraserIcon, HighlighterIcon, PenIcon } from "@/assets";
import ConfirmModal from "@/components/modal/ConfrmModal";
import ToolPopup from "@/components/presentation/toolbar/popup/ToolPopup";
import ToolBarButton from "@/components/presentation/toolbar/ToolBarButton";
import { TOOL_NAMES } from "@/constants/tool";
import { useDrawingStore } from "@/store/useDrawingStore";

const DrawingToolbar = () => {
  const activeTool = useDrawingStore((state) => state.activeTool);
  const isDeleteModalOpen = useDrawingStore((state) => state.isDeleteModalOpen);
  const { setActiveTool, setDeleteModalOpen, clearCurrentPageCanvas } =
    useDrawingStore();

  const drawingTools = [
    { title: TOOL_NAMES.PEN, type: "toggle", icon: PenIcon },
    { title: TOOL_NAMES.HIGHLIGHTER, type: "toggle", icon: HighlighterIcon },
    { title: TOOL_NAMES.ERASER, type: "toggle", icon: EraserIcon },
    { title: TOOL_NAMES.CURSOR, type: "sticky", icon: CursorIcon },
  ];

  const handleToolClick = (toolName, type) => {
    if (type === "toggle") {
      setActiveTool(activeTool === toolName ? null : toolName);
    } else if (type === "sticky") {
      setActiveTool(toolName);
    }
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
            {tool.title === activeTool && <ToolPopup activeTool={activeTool} />}
          </div>
        ))}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        type="deleteAll"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          clearCurrentPageCanvas();
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default DrawingToolbar;
