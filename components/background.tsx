"use client";

import { useEffect, useRef } from "react";

export function BackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -10000, y: -10000 });

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)");

    const backgroundCanvas = new OffscreenCanvas(0, 0);
    const backgroundCtx = backgroundCanvas.getContext("2d")!;

    const spotlightCanvas = new OffscreenCanvas(0, 0);
    const spotlightCtx = spotlightCanvas.getContext("2d")!;

    const mainCanvas = canvasRef.current!;
    const mainCtx = mainCanvas.getContext("2d")!;
    const parent = mainCanvas.parentElement!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      window.requestIdleCallback(
        () => {
          const cssWidth = parent.clientWidth;
          const cssHeight = parent.clientHeight;

          mainCanvas.width = cssWidth * dpr;
          mainCanvas.height = cssHeight * dpr;
          mainCanvas.style.width = `${cssWidth}px`;
          mainCanvas.style.height = `${cssHeight}px`;

          backgroundCanvas.width = mainCanvas.width;
          backgroundCanvas.height = mainCanvas.height;

          spotlightCanvas.width = mainCanvas.width;
          spotlightCanvas.height = mainCanvas.height;

          mainCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          backgroundCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
          spotlightCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

          drawText();

          drawBackground();
        },
        { timeout: 2000 },
      );
    }

    function drawText() {
      backgroundCtx.clearRect(
        0,
        0,
        backgroundCanvas.width,
        backgroundCanvas.height,
      );

      const fontSize = Math.max(8, Math.min(16, parent.clientWidth / 55));
      const letterSpacing = 4;
      const lineSpacing = 4;

      backgroundCtx.font = `${fontSize}px monospace`;
      backgroundCtx.fillStyle = window
        .getComputedStyle(document.body)
        .getPropertyValue("--color-emerald-700");

      const metrics = backgroundCtx.measureText("0");
      const charWidth = metrics.width + letterSpacing;
      const charHeight =
        metrics.fontBoundingBoxAscent +
        metrics.fontBoundingBoxDescent +
        lineSpacing;

      const cols = Math.ceil(mainCanvas.width / charWidth);
      const rows = Math.ceil(mainCanvas.height / charHeight);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          backgroundCtx.fillText(
            Math.random() > 0.5 ? "1" : "0",
            x * charWidth,
            y * charHeight,
          );
        }
      }
    }

    function drawSpotlight() {
      spotlightCtx.drawImage(
        backgroundCanvas,
        0,
        0,
        spotlightCanvas.width,
        spotlightCanvas.height,
      );

      const radius = 200;
      const gradient = spotlightCtx.createRadialGradient(
        mouse.current.x,
        mouse.current.y,
        0,
        mouse.current.x,
        mouse.current.y,
        radius,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      spotlightCtx.globalCompositeOperation = "destination-in";
      spotlightCtx.fillStyle = gradient;
      spotlightCtx.fillRect(
        0,
        0,
        spotlightCanvas.width,
        spotlightCanvas.height,
      );

      mainCtx.drawImage(spotlightCanvas, 0, 0);

      spotlightCtx.globalCompositeOperation = "source-over";
    }

    function onMove(event: MouseEvent) {
      window.requestIdleCallback(
        () => {
          const rect = mainCanvas.getBoundingClientRect();

          mouse.current.x = event.clientX - rect.left;
          mouse.current.y = event.clientY - rect.top;

          drawBackground();
        },
        { timeout: 2000 },
      );
    }

    function drawBackground() {
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

      mainCtx.globalAlpha = 0.3;
      mainCtx.drawImage(
        backgroundCanvas,
        0,
        0,
        mainCanvas.width,
        mainCanvas.height,
      );
      mainCtx.globalAlpha = 1.0;

      drawSpotlight();
    }

    resize();

    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute z-10" />;
}
