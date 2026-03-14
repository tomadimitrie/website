import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntBetween(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomFrom<T>(arr: T[]): T {
  return arr[randomIntBetween(0, arr.length)];
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function tailwindColor(
  name: string,
  value: number,
  opacity?: number,
): string {
  const base = (colors as unknown as Record<string, Record<string, string>>)[name][value];
  if (opacity === undefined) {
    return base;
  }
  return base.replace(")", ` / ${opacity}%)`);
}

export function parseOklch(color: string): { l: number; c: number; h: number } {
  const matches = color.match(/-?\d*\.?\d+/g)!;
  return {
    l: parseFloat(matches[0]),
    c: parseFloat(matches[1]),
    h: parseFloat(matches[2]),
  };
}

export function makeOklch(values: { l: number; c: number; h: number }): string {
  return `oklch(${values.l}% ${values.c} ${values.h})`;
}

export function pointDistance(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): number {
  const dx = fromX - toX;
  const dy = fromY - toY;
  return Math.sqrt(dx * dx + dy * dy);
}
