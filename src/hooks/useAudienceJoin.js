import { useEffect, useState } from "react";

import { joinRoom } from "@/socket/events";
import socket from "@/socket/socket";

export const useAudienceJoin = (roomId) => {
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("audience_nickname") || "";
  });

  const handleJoin = (nickname) => {
    setNickname(nickname);
    localStorage.setItem("audience_nickname", nickname);
    joinRoom(socket, roomId, nickname);
  };

  useEffect(() => {
    if (nickname) {
      joinRoom(socket, roomId, nickname);
    }
  }, [nickname, roomId]);

  return { nickname, handleJoin };
};
