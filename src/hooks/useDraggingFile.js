import { useEffect, useRef, useState } from "react";

export const useDraggingFile = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  useEffect(() => {
    const handleDragEnter = (e) => {
      if (e.dataTransfer?.types.includes("Files")) {
        dragCounter.current++;
        setIsDragging(true);
      }
    };

    const handleDragLeave = () => {
      dragCounter.current--;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragover", handleDragOver);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  return isDragging;
};
