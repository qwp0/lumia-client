import { useEffect, useState } from "react";

import socket from "@/socket/socket";

export const usePresentationEndListener = () => {
  const [isPresentationEnded, setIsPresentationEnded] = useState(false);

  useEffect(() => {
    const handlePresentationEnd = () => {
      setIsPresentationEnded(true);
    };

    socket.on("presentation-end", handlePresentationEnd);

    return () => {
      socket.off("presentation-end", handlePresentationEnd);
    };
  }, []);

  return { isPresentationEnded, setIsPresentationEnded };
};
