import { useEffect } from "react";

import { joinRoom } from "@/socket/events";

export const useEmitRoomJoin = ({ roomId, nickname }) => {
  useEffect(() => {
    if (nickname) {
      joinRoom(roomId, nickname);
    }
  }, [nickname, roomId]);
};
