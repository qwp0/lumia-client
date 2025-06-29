import { ExitIcon, LinkIcon } from "@/assets";

import ToolBarButton from "./ToolBarButton";

const controlTools = [
  { icon: LinkIcon, title: "링크 공유" },
  { icon: ExitIcon, title: "발표 종료" },
];

const ControlToolbar = () => {
  return (
    <div
      role="toolbar"
      className="fixed top-3 right-3 flex gap-5 rounded-xl bg-black px-5 py-3"
    >
      {controlTools.map((tool) => (
        <ToolBarButton
          key={tool.title}
          {...tool}
        />
      ))}
    </div>
  );
};

export default ControlToolbar;
