import { CONFIG } from "@/lib/config";
import { ShellText } from "./shell-text";

export function AboutComponent() {
  return (
    <div className="min-h-screen flex flex-col justify-center gap-6">
      <div className="backdrop-blur-2xl flex flex-col gap-6 p-10 rounded-4xl">
        <ShellText />
        <div className="text-4xl md:text-6xl lg:text-7xl font-bold">
          {CONFIG.name}
        </div>
        <div className="text-primary text-lg md:text-xl lg:text-2xl">
          {CONFIG.subtitle}
        </div>
        <div className="text-muted-foreground text-md md:text-lg lg:text-xl">
          {CONFIG.about}
        </div>
      </div>
    </div>
  );
}
