"use client";

import { cn, tailwindColor } from "@/lib/utils";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CONFIG } from "@/lib/config";

export type CubesBackgroundHandle = {
  onMouseMove: (event: React.MouseEvent) => void;
};

export const CubesBackground = forwardRef<
  CubesBackgroundHandle,
  { className?: string }
>(function CubesBackground({ className }, ref) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState({ rows: 0, cols: 0 });
  const squaresRef = useRef<HTMLDivElement[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const { cols, gap, minSquareSize } = CONFIG.backgrounds.cubes;

        const maxPossibleCols = Math.floor(width / (minSquareSize + gap));
        const actualCols = Math.min(cols, maxPossibleCols) || 1;
        const actualSquareSize = (width - gap * (actualCols - 1)) / actualCols;
        const actualRows = Math.floor(height / (actualSquareSize + gap));

        setLayout({
          cols: actualCols,
          rows: actualRows,
        });
      }
    });

    observer.observe(innerRef.current!);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (layout.rows === 0) {
      return;
    }

    const wrapper = innerRef.current!;
    const squares = Array.from(wrapper.children) as HTMLDivElement[];
    squaresRef.current = squares;

    centersRef.current = squares.map((square) => {
      const rect = square.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    });
  }, [layout]);

  useImperativeHandle(ref, () => ({
    onMouseMove: function (event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      for (let i = 0; i < squaresRef.current.length; i += 1) {
        const diffX = mouseX - centersRef.current[i].x;
        const diffY = mouseY - centersRef.current[i].y;

        const radians = Math.atan2(diffY, diffX);
        const angle = (radians * 180) / Math.PI;

        squaresRef.current[i].style.transform = `rotate(${angle}deg)`;
      }
    },
  }));

  return (
    <div
      className={cn("grid gap-4", className)}
      style={{
        gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${layout.rows}, auto)`,
      }}
      ref={innerRef}
    >
      {Array.from({ length: layout.rows * layout.cols })
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            style={{
              backgroundColor: tailwindColor(...CONFIG.backgrounds.cubes.color),
              gap: `${CONFIG.backgrounds.cubes.gap}px`,
            }}
            className="will-change-transform rounded-md aspect-square"
          />
        ))}
    </div>
  );
});
