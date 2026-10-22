"use client";

import { SectionWrapper } from "@/components/sections/section";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";
import { CONFIG } from "@/lib/config";
import { Trail } from "../background/trail";
import Link from "../overrides/link";

export function PublicationsSection() {
  return (
    <SectionWrapper title="Publications" className="flex flex-col w-full gap-3">
      {CONFIG.sections.publications.items.map((item) => (
        <PublicationItem key={item.title} item={item} />
      ))}
    </SectionWrapper>
  );
}

function PublicationItem({
  item,
}: {
  item: (typeof CONFIG.sections.publications.items)[number];
}) {
  const { isHovered, containerRef, subscribeToMouse } =
    useInteractiveBackground<HTMLDivElement>();

  return (
    <div
      className="relative overflow-hidden backdrop-blur-md rounded-md border border-muted"
      ref={containerRef}
    >
      {isHovered && (
        <Trail
          className="absolute -z-90 w-full h-full top-0 left-0"
          subscribeToMouse={subscribeToMouse}
        />
      )}
      <div className="flex flex-col gap-3 p-7">
        <div className="text-primary-foreground font-bold text-xl hover:underline">
          <Link href={item.url}>{item.publishedIn}</Link>
        </div>
        <div className="text-xl">{item.title}</div>
        <div className="text-muted-foreground">
          Authors: {item.authors.join(", ")}
        </div>
        <details className="text-muted-foreground">
          <summary className="text-primary-foreground">View Abstract:</summary>
          {item.abstract}
        </details>
      </div>
    </div>
  );
}
