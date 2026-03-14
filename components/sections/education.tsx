"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { TimelineLine } from "@/components/ui/timeline-line";
import { cn } from "@/lib/utils";
import { match } from "ts-pattern";
import React from "react";
import { LinesBackground } from "@/components/background/lines";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";

export function EducationSection() {
  return (
    <SectionWrapper title="Education" className="flex flex-col w-full">
      {CONFIG.sections.education.items.map((item, index, array) => {
        const type = match(index)
          .with(0, () => "first" as const)
          .with(array.length - 1, () => "last" as const)
          .otherwise(() => "normal" as const);

        return (
          <div key={item.university} className="flex gap-5 items-stretch">
            <TimelineLine type={type} />
            <EducationItem item={item} isLast={type === "last"} />
          </div>
        );
      })}
    </SectionWrapper>
  );
}

function EducationItem({
  item,
  isLast,
}: {
  item: (typeof CONFIG.sections.education.items)[number];
  isLast: boolean;
}) {
  const { containerRef, mouseRef, isHovered, subscribeToMouse } =
    useInteractiveBackground<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col gap-4 p-7 w-full backdrop-blur-md",
        !isLast && "mb-5",
      )}
    >
      {isHovered && (
        <LinesBackground
          className="absolute w-full h-full top-0 left-0 -z-10"
          mouseRef={mouseRef}
          subscribeToMouse={subscribeToMouse}
        />
      )}
      <div className="text-muted-foreground text-md">
        {item.from} - {item.to}
      </div>
      <div className="text-xl">
        <span className="font-bold">{item.type}</span>
        <span className="text-muted-foreground"> in </span>
        <span className="text-primary-foreground font-bold">{item.domain}</span>
      </div>
      <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
        {item.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="flex gap-3">
        {item.tags.map((tag) => (
          <div
            key={tag}
            className="border-2 border-primary-foreground text-primary-foreground bg-primary font-bold font-mono px-2 py-1 rounded-md"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
