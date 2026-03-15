import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionTitle({ title }: { title: string }) {
  return (
    <div
      id={title.toLowerCase()}
      className="font-mono font-bold text-lg text-primary-foreground uppercase mb-5"
    >
      <span className="text-muted-foreground text-xl">{"// "}</span>
      {title}
    </div>
  );
}

export function SectionWrapper({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("p-5 w-full", className)}>
      {title && <SectionTitle title={title} />}
      {children}
    </div>
  );
}
