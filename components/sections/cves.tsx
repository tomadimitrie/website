"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { MatrixRain } from "@/components/background/matrix-rain";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";

export function CvesSection() {
  const { isHovered, containerRef } =
    useInteractiveBackground<HTMLDivElement>();

  function cvssInfo(cvss: number): [string, string] {
    if (cvss < 4.0) {
      return ["low", "text-green-500 border-green-500 bg-yellow-950"] as const;
    } else if (cvss < 7.0) {
      return [
        "medium",
        "text-yellow-500 border-yellow-500 bg-yellow-950",
      ] as const;
    } else {
      return ["high", "text-red-500 border-red-500 bg-red-950"];
    }
  }

  return (
    <SectionWrapper title="CVEs" className="flex flex-col w-full gap-3">
      {CONFIG.sections.cves.items.map((item) => (
        <div
          key={item.title}
          className="relative overflow-hidden backdrop-blur-md rounded-md border border-muted"
          ref={containerRef}
        >
          {isHovered && (
            <MatrixRain className="absolute -z-90 w-full h-full top-0 left-0" />
          )}
          <div className="flex flex-col gap-3 p-7">
            <div className="flex justify-between font-mono">
              <div className="text-primary-foreground font-bold text-xl hover:underline">
                <a href={item.url}>
                  {item.cve}

                  <span className="inline-block align-[-4px] ml-2">
                    <ExternalLink />
                  </span>
                </a>
              </div>
              {(() => {
                const [rating, className] = cvssInfo(item.cvss);
                return (
                  <div className="flex items-center gap-4">
                    <div className="text-muted-foreground">
                      CVSS {item.cvss}
                    </div>
                    <div
                      className={cn(
                        className,
                        "border-2 px-3 py-0.5 font-bold rounded-md",
                      )}
                    >
                      {rating.toUpperCase()}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="text-xl">{item.title}</div>
            <div className="text-muted-foreground">{item.description}</div>
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}
