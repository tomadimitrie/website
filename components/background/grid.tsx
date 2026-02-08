"use client";
import { cn, makeOklch, parseOklch, tailwindColor } from "@/lib/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { resizeCanvas } from "@/lib/canvas-utils";
import { CONFIG } from "@/lib/config";

export type GridBackgroundHandle = {
  onMouseMove: (event: React.MouseEvent) => void;
};

interface Point {
  x: number;
  y: number;
  val: number;
  nextVal: number;
}

export const GridBackground = forwardRef<
  GridBackgroundHandle,
  { className?: string; color: string }
>(({ className, color }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(0);
  const grid = useRef<Point[][]>([]);
  const cols = useRef(0);
  const rows = useRef(0);

  const { gridSize, mouseRadius, diffusion, decay } = CONFIG.backgrounds.grid;

  function resize() {
    const canvas = canvasRef.current!;
    resizeCanvas(
      canvas,
      canvas.parentElement!.offsetWidth,
      canvas.parentElement!.offsetHeight,
    );
    initGrid();
  }

  function initGrid() {
    const canvas = canvasRef.current!;

    cols.current = Math.ceil(canvas.width / gridSize) + 1;
    rows.current = Math.ceil(canvas.height / gridSize) + 1;

    grid.current = [];
    for (let i = 0; i < cols.current; i++) {
      const col: Point[] = [];
      for (let j = 0; j < rows.current; j++) {
        col.push({ x: i * gridSize, y: j * gridSize, val: 0, nextVal: 0 });
      }
      grid.current.push(col);
    }
  }

  function update() {
    const x = Math.round(mouse.current.x / gridSize);
    const y = Math.round(mouse.current.y / gridSize);

    const pt = grid.current[x][y];
    const dx = mouse.current.x - pt.x;
    const dy = mouse.current.y - pt.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouseRadius) {
      grid.current[x][y].val = 1.0;
    }

    for (let i = 0; i < cols.current; i++) {
      for (let j = 0; j < rows.current; j++) {
        const cell = grid.current[i][j];
        let neighborSum = 0;
        let neighborCount = 0;

        if (i > 0) {
          neighborSum += grid.current[i - 1][j].val;
          neighborCount += 1;
        }
        if (i < cols.current - 1) {
          neighborSum += grid.current[i + 1][j].val;
          neighborCount += 1;
        }
        if (j > 0) {
          neighborSum += grid.current[i][j - 1].val;
          neighborCount += 1;
        }
        if (j < rows.current - 1) {
          neighborSum += grid.current[i][j + 1].val;
          neighborCount += 1;
        }

        const average = neighborSum / neighborCount;
        cell.nextVal =
          (cell.val * (1 - diffusion) + average * diffusion) * decay;
      }
    }

    for (let i = 0; i < cols.current; i++) {
      for (let j = 0; j < rows.current; j++) {
        grid.current[i][j].val = grid.current[i][j].nextVal;
      }
    }
  }

  function draw() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const accent = parseOklch(tailwindColor(color, 400));
    const background = parseOklch(tailwindColor(color, 950));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function getColor(val: number) {
      if (val < 0.01) {
        return makeOklch(background);
      }

      function interpolate(key: keyof typeof accent) {
        return accent[key] * val + background[key] * (1 - val);
      }

      return makeOklch({
        l: interpolate("l"),
        c: interpolate("c"),
        h: interpolate("h"),
      });
    }

    ctx.lineWidth = 1;

    function drawLine(from: Point, to: Point) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);

      const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      gradient.addColorStop(0, getColor(from.val));
      gradient.addColorStop(1, getColor(to.val));

      ctx.strokeStyle = gradient;
      ctx.stroke();
    }

    for (let i = 0; i < cols.current; i++) {
      for (let j = 0; j < rows.current - 1; j++) {
        const from = grid.current[i][j];
        const to = grid.current[i][j + 1];

        drawLine(from, to);
      }
    }

    for (let j = 0; j < rows.current; j++) {
      for (let i = 0; i < cols.current - 1; i++) {
        const from = grid.current[i][j];
        const to = grid.current[i + 1][j];

        drawLine(from, to);
      }
    }
  }

  function animate() {
    update();
    draw();
    animationFrame.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    resize();

    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame.current);
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
