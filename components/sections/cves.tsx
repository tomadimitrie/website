"use client";

import { ExternalLink } from "lucide-react";
import { MatrixRain } from "@/components/background/matrix-rain";
import { SectionWrapper } from "@/components/sections/section";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";
import { CONFIG } from "@/lib/config";
import { Tags } from "../ui/tags";

export function CvesSection() {
  return (
    <SectionWrapper title="CVEs" className="flex flex-col w-full gap-3">
      {CONFIG.sections.cves.items.map((item) => (
        <CveItem key={item.cve} item={item} />
      ))}
    </SectionWrapper>
  );
}

export function cvssInfo(cvss: number): [string, string] {
  if (cvss < 4.0) {
    return ["Low", "text-green-500 border-green-500 bg-yellow-950"] as const;
  } else if (cvss < 7.0) {
    return [
      "Medium",
      "text-yellow-500 border-yellow-500 bg-yellow-950",
    ] as const;
  } else {
    return ["High", "text-red-500 border-red-500 bg-red-950"];
  }
}

function CveItem({
  item,
}: {
  item: (typeof CONFIG.sections.cves.items)[number];
}) {
  const { isHovered, containerRef } =
    useInteractiveBackground<HTMLDivElement>();

  return (
    <div
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
                <div className="text-muted-foreground">CVSS {item.cvss}</div>
                <Tags.Item className={className}>
                  {rating.toUpperCase()}
                </Tags.Item>
              </div>
            );
          })()}
        </div>
        <div className="text-xl">{item.title}</div>
        <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
          {item.features.map((feature, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: always same order, cannot use item itself since we don't know if there are duplicates
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
