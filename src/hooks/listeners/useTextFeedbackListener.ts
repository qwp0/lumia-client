import { useEffect, useState } from "react";

import { sendTextFeedback } from "@/socket/events";
import socket from "@/socket/socket";
import { useChatStore } from "@/store/useChatStore";
import { useDrawingStore } from "@/store/useDrawingStore";
import type { ChatMessage } from "@/types/chat";

interface UseTextFeedbackListenerParams {
  roomId: string;
  nickname: string;
  role: string;
  isChatOpen: boolean;
}

export const useTextFeedbackListener = ({
  roomId,
  nickname,
  role,
  isChatOpen,
}: UseTextFeedbackListenerParams) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const currentPage = useDrawingStore((state) => state.currentPage);
  const setUnread = useChatStore((state) => state.setUnread);

  const handleSendChat = (text: string) => {
    sendTextFeedback({
      roomId,
      page: currentPage,
      nickname,
      role,
      text,
    });
  };

  useEffect(() => {
    if (!nickname || !role) return;

    const handleReceive = ({
      nickname,
      role,
      time,
      text,
      page,
    }: ChatMessage) => {
      const newMessage = { nickname, role, time, text, page };

      setChatMessages((prev) => [...prev, newMessage]);

      if (!isChatOpen) {
        setUnread(true);
      }
    };

    socket.on("text-feedback", handleReceive);

    return () => {
      socket.off("text-feedback", handleReceive);
    };
  }, [roomId, nickname, role, isChatOpen]);

  return {
    chatMessages,
    handleSendChat,
    setChatMessages,
  };
};
