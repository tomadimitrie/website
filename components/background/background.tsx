"use client";

import { useEffect, useRef } from "react";
import { clamp, randomBetween, randomFrom, tailwindColor } from "@/lib/utils";
import { CONFIG } from "@/lib/config";
import { resizeCanvas } from "@/lib/canvas-utils";

export function BackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const freezeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const backgroundCanvas = new OffscreenCanvas(0, 0);
    const backgroundCtx = backgroundCanvas.getContext("2d")!;

    const spotlightCanvas = new OffscreenCanvas(0, 0);
    const spotlightCtx = spotlightCanvas.getContext("2d")!;

    const mainCanvas = canvasRef.current!;
    const mainCtx = mainCanvas.getContext("2d")!;

    const gradientCanvas = new OffscreenCanvas(0, 0);
    const gradientCtx = gradientCanvas.getContext("2d")!;

    const {
      minWidth,
      maxWidth,
      minFont,
      maxFont,
      radius,
      backgroundAlpha,
      amountToFreeze,
      color,
      easing,
      roamSpeed,
    } = CONFIG.backgrounds.main;
    const spotSize = radius * 2;

    let logicalWidth = 0;
    let logicalHeight = 0;

    let isRoaming = true;
    let roamAngle = Math.random() * Math.PI * 2;

    function resize(width: number, height: number) {
      logicalWidth = width;
      logicalHeight = height;

      resizeCanvas(mainCanvas, logicalWidth, logicalHeight, mainCtx);
      resizeCanvas(
        backgroundCanvas,
        logicalWidth,
        logicalHeight,
        backgroundCtx,
      );
      resizeCanvas(spotlightCanvas, spotSize, spotSize, spotlightCtx);
      resizeCanvas(gradientCanvas, spotSize, spotSize, gradientCtx);

      precalculateGradient();

      drawText();

      drawBackground();
    }

    function precalculateGradient() {
      gradientCtx.clearRect(0, 0, spotSize, spotSize);

      const gradient = gradientCtx.createRadialGradient(
        radius,
        radius,
        0,
        radius,
        radius,
        radius,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      gradientCtx.fillStyle = gradient;
      gradientCtx.fillRect(0, 0, spotSize, spotSize);
    }

    function drawText() {
      backgroundCtx.clearRect(0, 0, logicalWidth, logicalHeight);

      const t = (logicalWidth - minWidth) / (maxWidth - minWidth);
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

      const cols = Math.ceil(logicalWidth / charWidth);
      const rows = Math.ceil(logicalHeight / charHeight);

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
      const sx = mouse.current.x - radius;
      const sy = mouse.current.y - radius;

      spotlightCtx.clearRect(0, 0, spotSize, spotSize);

      spotlightCtx.drawImage(
        backgroundCanvas,
        -sx,
        -sy,
        logicalWidth,
        logicalHeight,
      );

      spotlightCtx.globalCompositeOperation = "destination-in";
      spotlightCtx.drawImage(gradientCanvas, 0, 0, spotSize, spotSize);
      spotlightCtx.globalCompositeOperation = "source-over";

      mainCtx.drawImage(spotlightCanvas, sx, sy, spotSize, spotSize);
    }

    function updateSpotlight() {
      if (isRoaming) {
        roamAngle += randomBetween(-0.03, 0.03);

        let nextX = targetMouse.current.x + Math.cos(roamAngle) * roamSpeed;
        let nextY = targetMouse.current.y + Math.sin(roamAngle) * roamSpeed;

        const padding = radius;
        let bounced = false;

        if (nextX <= padding || nextX >= logicalWidth - padding) {
          roamAngle = Math.PI - roamAngle;
          bounced = true;
        }

        if (nextY <= padding || nextY >= logicalHeight - padding) {
          roamAngle = -roamAngle;
          bounced = true;
        }

        if (bounced) {
          nextX = targetMouse.current.x + Math.cos(roamAngle) * roamSpeed;
          nextY = targetMouse.current.y + Math.sin(roamAngle) * roamSpeed;
        }

        targetMouse.current.x = clamp(nextX, 0, logicalWidth);
        targetMouse.current.y = clamp(nextY, 0, logicalHeight);
      }

      mouse.current.x += (targetMouse.current.x - mouse.current.x) * easing;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * easing;

      drawBackground();
      animationFrame.current = requestAnimationFrame(updateSpotlight);
    }

    function onMove(event: MouseEvent) {
      const rect = mainCanvas.getBoundingClientRect();
      targetMouse.current.x = event.clientX - rect.left;
      targetMouse.current.y = event.clientY - rect.top;
      resetIdleTimer();
    }

    function drawBackground() {
      if (logicalWidth <= 0 || logicalHeight <= 0) {
        return;
      }

      mainCtx.clearRect(0, 0, logicalWidth, logicalHeight);

      mainCtx.globalAlpha = backgroundAlpha;
      mainCtx.drawImage(backgroundCanvas, 0, 0, logicalWidth, logicalHeight);
      mainCtx.globalAlpha = 1.0;

      drawSpotlight();
    }

    function resetIdleTimer() {
      isRoaming = false;

      if (freezeTimeout.current) {
        clearTimeout(freezeTimeout.current);
      }

      freezeTimeout.current = setTimeout(() => {
        isRoaming = true;
      }, amountToFreeze);
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
        resize(width, height);
      }
    });
    observer.observe(document.body);

    const startX = randomBetween(logicalWidth / 4, (logicalWidth * 3) / 4);
    const startY = randomBetween(logicalHeight / 4, (logicalHeight * 3) / 4);
    mouse.current = { x: startX, y: startY };
    targetMouse.current = { x: startX, y: startY };

    if (!isMobile) {
      window.addEventListener("mousemove", onMove);
    }
    animationFrame.current = requestAnimationFrame(updateSpotlight);

    return () => {
      if (freezeTimeout.current) {
        clearTimeout(freezeTimeout.current);
      }
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (!isMobile) {
        window.removeEventListener("mousemove", onMove);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-99 w-full h-full"
    />
  );
}
