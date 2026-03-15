import { CONFIG } from "@/lib/config";

export default function Home() {
  return CONFIG.navItems
    .map(({ title, Component }) => {
      if (!Component) {
        return null;
      }
      return <Component key={title} />;
    })
    .filter(Boolean);
}
