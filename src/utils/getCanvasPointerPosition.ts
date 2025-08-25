export const getCanvasPointerPosition = (
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
) => ({
  canvasX: x * canvas.width,
  canvasY: y * canvas.height,
});
