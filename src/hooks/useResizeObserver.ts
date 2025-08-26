import { useEffect, useState } from "react";

const useResizeObserver = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const updateSize = () => {
      const { width, height } = target.getBoundingClientRect();

      setSize({ width, height });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);

    observer.observe(target);

    return () => observer.disconnect();
  }, [ref]);

  return size;
};

export default useResizeObserver;
