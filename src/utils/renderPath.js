export const renderPath = (path, ctx) => {
  if (!path.points.length) return;

  if (path.type === "eraser") {
    const size = path.size;

    path.points.forEach(({ x, y }) => {
      ctx.clearRect(x - size / 2, y - size / 2, size, size);
    });

    return;
  }

  ctx.beginPath();
  ctx.strokeStyle = path.color;
  ctx.lineWidth = path.width;
  ctx.globalAlpha = path.alpha;

  path.points.forEach(({ x, y }, index) => {
    index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.closePath();
};
