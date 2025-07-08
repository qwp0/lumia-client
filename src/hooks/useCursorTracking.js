import { useEffect } from "react";

import { sendCursorPosition } from "@/socket/events";

export const useCursorTracking = ({
  viewRef,
  roomId,
  nickname,
  page,
  isCursorSharing,
}) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isCursorSharing) return;

      const rect = viewRef.current?.getBoundingClientRect();

      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      sendCursorPosition({ roomId, page, x, y, nickname });
    };

    const viewerElement = viewRef.current;

    if (!viewerElement) return;

    viewerElement.style.cursor = isCursorSharing
      ? 'url("/cursors/cursor-share.png") 4 4, auto'
      : "default";

    viewerElement.addEventListener("mousemove", handleMouseMove);
    viewerElement.addEventListener("mouseleave", () => {
      sendCursorPosition({ roomId, page, x: -1, y: -1, nickname });
    });

    return () => {
      viewerElement.removeEventListener("mousemove", handleMouseMove);
      viewerElement.style.cursor = "default";
    };
  }, [viewRef, roomId, page, nickname, isCursorSharing]);
};
