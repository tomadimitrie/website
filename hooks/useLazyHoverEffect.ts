import React, { useRef, useState } from "react";

export function useLazyHoverEffect<
  T extends {
    onMouseMove?: (event: React.MouseEvent) => void;
  },
>() {
  const [isHovered, setIsHovered] = useState(false);
  const effectRef = useRef<T | null>(null);

  const containerHandlers = {
    onMouseOver: () => setIsHovered(true),
    onMouseOut: () => setIsHovered(false),
    onMouseMove: (event: React.MouseEvent) => {
      effectRef.current?.onMouseMove?.(event);
    },
  };

  return {
    isHovered,
    effectRef,
    containerHandlers,
  };
}
