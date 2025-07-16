import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRoomExists } from "@/api/getRoomExists";

export const useCheckRoomValid = (roomId) => {
  const [isValidRoom, setIsValidRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRoom = async () => {
      try {
        const exists = await getRoomExists(roomId);

        if (!exists) {
          navigate("/notfound");
        } else {
          setIsValidRoom(true);
        }
      } catch {
        navigate("/notfound");
      }
    };

    checkRoom();
  }, [roomId]);

  return isValidRoom;
};
