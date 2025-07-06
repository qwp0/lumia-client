import { useEffect } from "react";

import socket from "@/socket/socket";

export const useRoomInit = ({
  setSlideUrl,
  setChatMessages,
  setCurrentPage,
}) => {
  useEffect(() => {
    const handleInit = ({ slideUrl, currentPage, feedbacks }) => {
      setSlideUrl?.(slideUrl);
      setCurrentPage?.(currentPage);
      setChatMessages?.(feedbacks || []);
    };

    socket.on("init_room", handleInit);

    return () => {
      socket.off("init_room", handleInit);
    };
  }, [setSlideUrl, setCurrentPage, setChatMessages]);
};
