"use client";
import { useEffect, useRef } from "react";
import { cn, randomFrom, tailwindColor } from "@/lib/utils";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";

export function MatrixRainBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const ctx = canvas.getContext("2d")!;

    resize();

    const { fontSize, chars, color } = CONFIG.backgrounds.matrixRain;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns })
      .fill(null)
      .map(() => Math.floor(Math.random() * -100));

    function draw() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = tailwindColor(...color);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] * fontSize > 0) {
          const text = randomFrom(chars);
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = Math.floor(Math.random() * -50);
        }

        drops[i] += 1;
      }
    }

    function animate() {
      draw();
      setTimeout(() => requestAnimationFrame(animate), 33);
    }
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className={cn(className)} ref={canvasRef} />;
}
