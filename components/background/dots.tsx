import { cn, pointDistance, tailwindColor } from "@/lib/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";

export type DotsBackgroundHandle = {
  onMouseMove: (event: React.MouseEvent) => void;
};

export const DotsBackground = forwardRef<
  DotsBackgroundHandle,
  { className?: string }
>(({ className }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dots = useRef<Dot[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  class Dot {
    x: number;
    y: number;
    originX: number;
    originY: number;
    velocityX: number;
    velocityY: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.originX = x;
      this.originY = y;
      this.velocityX = 0;
      this.velocityY = 0;
    }

    update() {
      const dx = mouse.current.x - this.x;
      const dy = mouse.current.y - this.y;
      const dist = pointDistance(
        mouse.current.x,
        mouse.current.y,
        this.x,
        this.y,
      );
      const { mouseRadius, forceFactor, returnSpeed, friction } =
        CONFIG.backgrounds.dots;

      if (dist < mouseRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouseRadius - dist) / mouseRadius;
        const push = force * forceFactor;

        this.velocityX -= Math.cos(angle) * push;
        this.velocityY -= Math.sin(angle) * push;
      }

      const dxOrigin = this.originX - this.x;
      const dyOrigin = this.originY - this.y;

      this.velocityX += dxOrigin * returnSpeed;
      this.velocityY += dyOrigin * returnSpeed;

      this.velocityX *= friction;
      this.velocityY *= friction;

      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    draw() {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const { radius, color } = CONFIG.backgrounds.dots;
      const actualColor = tailwindColor(...color);

      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = actualColor;
      ctx.fill();
      ctx.closePath();
    }
  }

  function resize() {
    const canvas = canvasRef.current!;
    resizeCanvas(
      canvas,
      canvas.parentElement!.offsetWidth,
      canvas.parentElement!.offsetHeight,
    );
  }

  useEffect(() => {
    resize();

    init();

    const {} = CONFIG.backgrounds.dots;

    window.addEventListener("resize", resize);

    animate();

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      window.removeEventListener("resize", resize);
    };
  }, []);

  function init() {
    const canvas = canvasRef.current!;
    const { gap } = CONFIG.backgrounds.dots;
    for (let x = gap / 2; x < canvas.width; x += gap) {
      for (let y = gap / 2; y < canvas.height; y += gap) {
        dots.current.push(new Dot(x, y));
      }
    }
  }

  function animate() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const dot of dots.current) {
      dot.update();
      dot.draw();
    }

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
