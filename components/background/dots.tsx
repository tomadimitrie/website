import { cn, pointDistance, tailwindColor } from "@/lib/utils";
import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";

export type DotsBackgroundHandle = {
  onMouseMove: (event: React.MouseEvent) => void;
};

class Dot {
  originX: number;
  originY: number;
  velocityX: number;
  velocityY: number;

  constructor(
    private x: number,
    private y: number,
    private mouse: RefObject<{ x: number; y: number }>,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.originX = x;
    this.originY = y;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  update() {
    const dx = this.mouse.current.x - this.x;
    const dy = this.mouse.current.y - this.y;
    const dist = pointDistance(
      this.mouse.current.x,
      this.mouse.current.y,
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
    const { radius, color } = CONFIG.backgrounds.dots;
    const actualColor = tailwindColor(...color);

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = actualColor;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export const DotsBackground = forwardRef<
  DotsBackgroundHandle,
  { className?: string }
>(function DotsBackground({ className }, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dots = useRef<Dot[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const { gap } = CONFIG.backgrounds.dots;

    let logicalWidth = 0;
    let logicalHeight = 0;

    function resize() {
      const parent = canvas.parentElement!;
      logicalWidth = parent.offsetWidth;
      logicalHeight = parent.offsetHeight;

      resizeCanvas(canvas, logicalWidth, logicalHeight, ctx);

      init();
    }

    function init() {
      dots.current = [];

      for (let x = gap / 2; x < logicalWidth; x += gap) {
        for (let y = gap / 2; y < logicalHeight; y += gap) {
          dots.current.push(new Dot(x, y, mouse, ctx));
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      for (const dot of dots.current) {
        dot.update();
        dot.draw();
      }

      animationFrame.current = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }

      window.removeEventListener("resize", resize);
    };
  }, []);

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
