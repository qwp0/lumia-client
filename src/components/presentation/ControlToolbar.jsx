import { useState } from "react";

import { ExitIcon, LinkIcon } from "@/assets";

import ToolBarButton from "./ToolBarButton";

const ControlToolbar = () => {
  const [activeControl, setActiveControl] = useState(null);

  const controlTools = [
    { icon: LinkIcon, title: "링크 공유" },
    { icon: ExitIcon, title: "발표 종료" },
  ].map((tool) => ({
    ...tool,
    onClick: () => setActiveControl(tool.title),
  }));

  return (
    <div
      role="toolbar"
      className="fixed top-3 right-3 z-10 flex gap-5 rounded-xl bg-black px-5 py-3"
    >
      {controlTools.map((tool) => (
        <ToolBarButton
          key={tool.title}
          {...tool}
          isActive={tool.title === activeControl}
        />
      ))}
    </div>
  );
};

export default ControlToolbar;
