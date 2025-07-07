import { useEffect } from "react";

import { sendCursorPosition } from "@/socket/events";

export const useCursorTracking = ({ viewRef, roomId, nickname, page }) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = viewRef.current?.getBoundingClientRect();

      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      sendCursorPosition({ roomId, page, x, y, nickname });
    };

    const viewerElement = viewRef.current;

    if (!viewerElement) return;

    viewerElement.addEventListener("mousemove", handleMouseMove);

    return () =>
      viewerElement.removeEventListener("mousemove", handleMouseMove);
  }, [viewRef, roomId, page, nickname]);
};
