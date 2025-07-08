import { useEffect } from "react";

import { getCurrentPage } from "@/socket/events";
import socket from "@/socket/socket";
import { useDrawingStore } from "@/store/useDrawingStore";

export const useAudienceSlideSync = (isFollowing, roomId) => {
  const setCurrentPage = useDrawingStore((state) => state.setCurrentPage);

  useEffect(() => {
    if (isFollowing) {
      getCurrentPage({ roomId });
    }

    const handlePageUpdate = ({ page }) => {
      if (!isFollowing) return;
      setCurrentPage(page);
    };

    socket.on("slide-change", handlePageUpdate);
    socket.on("current-page", handlePageUpdate);

    return () => {
      socket.off("slide-change", handlePageUpdate);
      socket.off("current-page", handlePageUpdate);
    };
  }, [isFollowing, setCurrentPage, roomId]);
};
