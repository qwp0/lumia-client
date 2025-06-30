import { SHAPE_ICON_MAP } from "@/constants/shape";
import { useDrawingStore } from "@/store/useDrawingStore";

const ShapeSelector = () => {
  const shape = useDrawingStore((state) => state.shape);
  const setShape = useDrawingStore((state) => state.setShape);

  return (
    <div className="absolute top-full mt-5 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
      {Object.entries(SHAPE_ICON_MAP).map(([type, Icon]) => (
        <button
          type="button"
          key={type}
          onClick={() => setShape(type)}
        >
          <Icon
            className={`h-6 w-6 ${
              shape === type ? "text-[#EB4C60]" : "text-black"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
