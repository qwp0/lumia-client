import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import ToggleStatusButton from "@/components/common/button/ToggleStatusButton";
import DrawingCanvas from "@/components/common/canvas/DrawingCanvas";
import ChatPanel from "@/components/common/chat/ChatPanel";
import ChatToggleButton from "@/components/common/chat/ChatToggleButton";
import CursorOverlay from "@/components/common/CursorOverlay";
import PDFViewer from "@/components/common/viewer/PDFViewer";
import SlideNavigation from "@/components/common/viewer/SlideNavigation";
import ControlToolbar from "@/components/presentation/toolbar/ControlToolbar";
import DrawingToolbar from "@/components/presentation/toolbar/DrawingToolbar";
import { useEmitRoomJoin } from "@/hooks/useEmitRoomJoin";
import { useRoomInitListener } from "@/hooks/useRoomInitListener";
import { useTextFeedbackListener } from "@/hooks/useTextFeedbackListener";
import { useDrawingStore } from "@/store/useDrawingStore";

const Presentation = () => {
  const [totalPagesNumber, setTotalPagesNumber] = useState(null);
  const { roomId } = useParams();
  const location = useLocation();
  const slideUrl = location.state.slideUrl;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAudienceCursorVisible, setIsAudienceCursorVisible] = useState(true);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const { setCurrentPage, setPageDrawings } = useDrawingStore();

  const role = "host";
  const { nickname } = useEmitRoomJoin(roomId, "Host");
  const { chatMessages, handleSendChat, setChatMessages } =
    useTextFeedbackListener({
      roomId,
      nickname,
      role,
    });

  useRoomInitListener({
    setChatMessages,
    setCurrentPage,
    setPageDrawings,
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <DrawingCanvas
        roomId={roomId}
        isDrawable={true}
      />
      <PDFViewer
        file={slideUrl}
        pageNumber={currentPage}
        onLoadTotalPages={setTotalPagesNumber}
      />
      {isAudienceCursorVisible && <CursorOverlay currentPage={currentPage} />}
      <SlideNavigation
        totalPagesNumber={totalPagesNumber}
        pageNumber={currentPage}
        onPageChange={setCurrentPage}
        roomId={roomId}
        role={role}
      />
      <DrawingToolbar roomId={roomId} />
      <ControlToolbar roomId={roomId} />
      <div className="fixed top-20 right-3 z-10">
        <ToggleStatusButton
          label="참여자 커서 보기"
          isActive={isAudienceCursorVisible}
          onToggle={() => setIsAudienceCursorVisible((prev) => !prev)}
        />
      </div>
      <ChatToggleButton onClick={() => setIsChatOpen((prev) => !prev)} />
      {isChatOpen && (
        <ChatPanel
          messages={chatMessages[currentPage] || []}
          onSend={handleSendChat}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default Presentation;
