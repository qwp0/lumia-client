import { useState } from "react";
import toast from "react-hot-toast";

import { ExitIcon, LinkIcon } from "@/assets";
import ToolBarButton from "@/components/common/button/ToolBarButton";
import ChoiceModal from "@/components/modal/ChoiceModal";
import { sendPresentationEnd } from "@/socket/events";
import { useDrawingStore } from "@/store/useDrawingStore";
import { downloadCapturedPdf } from "@/utils/downloadCapturePdf";

const controlTools = [
  { icon: LinkIcon, title: "링크 공유" },
  { icon: ExitIcon, title: "발표 종료" },
];

const ControlToolbar = ({ roomId, totalPages }) => {
  const [isEndPresentationModalOpen, setIsEndPresentationModalOpen] =
    useState(false);

  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  const handleToolClick = (toolName) => {
    if (toolName === "발표 종료") {
      setIsEndPresentationModalOpen(true);
    }
    if (toolName === "링크 공유") {
      const audienceLink = `${window.location.origin}/audience/${roomId}`;

      navigator.clipboard.writeText(audienceLink).then(() => {
        toast.success("링크가 복사되었습니다.", {
          duration: 1000,
        });
      });
    }
  };
  const handleExitOnly = () => {
    setIsEndPresentationModalOpen(false);

    sendPresentationEnd({ roomId });
  };

  const handleDownloadAndExit = async () => {
    setIsEndPresentationModalOpen(false);

    await downloadCapturedPdf({
      pageCount: totalPages,
      setPage: setCurrentPage,
    });

    sendPresentationEnd({ roomId });
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

      <ChoiceModal
        isOpen={isEndPresentationModalOpen}
        type="endPresentation"
        onCancel={() => setIsEndPresentationModalOpen(false)}
        onFirst={handleExitOnly}
        onSecond={handleDownloadAndExit}
      />
    </>
  );
};

export default ControlToolbar;
