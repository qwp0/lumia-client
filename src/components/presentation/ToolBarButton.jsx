const ToolBarButton = ({ icon: Icon, title, onClick }) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default ToolBarButton;
