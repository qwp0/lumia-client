interface ToolBarButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

const ToolBarButton = ({
  icon: Icon,
  title,
  onClick,
  isActive,
}: ToolBarButtonProps) => {
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
