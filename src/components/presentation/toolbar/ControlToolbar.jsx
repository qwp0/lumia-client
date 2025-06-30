import { useState } from "react";

import { ExitIcon, LinkIcon } from "@/assets";
import ConfirmModal from "@/components/modal/ConfrmModal";
import ToolBarButton from "@/components/presentation/toolbar/ToolBarButton";

const controlTools = [
  { icon: LinkIcon, title: "링크 공유" },
  { icon: ExitIcon, title: "발표 종료" },
];

const ControlToolbar = () => {
  const [isEndPresentationModalOpen, setIsEndPresentationModalOpen] =
    useState(false);

  const handleToolClick = (toolName) => {
    if (toolName === "발표 종료") {
      setIsEndPresentationModalOpen(true);
    }
  };

  return (
    <>
      <div
        role="toolbar"
        className="fixed top-3 right-3 z-10 flex gap-5 rounded-xl bg-black px-5 py-3"
      >
        {controlTools.map((tool) => (
          <ToolBarButton
            key={tool.title}
            onClick={() => handleToolClick(tool.title)}
            {...tool}
          />
        ))}
      </div>
      <ConfirmModal
        isOpen={isEndPresentationModalOpen}
        type="endPresentation"
        onCancel={() => setIsEndPresentationModalOpen(false)}
        onConfirm={() => {
          setIsEndPresentationModalOpen(false);
        }}
      />
    </>
  );
};

export default ControlToolbar;
