import { useEffect, useState } from "react";

import socket from "@/socket/socket";

export const usePresentationEndListener = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    const handlePresentationEnd = () => {
      setIsDownloadModalOpen(true);
    };

    socket.on("presentation-end", handlePresentationEnd);

    return () => {
      socket.off("presentation-end", handlePresentationEnd);
    };
  }, []);

  return { isDownloadModalOpen, setIsDownloadModalOpen };
};
