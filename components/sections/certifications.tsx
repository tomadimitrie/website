"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import { CubesBackground } from "@/components/background/cubes";
import React, { useMemo } from "react";
import { tailwindColor } from "@/lib/utils";
import Link from "next/link";
import { useInteractiveBackground } from "@/hooks/useInteractiveBackground";

export function CertificationsSection() {
  return (
    <SectionWrapper
      title="Certifications"
      className="flex flex-col w-full gap-5"
    >
      {CONFIG.sections.certifications.items.map((item) => (
        <CertificationItem key={item.title} item={item} />
      ))}
    </SectionWrapper>
  );
}

function CertificationItem({
  item,
}: {
  item: (typeof CONFIG.sections.certifications.items)[number];
}) {
  const { isHovered, subscribeToMouse, containerRef } =
    useInteractiveBackground<HTMLDivElement>();

  const authorityColor = useMemo(
    () => tailwindColor(...(item.authority.color as [string, number])),
    [item.authority.color],
  );

  const authorityBackgroundColor = useMemo(
    () => tailwindColor(item.authority.color[0], item.authority.color[1], 20),
    [item.authority.color],
  );

  return (
    <div
      className="relative overflow-hidden backdrop-blur-md rounded-md border border-muted"
      ref={containerRef}
    >
      {isHovered && (
        <CubesBackground
          className="absolute w-full h-full top-0 left-0 -z-10"
          subscribeToMouse={subscribeToMouse}
        />
      )}

      <div className="flex flex-col gap-3 p-7">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between font-mono">
          <div className="text-primary-foreground font-bold text-xl hover:underline">
            <Link href={item.url} target="_blank">
              {item.fullTitle} ({item.title})
              <span className="inline-block align-[-4px] ml-2">
                <ExternalLink />
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="border-2 px-3 py-0.5 font-bold rounded-md hover:underline"
              style={{
                borderColor: authorityColor,
                color: authorityColor,
                backgroundColor: authorityBackgroundColor,
              }}
              target="_blank"
              href={item.authority.website}
            >
              {item.authority.name}
            </Link>
            <div>{item.year}</div>
          </div>
        </div>
        <ul className="list-disc list-inside text-muted-foreground flex flex-col gap-2">
          {item.skills.map((skill) => (
            <li className="" key={skill}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
