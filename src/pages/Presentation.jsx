import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import ChatPanel from "@/components/audience/chat/ChatPanel";
import ChatToggleButton from "@/components/audience/chat/ChatToggleButton";
import DrawingCanvas from "@/components/presentation/canvas/DrawingCanvas";
import ControlToolbar from "@/components/presentation/toolbar/ControlToolbar";
import DrawingToolbar from "@/components/presentation/toolbar/DrawingToolbar";
import PDFViewer from "@/components/presentation/viewer/PDFViewer";
import SlideNavigation from "@/components/presentation/viewer/SlideNavigation";
import { useChat } from "@/hooks/useChat";
import { useRoomInit } from "@/hooks/useRoomInit";
import { useRoomJoin } from "@/hooks/useRoomJoin";
import { useDrawingStore } from "@/store/useDrawingStore";

const Presentation = () => {
  const [totalPagesNumber, setTotalPagesNumber] = useState(null);
  const { roomId } = useParams();
  const location = useLocation();
  const slideUrl = location.state.slideUrl;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  const role = "host";
  const { nickname } = useRoomJoin(roomId, "Host");
  const { chatMessages, handleSendChat, setChatMessages } = useChat({
    roomId,
    nickname,
    role,
  });

  useRoomInit({
    setChatMessages,
    setCurrentPage,
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <DrawingCanvas />
      <PDFViewer
        file={slideUrl}
        pageNumber={currentPage}
        onLoadTotalPages={setTotalPagesNumber}
      />
      <SlideNavigation
        totalPagesNumber={totalPagesNumber}
        pageNumber={currentPage}
        onPageChange={setCurrentPage}
      />
      <DrawingToolbar />
      <ControlToolbar roomId={roomId} />
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
