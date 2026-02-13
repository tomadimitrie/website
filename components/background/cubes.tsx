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
>(({ className }, ref) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const { cols, gap } = CONFIG.backgrounds.cubes;

    const area = innerRef.current!;
    const areaWidth = area.offsetWidth;
    const areaHeight = area.offsetHeight;
    const squareSize = (areaWidth - gap * (cols - 1)) / cols;

    setLayout({
      cols,
      rows: Math.floor(areaHeight / (squareSize + gap)),
    });
  }, []);

  useImperativeHandle(ref, () => ({
    onMouseMove: function (event) {
      const wrapper = innerRef.current!;
      const squares = [...wrapper.children] as HTMLDivElement[];
      const wrapperRect = wrapper.getBoundingClientRect();

      const mouseX = event.clientX - wrapperRect.left;
      const mouseY = event.clientY - wrapperRect.top;

      for (const square of squares) {
        const rect = square.getBoundingClientRect();

        const squareX = rect.left - wrapperRect.left + rect.width / 2;
        const squareY = rect.top - wrapperRect.top + rect.height / 2;

        const diffX = mouseX - squareX;
        const diffY = mouseY - squareY;

        const radians = Math.atan2(diffY, diffX);
        const angle = (radians * 180) / Math.PI;

        square.style.transform = `rotate(${angle}deg)`;
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
