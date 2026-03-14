"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import React from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DotsBackground } from "@/components/background/dots";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";

export function AchievementsSection() {
  return (
    <SectionWrapper title="Achievements" className="flex flex-col w-full gap-5">
      {CONFIG.sections.achievements.items.map((item) => (
        <AchievementItem key={item.title} item={item} />
      ))}
    </SectionWrapper>
  );
}

function AchievementItem({
  item,
}: {
  item: (typeof CONFIG.sections.achievements.items)[number];
}) {
  const { containerRef, mouseRef, isHovered } =
    useInteractiveBackground<HTMLDivElement>();

  function link() {
    const inner = (
      <div
        className={cn(
          "font-mono font-bold text-xl text-primary-foreground",
          item.link && "hover:underline",
        )}
      >
        {item.title}
        {item.link && (
          <span className="inline-block align-[-4px] ml-2">
            <ExternalLink />
          </span>
        )}
      </div>
    );
    if (!item.link) {
      return inner;
    } else {
      return (
        <Link href={item.link} target="_blank">
          {inner}
        </Link>
      );
    }
  }

  return (
    <div
      className="relative overflow-hidden backdrop-blur-md rounded-md"
      ref={containerRef}
    >
      {isHovered && (
        <DotsBackground
          className="absolute w-full h-full top-0 left-0 -z-10"
          mouseRef={mouseRef}
        />
      )}

      <div className="flex flex-col items-start gap-3 p-7">
        {link()}
        <div className="text-muted-foreground">{item.subtitle}</div>
      </div>
    </div>
  );
}
