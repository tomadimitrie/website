"use client";

import { useEffect, useRef } from "react";
import { clamp, randomBetween, randomFrom, tailwindColor } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { resizeCanvas } from "@/lib/canvas-utils";

export function BackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const interval = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const backgroundCanvas = new OffscreenCanvas(0, 0);
    const backgroundCtx = backgroundCanvas.getContext("2d")!;

    const spotlightCanvas = new OffscreenCanvas(0, 0);
    const spotlightCtx = spotlightCanvas.getContext("2d")!;

    const mainCanvas = canvasRef.current!;
    const mainCtx = mainCanvas.getContext("2d")!;

    const {
      minWidth,
      maxWidth,
      minFont,
      maxFont,
      radius,
      maxMove,
      maxTicks,
      moveDelay,
      backgroundAlpha,
      amountToFreeze,
      color,
    } = CONFIG.backgrounds.main;

    function resize() {
      [mainCanvas, backgroundCanvas, spotlightCanvas].forEach((canvas) =>
        resizeCanvas(canvas, window.innerWidth, window.innerHeight),
      );

      drawText();

      drawBackground();
    }

    function drawText() {
      backgroundCtx.clearRect(
        0,
        0,
        backgroundCanvas.width,
        backgroundCanvas.height,
      );

      const t = (window.innerWidth - minWidth) / (maxWidth - minWidth);
      const clampedT = clamp(t, 0, 1);
      const fontSize = maxFont - clampedT * (maxFont - minFont);
      const letterSpacing = 4;
      const lineSpacing = 4;

      backgroundCtx.font = `${fontSize}px monospace`;
      backgroundCtx.fillStyle = tailwindColor(...color);

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

    function updateSpotlight() {
      drawBackground();
      animationFrame.current = requestAnimationFrame(updateSpotlight);
    }

    function onMove(event: MouseEvent) {
      const rect = mainCanvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
      resetRandomInterval();
    }

    function drawBackground() {
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

      mainCtx.globalAlpha = backgroundAlpha;
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
    let directionInfo = {
      direction: directions[0],
      ticks: maxTicks,
    };

    function randomSpotlight() {
      const didExceedTicks = directionInfo.ticks >= maxTicks;
      const didExceedBounds =
        mouse.current.x <= 0 ||
        mouse.current.y <= 0 ||
        mouse.current.x >= mainCanvas.width ||
        mouse.current.y >= mainCanvas.height;

      if (didExceedTicks || didExceedBounds) {
        const direction = randomFrom(
          didExceedBounds ? diagonalDirections : directions,
        );
        directionInfo = {
          direction,
          ticks: 0,
        };
      }
      mouse.current.x += randomBetween(0, maxMove) * directionInfo.direction[0];
      mouse.current.y += randomBetween(0, maxMove) * directionInfo.direction[1];
      directionInfo.ticks += 1;
    }

    function createRandomInterval() {
      if (interval.current !== null) {
        return;
      }
      interval.current = setInterval(randomSpotlight, moveDelay);
    }

    function removeRandomInterval() {
      if (interval.current === null) {
        return;
      }
      clearInterval(interval.current);
      interval.current = null;
    }

    function resetRandomInterval() {
      removeRandomInterval();
      setTimeout(() => {
        createRandomInterval();
      }, amountToFreeze);
    }

    resize();
    mouse.current = {
      x: randomBetween(mainCanvas.width / 4, (mainCanvas.width * 3) / 4),
      y: randomBetween(mainCanvas.height / 4, (mainCanvas.height * 3) / 4),
    };

    window.addEventListener("resize", resize);
    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
    }
    animationFrame.current = requestAnimationFrame(updateSpotlight);
    createRandomInterval();

    return () => {
      removeRandomInterval();
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove);
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-99" />;
}
