import { CONFIG } from "@/lib/config";
import { ShellText } from "../shell-text";
import { SectionWrapper } from "@/components/sections/section";
import Link from "next/link";

export function AboutSection() {
  return (
    <SectionWrapper>
      <div className="min-h-screen flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-6 rounded-4xl">
          <ShellText />
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold">
            {CONFIG.name}
          </div>
          <div className="text-primary-foreground text-lg md:text-xl lg:text-2xl">
            {CONFIG.subtitle}
          </div>
          <div className="text-muted-foreground text-md md:text-lg lg:text-xl">
            {CONFIG.about}
          </div>
          <div className="flex items-center gap-3">
            {CONFIG.socials.map(({ url, Icon }) => (
              <Link key={url} target="_blank" href={url}>
                <Icon
                  className="text-muted-foreground hover:text-primary-foreground"
                  size={30}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
