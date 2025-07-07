import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import ChatPanel from "@/components/audience/chat/ChatPanel";
import ChatToggleButton from "@/components/audience/chat/ChatToggleButton";
import PresenterFollowToggleButton from "@/components/audience/PresenterFollowToggleButton";
import CursorOverlay from "@/components/common/CursorOverlay";
import AudienceEnterModal from "@/components/modal/AudienceEnterModal";
import PDFViewer from "@/components/presentation/viewer/PDFViewer";
import SlideNavigation from "@/components/presentation/viewer/SlideNavigation";
import { useChat } from "@/hooks/useChat";
import { useCursorTracking } from "@/hooks/useCursorTracking";
import { useRoomInit } from "@/hooks/useRoomInit";
import { useRoomJoin } from "@/hooks/useRoomJoin";
import { useDrawingStore } from "@/store/useDrawingStore";

const Audience = () => {
  const { roomId } = useParams();
  const [slideUrl, setSlideUrl] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const viewRef = useRef(null);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  const { nickname, handleJoin } = useRoomJoin(roomId);
  const role = "audience";
  const { chatMessages, handleSendChat, setChatMessages } = useChat({
    roomId,
    nickname,
    role,
  });

  useRoomInit({ setSlideUrl, setChatMessages });
  useCursorTracking({ viewRef, roomId, nickname, page: currentPage });

  if (!nickname) {
    return (
      <AudienceEnterModal
        isOpen={true}
        onJoin={handleJoin}
      />
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div ref={viewRef}>
        <PDFViewer
          file={slideUrl}
          pageNumber={currentPage}
          onLoadTotalPages={setTotalPages}
        />
        <CursorOverlay currentPage={currentPage} />
      </div>
      {!isFollowing && (
        <SlideNavigation
          totalPagesNumber={totalPages}
          pageNumber={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <PresenterFollowToggleButton
        isFollowing={isFollowing}
        onToggleFollow={() => setIsFollowing((prev) => !prev)}
      />
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

export default Audience;
