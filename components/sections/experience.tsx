import { SectionWrapper } from "@/components/sections/section";
import { CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import { TimelineLine } from "@/components/ui/timeline-line";
import { match } from "ts-pattern";

export function ExperienceSection() {
  return (
    <SectionWrapper title="Experience" className="flex flex-col w-full">
      {CONFIG.sections.experience.items.map((item, index, array) => {
        const type = match(index)
          .with(0, () => "first" as const)
          .with(array.length - 1, () => "last" as const)
          .otherwise(() => "normal" as const);
        return (
          <div key={item.company} className="group flex gap-5 items-stretch">
            <TimelineLine type={type} />
            <ExperienceItem item={item} isLast={type === "last"} />
          </div>
        );
      })}
    </SectionWrapper>
  );
}

function ExperienceItem({
  item,
  isLast,
}: {
  item: (typeof CONFIG.sections.experience.items)[number];
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-7 w-full backdrop-blur-md snake-border border border-muted",
        !isLast && "mb-5",
      )}
    >
      <div className="text-muted-foreground text-md">
        {item.from} - {item.to}
      </div>
      <div className="text-xl">
        <span className="font-bold">{item.position}</span>
        <span className="text-muted-foreground"> @ </span>
        <span className="text-primary-foreground font-bold">
          {item.company}
        </span>
      </div>
      <ul className="list-disc list-inside flex flex-col gap-2 text-muted-foreground">
        {item.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="flex gap-3 flex-wrap">
        {item.tags.map((tag) => (
          <div
            key={tag}
            className="border-2 border-primary-foreground text-primary-foreground bg-primary font-bold font-mono px-2 py-1 rounded-md"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
