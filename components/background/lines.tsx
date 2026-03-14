import { cn, tailwindColor } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";
import { MouseRef, SubscribeToMouse } from "@/hooks/useInteractiveBackground";

export function LinesBackground({
  className,
  mouseRef,
  subscribeToMouse,
}: {
  className?: string;
  mouseRef: MouseRef;
  subscribeToMouse: SubscribeToMouse;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<{ x: number; y: number }[]>([]);
  const needsRedraw = useRef(true);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMouse(() => {
      needsRedraw.current = true;
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMouse]);

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
        ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
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
  }, [mouseRef]);

  return <canvas className={cn(className)} ref={canvasRef} />;
}
