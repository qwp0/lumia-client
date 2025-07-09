import { useEffect, useState } from "react";

import { joinRoom } from "@/socket/events";

export const useEmitRoomJoin = (roomId, defaultNickname) => {
  const nicknameKey =
    defaultNickname === "Host" ? "host_nickname" : "audience_nickname";

  const [nickname, setNickname] = useState(() => {
    if (defaultNickname) {
      localStorage.setItem(nicknameKey, defaultNickname);

      return defaultNickname;
    }

    return localStorage.getItem(nicknameKey) || "";
  });

  useEffect(() => {
    if (nickname) {
      joinRoom(roomId, nickname);
    }
  }, [nickname, roomId]);

  const handleJoin = (nickname) => {
    setNickname(nickname);
    localStorage.setItem(nicknameKey, nickname);
    joinRoom(roomId, nickname);
  };

  return { nickname, handleJoin };
};
