import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRoomExists } from "@/api/getRoomExists";

export const useCheckRoomValid = (roomId) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRoom = async () => {
      try {
        const exists = await getRoomExists(roomId);

        if (!exists) navigate("/notfound");
      } catch {
        navigate("/notfound");
      }
    };

    checkRoom();
  }, [roomId]);
};
