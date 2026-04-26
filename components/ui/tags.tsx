import { cn } from "@/lib/utils";
import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>
  );
}

function Item({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "whitespace-nowrap border-2 border-primary-foreground text-primary-foreground bg-primary font-bold font-mono px-2 py-1 rounded-md",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export const Tags = {
  Container,
  Item,
};
