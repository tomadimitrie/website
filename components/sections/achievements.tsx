"use client";

import { DotsBackground } from "@/components/background/dots";
import Link from "@/components/overrides/link";
import { SectionWrapper } from "@/components/sections/section";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export function AchievementsSection() {
  return (
    <SectionWrapper title="Achievements" className="flex flex-col w-full gap-5">
      {CONFIG.sections.achievements.items.map((item) => (
        <AchievementItem key={item.title.toString()} item={item} />
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
    const className = "font-mono font-bold text-xl text-primary-foreground";
    if (!item.link) {
      return <div className={className}>{item.title}</div>;
    } else {
      return (
        <Link href={item.link} className={className}>
          {item.title}
        </Link>
      );
    }
  }

  return (
    <div
      className="relative overflow-hidden backdrop-blur-md rounded-md border border-muted"
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
