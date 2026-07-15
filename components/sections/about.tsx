import Link from "next/link";
import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { ShellText } from "../shell-text";

export function AboutSection() {
  const buttonStyle =
    "text-primary-foreground text-2xl font-mono font-bold border-primary-foreground border-2 w-min px-10 py-1 rounded-md hover:underline hover:bg-primary-foreground/30 ml-auto";

  return (
    <SectionWrapper>
      <div className="min-h-[calc(100vh-var(--spacing)*30)] flex flex-col justify-center gap-6">
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
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
            <div className="flex items-center gap-5">
              {Object.values(CONFIG.socials)
                .filter((social) =>
                  "hidden" in social ? !social.hidden : true,
                )
                .map(({ url, Icon }) => (
                  <Link key={url} target="_blank" href={url}>
                    <Icon
                      className="text-muted-foreground hover:text-primary-foreground"
                      size={30}
                    />
                  </Link>
                ))}
            </div>
            <div className="flex items-center gap-5">
              <Link className={buttonStyle} href="/blog">
                Blog
              </Link>
              <Link className={buttonStyle} href="/cv">
                CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
