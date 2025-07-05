import { useState } from "react";
import { useParams } from "react-router-dom";

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

  const currentPage = useDrawingStore((state) => state.currentPage);
  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  const { nickname, handleJoin } = useAudienceJoin(roomId);

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
    </div>
  );
};

export default Audience;
