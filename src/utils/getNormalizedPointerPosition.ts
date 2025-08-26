export const getNormalizedPointerPosition = (
  e: MouseEvent | React.MouseEvent,
  canvas: HTMLCanvasElement | null,
) => {
  if (!canvas) return { x: 0, y: 0 };

  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  return { x, y };
};
