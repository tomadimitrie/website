"use client";

import { useEffect, useRef } from "react";
import { cn, randomFrom, tailwindColor } from "@/lib/utils";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";

export function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let logicalWidth = 0;
    let logicalHeight = 0;
    let drops: number[] = [];

    function resize() {
      const parent = canvas.parentElement!;
      logicalWidth = parent.offsetWidth;
      logicalHeight = parent.offsetHeight;

      resizeCanvas(canvas, logicalWidth, logicalHeight, ctx);

      const columns = Math.ceil(canvas.width / fontSize);
      drops = Array.from({ length: columns })
        .fill(null)
        .map(() => Math.floor(Math.random() * -100));
    }

    const { fontSize, chars, color } = CONFIG.backgrounds.matrixRain;

    function draw() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = tailwindColor(...color);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] * fontSize > 0) {
          const text = randomFrom(chars);
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > logicalHeight && Math.random() > 0.95) {
          drops[i] = Math.floor(Math.random() * -50);
        }

        drops[i] += 1;
      }
    }

    function animate() {
      draw();
      timeout.current = setTimeout(() => {
        animationFrame.current = requestAnimationFrame(animate);
      }, 33);
    }

    resize();

    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return <canvas className={cn(className)} ref={canvasRef} />;
}
