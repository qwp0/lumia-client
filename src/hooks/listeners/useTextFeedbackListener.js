import { useEffect, useState } from "react";

import { sendTextFeedback } from "@/socket/events";
import socket from "@/socket/socket";
import { useChatStore } from "@/store/useChatStore";
import { useDrawingStore } from "@/store/useDrawingStore";

export const useTextFeedbackListener = ({
  roomId,
  nickname,
  role,
  isChatOpen,
}) => {
  const [chatMessages, setChatMessages] = useState([]);
  const currentPage = useDrawingStore((state) => state.currentPage);
  const setUnread = useChatStore((state) => state.setUnread);

  const handleSendChat = (text) => {
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

    const handleReceive = ({ nickname, role, time, text, page }) => {
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
