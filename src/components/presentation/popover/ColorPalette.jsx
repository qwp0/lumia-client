const penColors = ["#2E2E2E", "#E63946", "#3A7DFF", "#4CAF50", "#FFD54F"];
const highlighterColors = ["#FFF176", "#B9FBC0", "#FF8DCB", "#A0E7E5"];

const ColorPalette = ({ onSelect, selectedColor, toolName }) => {
  const colors = toolName === "펜" ? penColors : highlighterColors;

  return (
    <div className="absolute top-full mt-2 flex gap-2 rounded-lg bg-white p-2 shadow-lg">
      {colors.map((color) => (
        <button
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
