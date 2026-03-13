export function resizeCanvas(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
) {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  if (canvas instanceof HTMLCanvasElement) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
}
