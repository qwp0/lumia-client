import { useEffect, useState } from "react";

const useResizeObserver = (ref) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      const { width, height } = ref.current.getBoundingClientRect();

      setSize({ width, height });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return size;
};

export default useResizeObserver;
