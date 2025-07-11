import { CursorIcon, EraserIcon, HighlighterIcon, PenIcon } from "@/assets";
import ToolBarButton from "@/components/common/button/ToolBarButton";
import ChoiceModal from "@/components/modal/ChoiceModal";
import ToolPopupController from "@/components/presentation/toolbar/toolSettings/ToolPopupController";
import { TOOL_NAMES } from "@/constants/tool";
import { sendDrawData } from "@/socket/events";
import { useDrawingStore } from "@/store/useDrawingStore";

const DrawingToolbar = ({ roomId }) => {
  const activeTool = useDrawingStore((state) => state.activeTool);
  const isDeleteModalOpen = useDrawingStore((state) => state.isDeleteModalOpen);
  const { setActiveTool, setDeleteModalOpen, clearCurrentPageCanvas } =
    useDrawingStore();
  const currentPage = useDrawingStore((state) => state.currentPage);

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
            {tool.title === activeTool && (
              <ToolPopupController activeTool={activeTool} />
            )}
          </div>
        ))}
      </div>
      <ChoiceModal
        isOpen={isDeleteModalOpen}
        type="deleteAll"
        onCancel={() => setDeleteModalOpen(false)}
        onFirst={() => setDeleteModalOpen(false)}
        onSecond={() => {
          clearCurrentPageCanvas();
          sendDrawData({ roomId, page: currentPage, drawings: [] });
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
};

export default DrawingToolbar;
