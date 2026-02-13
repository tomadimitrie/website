"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { clamp, cn, tailwindColor } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import { CubesBackgroundHandle } from "@/components/background/cubes";
import { GridBackground } from "@/components/background/grid";
import { useHover } from "@/hooks/useHover";

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

    const isAtStart = container.scrollLeft <= 5;
    const isAtEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

    container.dataset.atStart = String(isAtStart);
    container.dataset.atEnd = String(isAtEnd);
  }

  return (
    <SectionWrapper title="Projects" className="flex flex-col w-full gap-5">
      <style>
        {`
        @property --mask-left {
          syntax: "<color>";
          inherits: false;
          initial-value: black;
        }
        
        @property --mask-right {
          syntax: "<color>";
          inherits: false;
          initial-value: transparent;
        }
        `}
      </style>
      <div className="text-muted-foreground">
        Some projects are undergoing a major refactoring and will be publicly
        available on GitHub soon
      </div>
      <div className="flex gap-5 flex-wrap">
        {CONFIG.sections.projects.items.map((item, index) => (
          <ProjectShortcut
            key={index}
            item={item}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
      <div
        className={cn(
          "w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar",
          "[--mask-left:black] [--mask-right:transparent]",
          "data-[at-start=false]:[--mask-left:transparent] data-[at-end=true]:[--mask-right:black]",
          "mask-[linear-gradient(to_right,var(--mask-left)_0%,black_10%,black_90%,var(--mask-right)_100%)]",
          "[transition:--mask-left_500ms_ease,--mask-right_500ms_ease]",
        )}
        ref={containerRef}
        data-at-start="true"
        data-at-end="false"
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

function ProjectShortcut({
  item,
  onClick,
}: {
  item: (typeof CONFIG.sections.projects.items)[number];
  onClick: () => void;
}) {
  const color = useMemo(() => tailwindColor(item.color, 400), [item.color]);
  const background = useMemo(
    () => tailwindColor(item.color, 950, 75),
    [item.color],
  );

  const hover = useHover(
    { backgroundColor: background },
    {
      color,
      borderColor: color,
    },
  );

  return (
    <div
      className="cursor-pointer font-mono font-bold border rounded-md px-2 py-0.5 backdrop-blur-md grow text-center"
      role="button"
      onClick={onClick}
      {...hover}
    >
      {item.title} ({item.shortDescription})
    </div>
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
  const backgroundRef = useRef<CubesBackgroundHandle | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseMove = (event: React.MouseEvent) => {
    backgroundRef.current!.onMouseMove(event);
  };

  const gradient = useMemo(
    () => ({
      backgroundImage: `linear-gradient(to bottom right, ${tailwindColor(item.color, 500, 20)}, ${tailwindColor(item.color, 900, 10)})`,
    }),
    [item.color],
  );

  const accent = useMemo(
    () => ({
      color: tailwindColor(item.color, 400),
    }),
    [item.color],
  );

  const tagStyle = useMemo(
    () => ({
      borderColor: tailwindColor(item.color, 700),
      color: tailwindColor(item.color, 700),
    }),
    [item.color],
  );

  const linkHover = useHover(accent);

  return (
    <div
      className={cn(
        "w-full md:w-[70%] shrink-0 flex flex-col rounded-xl overflow-hidden border border-border transition-all duration-500 snap-center",
        isActive ? "scale-100" : "scale-90",
      )}
      onClick={onClick}
    >
      <div
        className="h-50 flex flex-col relative bg-background border-b border-border group"
        onMouseMove={onMouseMove}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
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
          <item.Icon
            className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
            size={100}
            strokeWidth={isHovered ? 2 : 0.5}
          />
        </div>
        <div className="flex flex-col z-15 gap-2 mt-auto p-5">
          <div
            className="flex items-center gap-2 font-mono font-bold"
            style={{ ...accent }}
          >
            <item.Icon size={20} /> {item.shortDescription.toUpperCase()}
          </div>
          <div className="font-bold text-2xl">{item.title}</div>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4 p-5 bg-background">
        <div className="text-muted-foreground">{item.description}</div>
        <ul className="list-disc list-inside">
          {item.features.map((feature) => (
            <li style={{ ...accent }} key={feature}>
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {item.tags.map((tag) => (
            <div
              key={tag}
              className="text-sm text-muted-foreground font-mono font-bold border-2 border-border px-2 py-1 rounded-sm"
              style={{ ...tagStyle }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="bg-border w-[95%] h-0.5" />
        </div>
        <div className="flex items-center text-sm h-5">
          {item.source && (
            <Link
              className="flex items-center ml-auto gap-2"
              target="_blank"
              href={item.source.link}
              {...linkHover}
            >
              <item.source.Icon size={17} /> {item.source.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
