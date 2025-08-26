import { useEffect } from "react";

import socket from "@/socket/socket";
import { useDrawingStore } from "@/store/useDrawingStore";
import type { PageDrawings } from "@/types/drawing";

export const useDrawDataListener = () => {
  const setPageDrawings = useDrawingStore((state) => state.setPageDrawings);

  useEffect(() => {
    const handleDrawData = ({
      page,
      drawings,
    }: {
      page: number;
      drawings: PageDrawings["drawings"];
    }) => {
      setPageDrawings(page, { drawings });
    };

    socket.on("draw-data", handleDrawData);

    return () => {
      socket.off("draw-data", handleDrawData);
    };
  }, [setPageDrawings]);
};
