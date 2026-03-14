import { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      {title && (
        <>
          <div
            id={title.toLowerCase()}
            className="font-mono font-bold text-xl text-muted-foreground uppercase mb-5"
          >
            <span className="text-primary-foreground text-2xl">{"// "}</span>
            {title}
          </div>
        </>
      )}
      {children}
    </div>
  );
}
