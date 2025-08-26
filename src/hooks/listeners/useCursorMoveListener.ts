import { useEffect, useState } from "react";

import socket from "@/socket/socket";
import type { Cursor } from "@/types/cursor";

export const useCursorMoveListener = (currentPage: number) => {
  const [cursors, setCursors] = useState<Cursor[]>([]);

  useEffect(() => {
    const handleCursor = ({ x, y, page, nickname }: Cursor) => {
      if (page !== currentPage) return;

      const isOutOfBounds = x < 0 || y < 0;

      if (isOutOfBounds) {
        setCursors((prevCursors) =>
          prevCursors.filter((cursor) => cursor.nickname !== nickname),
        );

        return;
      }

      setCursors((prevCursors) => {
        const nextCursors = [...prevCursors];
        const targetCursor = nextCursors.find(
          (cursor) => cursor.nickname === nickname,
        );

        if (targetCursor) {
          targetCursor.x = x;
          targetCursor.y = y;
        } else {
          nextCursors.push({ x, y, nickname });
        }

        return nextCursors;
      });
    };

    socket.on("cursor-move", handleCursor);

    return () => {
      socket.off("cursor-move", handleCursor);
    };
  }, [currentPage]);

  return cursors;
};
