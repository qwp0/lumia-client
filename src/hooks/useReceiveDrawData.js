import { useEffect } from "react";

import socket from "@/socket/socket";
import { useDrawingStore } from "@/store/useDrawingStore";

export const useReceiveDrawData = () => {
  const setPageDrawings = useDrawingStore((state) => state.setPageDrawings);

  useEffect(() => {
    const handleDrawData = ({ page, drawings }) => {
      setPageDrawings(page, { drawings });
    };

    socket.on("draw-data", handleDrawData);

    return () => {
      socket.off("draw-data", handleDrawData);
    };
  }, [setPageDrawings]);
};
