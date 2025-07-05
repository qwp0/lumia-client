import { useState } from "react";
import { useParams } from "react-router-dom";

import ChatPanel from "@/components/audience/chat/ChatPanel";
import ChatToggleButton from "@/components/audience/chat/ChatToggleButton";
import PresenterFollowToggle from "@/components/audience/PresenterFollowToggle";
import AudienceEnterModal from "@/components/modal/AudienceEnterModal";
import PDFViewer from "@/components/presentation/viewer/PDFViewer";
import SlideNavigation from "@/components/presentation/viewer/SlideNavigation";
import { useAudienceJoin } from "@/hooks/useAudienceJoin";
import { useRoomSlideUrl } from "@/hooks/useRoomSlideUrl";
import { useDrawingStore } from "@/store/useDrawingStore";

const Audience = () => {
  const { roomId } = useParams();
  const [slideUrl, setSlideUrl] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  const { nickname, handleJoin } = useAudienceJoin(roomId);

  const handleSendChat = (text) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage = {
      nickname,
      time: formattedTime,
      text,
    };

    setChatMessages((prev) => [...prev, newMessage]);
  };

  useRoomSlideUrl(setSlideUrl);

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
      <PDFViewer
        file={slideUrl}
        pageNumber={currentPage}
        onLoadTotalPages={setTotalPages}
      />
      {!isFollowing && (
        <SlideNavigation
          totalPagesNumber={totalPages}
          pageNumber={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      <PresenterFollowToggle
        isFollowing={isFollowing}
        onToggleFollow={() => setIsFollowing((prev) => !prev)}
      />
      <ChatToggleButton onClick={() => setIsChatOpen((prev) => !prev)} />

      {isChatOpen && (
        <ChatPanel
          messages={chatMessages}
          onSend={handleSendChat}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default Audience;
