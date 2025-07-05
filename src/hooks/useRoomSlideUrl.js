import { useEffect } from "react";

import socket from "@/socket/socket";

export const useRoomSlideUrl = (setSlideUrl) => {
  useEffect(() => {
    socket.on("init_room", ({ slideUrl }) => {
      setSlideUrl(slideUrl);
    });

    return () => {
      socket.off("init_room");
    };
  }, [setSlideUrl]);
};
