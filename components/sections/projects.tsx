"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { clamp, cn, tailwindColor } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Github } from "lucide-react";
import React, { useRef, useState } from "react";
import { CubesBackgroundHandle } from "@/components/background/cubes";
import { GridBackground } from "@/components/background/grid";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function scrollToIndex(index: number) {
    index = clamp(index, 0, CONFIG.sections.projects.items.length - 1);
    setActiveIndex(index);
    const items = containerRef.current!.children;
    (items[index] as HTMLDivElement).scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  function onScroll() {
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    let closestIndex = 0;
    let closestDist = Number.POSITIVE_INFINITY;
    [...container.children].forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - itemCenterX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  }

  return (
    <SectionWrapper title="Projects" className="flex flex-col w-full gap-3">
      <div
        className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        ref={containerRef}
        onScroll={onScroll}
      >
        {CONFIG.sections.projects.items.map((item, index) => (
          <ProjectItem
            key={item.title}
            item={item}
            isActive={index === activeIndex}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-6">
        {(() => {
          const chevronProps = {
            className:
              "text-primary-foreground/50 hover:text-primary-foreground cursor-pointer",
            size: 30,
          };
          return (
            <>
              <ChevronLeft
                {...chevronProps}
                onClick={() => scrollToIndex(activeIndex - 1)}
              />
              {CONFIG.sections.projects.items.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-3 rounded-full transition-all duration-300 cursor-pointer",
                    index === activeIndex
                      ? "w-6 bg-primary-foreground"
                      : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  )}
                  onClick={() => scrollToIndex(index)}
                />
              ))}
              <ChevronRight
                {...chevronProps}
                onClick={() => scrollToIndex(activeIndex + 1)}
              />
            </>
          );
        })()}
      </div>
    </SectionWrapper>
  );
}

function ProjectItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof CONFIG.sections.projects.items)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.Icon;
  const backgroundRef = useRef<CubesBackgroundHandle | null>(null);

  const onMouseMove = (event: React.MouseEvent) => {
    backgroundRef.current!.onMouseMove(event);
  };

  const gradient = {
    backgroundImage: `linear-gradient(to bottom right, ${tailwindColor(item.color, 500, 20)}, ${tailwindColor(item.color, 900, 10)})`,
  };
  const accent = {
    color: tailwindColor(item.color, 400),
  };
  return (
    <div
      className={cn(
        "w-full md:w-[80%] flex-none rounded-xl overflow-hidden border border-border transition-all duration-500 snap-center",
        isActive ? "opacity-100 scale-100" : "opacity-60 scale-90",
      )}
      onClick={onClick}
    >
      <div
        className="h-50 flex flex-col relative bg-background border-b border-border group"
        onMouseMove={onMouseMove}
      >
        <GridBackground
          className="absolute z-5 w-full h-full top-0 left-0 hidden group-hover:block"
          ref={backgroundRef}
          color={item.color}
        />
        <div
          style={{ ...gradient, ...accent }}
          className={cn(
            "absolute z-10 top-0 left-0 w-full h-full bg-linear-to-br flex items-center justify-center",
            gradient,
          )}
        >
          <Icon className="opacity-30" size={100} strokeWidth={0.5} />
        </div>
        <div className="flex flex-col gap-2 mt-auto p-5">
          <div
            className="flex items-center gap-2 font-mono"
            style={{ ...accent }}
          >
            <Icon size={20} /> {item.shortDescription.toUpperCase()}
          </div>
          <div className="font-bold text-2xl">{item.title}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5 backdrop-blur-md bg-background">
        <div className="text-muted-foreground">{item.description}</div>
        <ul className="list-disc list-inside">
          {item.features.map((feature) => (
            <li style={{ ...accent }} key={feature}>
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {item.tags.map((tag) => (
            <div
              key={tag}
              className="text-sm text-muted-foreground border-2 border-border px-2 py-1 rounded-sm"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="bg-border w-[95%] h-0.5" />
        </div>
        <div className="flex items-center text-sm">
          <Link className="flex items-center ml-auto gap-2" href={item.link}>
            <Github size={17} /> Code
          </Link>
        </div>
      </div>
    </div>
  );
}
