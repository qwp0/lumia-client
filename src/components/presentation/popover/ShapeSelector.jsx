import { shapeIconMap } from "@/constants/shape";

const ShapeSelector = ({ selectedShape, onSelect }) => {
  return (
    <div className="absolute top-full mt-5 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
      {Object.entries(shapeIconMap).map(([type, Icon]) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
        >
          <Icon
            className={`h-6 w-6 ${
              selectedShape === type ? "text-[#EB4C60]" : "text-black"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
