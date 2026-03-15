"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { clamp, cn, tailwindColor } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { GridBackground } from "@/components/background/grid";
import { useHover } from "@/hooks/useHover";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        }
      },
      {
        root: container,
        threshold: 0.6,
      },
    );

    const children = Array.from(container.children);
    children.forEach(function (child, index) {
      (child as HTMLElement).dataset.index = index.toString();
      observer.observe(child);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current!;
    const atStart = scrollLeft <= 5;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
    if (isAtStart !== atStart) {
      setIsAtStart(atStart);
    }
    if (isAtEnd !== atEnd) {
      setIsAtEnd(atEnd);
    }
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
      <div className="relative w-full">
        <div
          className={cn(
            "absolute left-0 top-0 w-16 z-10 pointer-events-none bg-linear-to-r from-background to-transparent transition-opacity duration-500",
            isAtStart ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
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
        <div
          className={cn(
            "absolute right-0 top-0 w-16 z-10 pointer-events-none bg-linear-to-r from-background to-transparent transition-opacity duration-500",
            isAtEnd ? "opacity-0" : "opacity-100",
          )}
        />
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
      {...hover.props}
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
  const { containerRef, isHovered, mouseRef } =
    useInteractiveBackground<HTMLDivElement>();

  return (
    <div
      className={cn(
        "w-full md:w-[70%] shrink-0 flex flex-col rounded-xl overflow-hidden border border-muted transition-all duration-500 snap-center",
        isActive ? "scale-100" : "scale-90",
      )}
      onClick={onClick}
    >
      <div
        className="h-50 flex flex-col relative bg-background border-b border-border"
        ref={containerRef}
      >
        {isHovered && (
          <GridBackground
            className="absolute z-5 w-full h-full top-0 left-0"
            color={item.color}
            mouseRef={mouseRef}
          />
        )}
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
              {...linkHover.props}
            >
              <item.source.Icon size={17} /> {item.source.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
