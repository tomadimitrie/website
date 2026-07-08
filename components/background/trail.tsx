"use client";

import { useEffect, useRef } from "react";
import type { SubscribeToMouse } from "@/hooks/useInteractiveBackground";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";
import { cn, randomBetween, randomFrom, tailwindColor } from "@/lib/utils";

class Droplet {
  public char: string;
  public vx: number;
  public vy: number;
  public life: number;
  public decay: number;
  public size: number;

  constructor(
    public x: number,
    public y: number,
    public ctx: CanvasRenderingContext2D,
  ) {
    const { minFont, maxFont, chars } = CONFIG.backgrounds.trail;

    this.x += Math.random() * 10 - 5;
    this.y += Math.random() * 10 - 5;
    this.char = randomFrom(chars);
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = Math.random() * 0.5 + 0.3;
    this.life = 1;
    this.decay = Math.random() * 0.01 + 0.005;
    this.size = randomBetween(minFont, maxFont);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw() {
    const { color } = CONFIG.backgrounds.trail;
    this.ctx.globalAlpha = Math.max(0, this.life);
    this.ctx.fillStyle = tailwindColor(...color);
    this.ctx.font = `${this.size}px monospace`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.char, this.x, this.y);
    this.ctx.globalAlpha = 1.0;
  }
}

export function Trail({
  className,
  subscribeToMouse,
}: {
  className?: string;
  subscribeToMouse: SubscribeToMouse;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrame = useRef<number | null>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const droplets = useRef<Droplet[]>([]);
  const { distance } = CONFIG.backgrounds.trail;

  useEffect(() => {
    // biome-ignore lint/style/noNonNullAssertion: never null
    const canvas = canvasRef.current!;
    // biome-ignore lint/style/noNonNullAssertion: never null
    const ctx = canvas.getContext("2d")!;

    const unsubscribe = subscribeToMouse((x, y) => {
      const dx = x - mouse.current.x;
      const dy = y - mouse.current.y;
      const lastDistance = Math.hypot(dx, dy);

      if (mouse.current.x !== -1000) {
        for (let i = 0; i < lastDistance; i += distance) {
          const t = i / lastDistance;
          const interpolatedX = mouse.current.x + dx * t;
          const interpolatedY = mouse.current.y + dy * t;
          if (Math.random() > 0.2) {
            droplets.current.push(
              new Droplet(interpolatedX, interpolatedY, ctx),
            );
          }
        }
      }

      mouse.current.x = x;
      mouse.current.y = y;
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMouse, distance]);

  useEffect(() => {
    // biome-ignore lint/style/noNonNullAssertion: never null
    const canvas = canvasRef.current!;
    // biome-ignore lint/style/noNonNullAssertion: never null
    const ctx = canvas.getContext("2d")!;

    let logicalWidth = 0;
    let logicalHeight = 0;

    function resize(width: number, height: number) {
      logicalWidth = width;
      logicalHeight = height;

      resizeCanvas(canvas, logicalWidth, logicalHeight, ctx);
    }

    function draw() {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      for (let i = droplets.current.length - 1; i >= 0; i -= 1) {
        const droplet = droplets.current[i];
        droplet.update();
        if (droplet.life <= 0) {
          droplets.current.splice(i, 1);
        } else {
          droplet.draw();
        }
      }
    }

    function animate() {
      draw();
      animationFrame.current = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
        resize(width, height);
      }
    });

    // biome-ignore lint/style/noNonNullAssertion: never null
    observer.observe(canvas.parentElement!);

    animate();

    return () => {
      observer.disconnect();
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
