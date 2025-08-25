import { useEffect } from "react";

import { joinRoom } from "@/socket/events";

interface UseEmitRoomJoinParams {
  roomId: string;
  nickname: string;
}

export const useEmitRoomJoin = ({
  roomId,
  nickname,
}: UseEmitRoomJoinParams) => {
  useEffect(() => {
    if (nickname) {
      joinRoom(roomId, nickname);
    }
  }, [nickname, roomId]);
};
