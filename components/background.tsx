"use client";

import { useEffect, useRef } from "react";
import { clamp, randomBetween, randomFrom } from "@/lib/utils";

export function BackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mouse = { x: -10000, y: -10000 };

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const backgroundCanvas = new OffscreenCanvas(0, 0);
    const backgroundCtx = backgroundCanvas.getContext("2d")!;

    const spotlightCanvas = new OffscreenCanvas(0, 0);
    const spotlightCtx = spotlightCanvas.getContext("2d")!;

    const mainCanvas = canvasRef.current!;
    const mainCtx = mainCanvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      return new Promise<void>((resolve) => {
        window.requestIdleCallback(
          () => {
            const cssWidth = window.innerWidth;
            const cssHeight = window.innerHeight;

            mainCanvas.width = cssWidth * dpr;
            mainCanvas.height = cssHeight * dpr;
            mainCanvas.style.width = `${cssWidth}px`;
            mainCanvas.style.height = `${cssHeight}px`;

            backgroundCanvas.width = mainCanvas.width;
            backgroundCanvas.height = mainCanvas.height;

            spotlightCanvas.width = mainCanvas.width;
            spotlightCanvas.height = mainCanvas.height;

            // mainCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // backgroundCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // spotlightCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

            drawText();

            drawBackground();

            resolve();
          },
          { timeout: 2000 },
        );
      });
    }

    function drawText() {
      backgroundCtx.clearRect(
        0,
        0,
        backgroundCanvas.width,
        backgroundCanvas.height,
      );

      const minWidth = 400;
      const maxWidth = 3000;
      const minFont = 15;
      const maxFont = 35;
      const t = (window.innerWidth - minWidth) / (maxWidth - minWidth);
      const clampedT = clamp(t, 0, 1);
      const fontSize = maxFont - clampedT * (maxFont - minFont);
      console.log(fontSize);
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
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
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

    function updateSpotlight(x: number, y: number) {
      return new Promise<void>((resolve) => {
        window.requestIdleCallback(
          () => {
            mouse.x = x;
            mouse.y = y;

            drawBackground();

            resolve();
          },
          { timeout: 2000 },
        );
      });
    }

    function onMove(event: MouseEvent) {
      resetRandomInterval();
      const rect = mainCanvas.getBoundingClientRect();
      updateSpotlight(event.clientX - rect.left, event.clientY - rect.top);
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

    const diagonalDirections = [
      [1, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
    ];
    const lineDirections = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    const directions = [...diagonalDirections, ...lineDirections];
    const MAX_TICKS = 100;
    let directionInfo = {
      direction: directions[0],
      ticks: MAX_TICKS,
    };

    function randomSpotlight() {
      const didExceedTicks = directionInfo.ticks >= MAX_TICKS;
      const didExceedBounds =
        mouse.x <= 0 ||
        mouse.y <= 0 ||
        mouse.x >= mainCanvas.width ||
        mouse.y >= mainCanvas.height;

      if (didExceedTicks || didExceedBounds) {
        const direction = randomFrom(
          didExceedBounds ? diagonalDirections : directions,
        );
        directionInfo = {
          direction,
          ticks: 0,
        };
      }
      updateSpotlight(
        mouse.x + randomBetween(0, 10) * directionInfo.direction[0],
        mouse.y + randomBetween(0, 10) * directionInfo.direction[1],
      );
      directionInfo.ticks += 1;
    }

    function createRandomInterval() {
      if (interval !== null) {
        return;
      }
      interval = setInterval(randomSpotlight, 25);
    }

    function removeRandomInterval() {
      if (interval === null) {
        return;
      }
      clearInterval(interval);
      interval = null;
    }

    function resetRandomInterval() {
      removeRandomInterval();
      setTimeout(() => {
        createRandomInterval();
      }, 2000);
    }

    resize().then(async () => {
      await updateSpotlight(
        randomBetween(mainCanvas.width / 4, (mainCanvas.width * 3) / 4),
        randomBetween(mainCanvas.height / 4, (mainCanvas.height * 3) / 4),
      );
      createRandomInterval();
    });

    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
    }
    let interval: NodeJS.Timeout | null = null;

    return () => {
      removeRandomInterval();
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove);
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 z-10" />;
}
