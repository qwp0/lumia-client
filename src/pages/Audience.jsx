import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ToggleStatusButton from "@/components/common/button/ToggleStatusButton";
import DrawingCanvas from "@/components/common/canvas/DrawingCanvas";
import ChatPanel from "@/components/common/chat/ChatPanel";
import ChatToggleButton from "@/components/common/chat/ChatToggleButton";
import CursorOverlay from "@/components/common/CursorOverlay";
import DownloadProgress from "@/components/common/DownloadProgress";
import PDFViewer from "@/components/common/viewer/PDFViewer";
import SlideNavigation from "@/components/common/viewer/SlideNavigation";
import AudienceEnterModal from "@/components/modal/AudienceEnterModal";
import ChoiceModal from "@/components/modal/ChoiceModal";
import { useEmitCursorMove } from "@/hooks/emitters/useEmitCursorMove";
import { useEmitRoomJoin } from "@/hooks/emitters/useEmitRoomJoin";
import { useDrawDataListener } from "@/hooks/listeners/useDrawDataListener";
import { usePresentationEndListener } from "@/hooks/listeners/usePresentationEndListener";
import { useRoomInitListener } from "@/hooks/listeners/useRoomInitListener";
import { useSlideChangeListener } from "@/hooks/listeners/useSlideChangeListener";
import { useTextFeedbackListener } from "@/hooks/listeners/useTextFeedbackListener";
import useResizeObserver from "@/hooks/useResizeObserver";
import { useDrawingStore } from "@/store/useDrawingStore";
import { downloadCapturedPdf } from "@/utils/downloadCapturePdf";

const Audience = () => {
  const { roomId } = useParams();
  const viewRef = useRef(null);
  const navigate = useNavigate();

  const [slideUrl, setSlideUrl] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCursorSharing, setIsCursorSharing] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const currentPage = useDrawingStore((state) => state.currentPage);
  const { setCurrentPage, setPageDrawings } = useDrawingStore();

  const handleDownload = async () => {
    setIsDownloadModalOpen(false);
    setIsDownloading(true);

    await downloadCapturedPdf({
      pageCount: totalPages,
      setPage: setCurrentPage,
    });

    setIsDownloading(false);
    navigate("/");
  };

  const containerSize = useResizeObserver(viewRef);
  const { nickname, handleJoin } = useEmitRoomJoin(roomId);
  const role = "audience";
  const { chatMessages, handleSendChat, setChatMessages } =
    useTextFeedbackListener({ roomId, nickname, role });

  const { isDownloadModalOpen, setIsDownloadModalOpen } =
    usePresentationEndListener();

  useRoomInitListener({
    setSlideUrl,
    setChatMessages,
    setCurrentPage,
    setPageDrawings,
  });

  useEmitCursorMove({
    viewRef,
    roomId,
    nickname,
    page: currentPage,
    isCursorSharing,
  });

  useSlideChangeListener(isFollowing, roomId);
  useDrawDataListener();

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
      <div
        ref={viewRef}
        id="capture-target"
        className="relative w-full max-w-[90vw]"
      >
        <DrawingCanvas
          roomId={roomId}
          isDrawable={false}
          containerSize={containerSize}
        />
        <PDFViewer
          file={slideUrl}
          pageNumber={currentPage}
          onLoadTotalPages={setTotalPages}
          width={containerSize.width}
        />
        <CursorOverlay currentPage={currentPage} />
      </div>
      {!isFollowing && (
        <SlideNavigation
          totalPagesNumber={totalPages}
          pageNumber={currentPage}
          onPageChange={setCurrentPage}
          roomId={roomId}
          role={role}
        />
      )}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <ToggleStatusButton
          label="발표 흐름 따라가기"
          isActive={isFollowing}
          onToggle={() => setIsFollowing((prev) => !prev)}
        />
        <ToggleStatusButton
          label="커서 공유"
          isActive={isCursorSharing}
          onToggle={() => setIsCursorSharing((prev) => !prev)}
        />
      </div>
      <ChatToggleButton
        onClick={() => setIsChatOpen((prev) => !prev)}
        isChatOpen={isChatOpen}
      />
      <ChatPanel
        messages={chatMessages}
        onSend={handleSendChat}
        isOpen={isChatOpen}
      />
      <ChoiceModal
        isOpen={isDownloadModalOpen}
        type="downloadPdf"
        onCancel={() => setIsDownloadModalOpen(false)}
        onFirst={() => {
          setIsDownloadModalOpen(false);
          navigate("/");
        }}
        onSecond={handleDownload}
      />
      {isDownloading && <DownloadProgress />}
    </div>
  );
};

export default Audience;
