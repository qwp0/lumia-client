export const getCanvasPointerPosition = (x, y, canvas) => ({
  canvasX: x * canvas.width,
  canvasY: y * canvas.height,
});
