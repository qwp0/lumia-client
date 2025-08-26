import { Dispatch, SetStateAction, useEffect } from "react";

import socket from "@/socket/socket";
import type { ChatMessage } from "@/types/chat";
import type { PageDrawings } from "@/types/drawing";

interface UseRoomInitListenerParams {
  setSlideUrl?: Dispatch<SetStateAction<string>>;
  setChatMessages: (msgs: ChatMessage[]) => void;
  setCurrentPage: (page: number) => void;
  setPageDrawings: (page: number, drawings: PageDrawings) => void;
}

interface InitRoomPayload {
  slideUrl?: string;
  currentPage: number;
  feedbacks?: ChatMessage[];
  drawings?: Record<number | string, PageDrawings>;
}

export const useRoomInitListener = ({
  setSlideUrl,
  setChatMessages,
  setCurrentPage,
  setPageDrawings,
}: UseRoomInitListenerParams) => {
  useEffect(() => {
    const handleInit = ({
      slideUrl,
      currentPage,
      feedbacks,
      drawings,
    }: InitRoomPayload) => {
      setSlideUrl?.(slideUrl ?? "");
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
