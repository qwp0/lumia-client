import { highlighterColors, penColors } from "@/constants/colors";

const ColorPalette = ({ onSelect, selectedColor, toolName }) => {
  const colors = toolName === "펜" ? penColors : highlighterColors;

  return (
    <div className="absolute top-full mt-5 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
      {colors.map((color) => (
        <button
          type="button"
          key={color}
          onClick={() => onSelect(color)}
          className={`h-6 w-6 rounded-full border-2 ${
            selectedColor === color ? "border-black" : "border-white"
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
