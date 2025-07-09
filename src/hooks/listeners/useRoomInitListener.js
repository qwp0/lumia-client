import { useEffect } from "react";

import socket from "@/socket/socket";

export const useRoomInitListener = ({
  setSlideUrl,
  setChatMessages,
  setCurrentPage,
  setPageDrawings,
}) => {
  useEffect(() => {
    const handleInit = ({ slideUrl, currentPage, feedbacks, drawings }) => {
      setSlideUrl?.(slideUrl);
      setCurrentPage(currentPage);
      setChatMessages(feedbacks || []);

      if (drawings) {
        Object.entries(drawings).forEach(([page, value]) => {
          setPageDrawings(Number(page), value);
        });
      }
    };

    socket.on("init_room", handleInit);

    return () => {
      socket.off("init_room", handleInit);
    };
  }, [setSlideUrl, setCurrentPage, setChatMessages, setPageDrawings]);
};
