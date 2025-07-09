const ToolBarButton = ({ icon: Icon, title, onClick, isActive }) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={isActive ? "text-[#EB4C60]" : "text-white"}
    >
      <Icon />
    </button>
  );
};

export default ToolBarButton;
