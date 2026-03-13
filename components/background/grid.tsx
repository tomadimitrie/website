"use client";
import {
  clamp,
  cn,
  makeOklch,
  parseOklch,
  pointDistance,
  tailwindColor,
} from "@/lib/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
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
>(function GridBackground({ className, color }, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const grid = useRef<Point[][]>([]);
  const cols = useRef(0);
  const rows = useRef(0);

  const accent = useMemo(() => parseOklch(tailwindColor(color, 300)), [color]);
  const background = useMemo(
    () => parseOklch(tailwindColor(color, 950)),
    [color],
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const { gridSize, mouseRadius, diffusion, decay } = CONFIG.backgrounds.grid;

    let logicalWidth = 0;
    let logicalHeight = 0;

    function resize() {
      const parent = canvas.parentElement!;
      logicalWidth = parent.offsetWidth;
      logicalHeight = parent.offsetHeight;

      resizeCanvas(canvas, logicalWidth, logicalHeight, ctx);
      initGrid();
    }

    function initGrid() {
      const newCols = Math.ceil(logicalWidth / gridSize) + 1;
      const newRows = Math.ceil(logicalHeight / gridSize) + 1;
      const newGrid: Point[][] = [];

      for (let i = 0; i < newCols; i++) {
        const col: Point[] = [];
        for (let j = 0; j < newRows; j++) {
          col.push({ x: i * gridSize, y: j * gridSize, val: 0, nextVal: 0 });
        }
        newGrid.push(col);
      }

      cols.current = newCols;
      rows.current = newRows;
      grid.current = newGrid;
    }

    function update() {
      if (grid.current.length === 0) {
        return;
      }

      const x = clamp(
        Math.round(mouse.current.x / gridSize),
        0,
        cols.current - 1,
      );
      const y = clamp(
        Math.round(mouse.current.y / gridSize),
        0,
        rows.current - 1,
      );

      const pt = grid.current[x][y];
      const dist = pointDistance(mouse.current.x, mouse.current.y, pt.x, pt.y);

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
      if (grid.current.length === 0) {
        return;
      }

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

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

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      if (animationFrame.current != null) {
        cancelAnimationFrame(animationFrame.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [accent, background]);

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
