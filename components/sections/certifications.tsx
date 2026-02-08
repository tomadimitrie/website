"use client";

import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import {
  CubesBackground,
  CubesBackgroundHandle,
} from "@/components/background/cubes";
import React, { useRef } from "react";

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
  const backgroundRef = useRef<CubesBackgroundHandle | null>(null);

  const onMouseMove = (event: React.MouseEvent) => {
    backgroundRef.current!.onMouseMove(event);
  };

  return (
    <div
      className="relative group overflow-hidden backdrop-blur-md rounded-md"
      onMouseMove={onMouseMove}
    >
      <CubesBackground
        className="absolute w-full h-full top-0 left-0 -z-10 hidden group-hover:grid"
        ref={backgroundRef}
      />

      <div className="flex flex-col gap-3 p-7">
        <div className="flex justify-between font-mono">
          <div className="text-primary-foreground font-bold text-xl hover:underline">
            <a href={item.url}>
              {item.fullTitle} ({item.title})
              <span className="inline-block align-[-4px] ml-2">
                <ExternalLink />
              </span>
            </a>
          </div>
          <div>
            {item.authority} | {item.year}
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
