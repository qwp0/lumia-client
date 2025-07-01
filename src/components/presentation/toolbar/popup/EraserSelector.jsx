import { EraserIcon, TrashCanIcon } from "@/assets";
import { ERASER_MODES } from "@/constants/tool";
import { useDrawingStore } from "@/store/useDrawingStore";

const EraserSelector = () => {
  const eraserMode = useDrawingStore((state) => state.eraserMode);
  const { setEraserMode, setDeleteModalOpen } = useDrawingStore();

  const handleSelect = (mode) => {
    if (mode === ERASER_MODES.PARTIAL) {
      setEraserMode(ERASER_MODES.PARTIAL);
    } else if (mode === ERASER_MODES.ALL) {
      setDeleteModalOpen(true);
    }
  };

  return (
    <div className="absolute top-full mt-5 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
      <button
        type="button"
        onClick={() => handleSelect(ERASER_MODES.PARTIAL)}
      >
        <EraserIcon
          className={`h-6 w-6 ${
            eraserMode === ERASER_MODES.PARTIAL
              ? "text-[#EB4C60]"
              : "text-black"
          }`}
        />
      </button>
      <button
        type="button"
        onClick={() => handleSelect(ERASER_MODES.ALL)}
      >
        <TrashCanIcon className="h-5 w-6" />
      </button>
    </div>
  );
};

export default EraserSelector;
