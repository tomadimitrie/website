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
>(function LinesBackground({ className }, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const needsRedraw = useRef(true);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let logicalWidth = 0;
    let logicalHeight = 0;

    function resize(width: number, height: number) {
      logicalWidth = width;
      logicalHeight = height;

      resizeCanvas(canvas, logicalWidth, logicalHeight, ctx);
      init();

      needsRedraw.current = true;
    }

    function init() {
      const { spacing } = CONFIG.backgrounds.lines;

      points.current = [];

      for (let x = 0; x < logicalWidth; x += spacing) {
        points.current.push({
          x,
          y: 0,
        });
        points.current.push({
          x,
          y: logicalHeight,
        });
      }

      for (let y = 0; y < logicalHeight; y += spacing) {
        points.current.push({ x: 0, y });
        points.current.push({ x: logicalWidth, y });
      }
    }

    function drawLines() {
      const { color, width } = CONFIG.backgrounds.lines;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
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
      if (needsRedraw.current) {
        drawLines();
        needsRedraw.current = false;
      }
      animationFrame.current = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
        resize(width, height);
      }
    });

    observer.observe(canvas.parentElement!);

    animate();

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      observer.disconnect();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    onMouseMove: function (event) {
      const rect = canvasRef.current!.parentElement!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.current = { x, y };
      needsRedraw.current = true;
    },
  }));

  return <canvas className={cn(className)} ref={canvasRef} />;
});
