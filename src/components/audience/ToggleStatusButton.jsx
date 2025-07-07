const ToggleStatusButton = ({ label, isActive, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 rounded-xl bg-white/60 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur transition-colors duration-200 hover:bg-white"
    >
      <span
        className={`h-3 w-3 rounded-full border ${
          isActive
            ? "border-green-700 bg-green-500"
            : "border-red-700 bg-red-500"
        }`}
      />
      {label}
    </button>
  );
};

export default ToggleStatusButton;
