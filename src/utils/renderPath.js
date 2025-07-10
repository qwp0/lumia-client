export const renderPath = (path, ctx, canvasWidth, canvasHeight) => {
  if (!path.points.length) return;

  if (path.type === "eraser") {
    const size = path.size;

    path.points.forEach(({ x, y }) => {
      const canvasX = x * canvasWidth;
      const canvasY = y * canvasHeight;

      ctx.clearRect(canvasX - size / 2, canvasY - size / 2, size, size);
    });

    return;
  }

  ctx.beginPath();
  ctx.strokeStyle = path.color;
  ctx.lineWidth = path.width;
  ctx.globalAlpha = path.alpha;

  path.points.forEach(({ x, y }, index) => {
    const canvasX = x * canvasWidth;
    const canvasY = y * canvasHeight;

    index === 0 ? ctx.moveTo(canvasX, canvasY) : ctx.lineTo(canvasX, canvasY);
  });

  ctx.stroke();
  ctx.closePath();
};
