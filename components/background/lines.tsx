import { cn, tailwindColor } from "@/lib/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";

export type LinesBackgroundHandle = {
  onMouseMove: (event: React.MouseEvent) => void;
};

export const LinesBackground = forwardRef<
  LinesBackgroundHandle,
  { className?: string }
>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  function resize() {
    const canvas = canvasRef.current!;
    resizeCanvas(
      canvas,
      canvas.parentElement!.offsetWidth,
      canvas.parentElement!.offsetHeight,
    );
  }

  useEffect(() => {
    const canvas = canvasRef.current!;

    resize();

    const { spacing } = CONFIG.backgrounds.lines;

    for (let x = 0; x < canvas.width; x += spacing) {
      points.current.push({
        x,
        y: 0,
      });
      points.current.push({
        x,
        y: canvas.height,
      });
    }

    for (let y = 0; y < canvas.height; y += spacing) {
      points.current.push({ x: 0, y });
      points.current.push({ x: canvas.width, y });
    }

    window.addEventListener("resize", resize);

    animate();

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      window.removeEventListener("resize", resize);
    };
  }, []);

  function drawLines() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const { color, width } = CONFIG.backgrounds.lines;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = tailwindColor(...color);
    ctx.lineWidth = width;
    for (const point of points.current) {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(mouse.current.x, mouse.current.y);
    }
    ctx.stroke();
  }

  function animate() {
    drawLines();
    animationFrame.current = requestAnimationFrame(animate);
  }

  useImperativeHandle(ref, () => ({
    onMouseMove: function (event) {
      const rect = canvasRef.current!.parentElement!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.current = { x, y };
    },
  }));

  return <canvas className={cn(className)} ref={canvasRef} />;
});
