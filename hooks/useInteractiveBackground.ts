import React, { useCallback, useEffect, useRef, useState } from "react";

export type MouseSubscriber = (x: number, y: number) => void;

export type MouseRef = React.RefObject<{ x: number; y: number }>;

export type SubscribeToMouse = (callback: MouseSubscriber) => () => void;

export function useInteractiveBackground<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseRef = useRef({ x: -1000, y: -1000 });

  const listeners = useRef<Set<MouseSubscriber>>(new Set());

  const subscribeToMouse = useCallback((callback: MouseSubscriber) => {
    listeners.current.add(callback);

    return () => {
      listeners.current.delete(callback);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current!;

    let rect = container.getBoundingClientRect();

    function updateRect() {
      rect = container.getBoundingClientRect();
    }

    function onPointerEnter() {
      updateRect();
      setIsHovered(true);
    }

    function onPointerLeave() {
      setIsHovered(false);
    }

    function onPointerMove(event: PointerEvent) {
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;

      listeners.current.forEach((listener) =>
        listener(mouseRef.current.x, mouseRef.current.y),
      );
    }

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("pointermove", onPointerMove);

    window.addEventListener("scroll", updateRect, { passive: true });

    const observer = new ResizeObserver(() => {
      updateRect();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateRect);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerenter", onPointerEnter);
    };
  }, []);

  return { containerRef, isHovered, mouseRef, subscribeToMouse };
}
