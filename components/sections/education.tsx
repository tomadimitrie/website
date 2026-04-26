"use client";

import { LinesBackground } from "@/components/background/lines";
import { SectionWrapper } from "@/components/sections/section";
import { TimelineLine } from "@/components/ui/timeline-line";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import { match } from "ts-pattern";
import { Tags } from "../ui/tags";

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
        "flex flex-col gap-4 p-7 w-full backdrop-blur-md border border-muted",
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
        <span className="text-muted-foreground"> ({item.university})</span>
      </div>
      <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
        {item.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <>
        {item.tags.map((tag) => (
          <Tags.Item key={tag}>{tag}</Tags.Item>
        ))}
      </>
    </div>
  );
}
