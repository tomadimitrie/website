import { cn } from "@/lib/utils";

export function TimelineLine({ type }: { type: "first" | "normal" | "last" }) {
  return (
    <div
      className={cn(
        "relative bg-primary-foreground group-hover:animate-[spotlight-line_2s_linear_infinite] spotlight-line",
        type === "first" && "rounded-t-full",
        type === "last" && "rounded-b-full",
      )}
    >
      <div className="w-4 h-4 -ml-1.5 rounded-full bg-primary-foreground absolute top-8 left-0" />
      <div className="w-1 h-full" />
    </div>
  );
}
