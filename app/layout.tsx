import type { Metadata } from "next";
import "./globals.css";
import { NavComponent } from "@/components/nav";
import { BackgroundComponent } from "@/components/background/background";
import { CONFIG } from "@/lib/config";
import { Anta } from "next/font/google";

export const metadata: Metadata = {
  title: "Portfolio",
};

const font = Anta({
  display: "swap",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} dark antialiased min-h-screen max-w-screen flex`}
      >
        <BackgroundComponent />
        <main className="flex-1 flex items-center justify-center max-w-full">
          <NavComponent />
          <div className="w-full max-w-5xl">
            {CONFIG.navItems.map(({ title, Component }) => (
              <Component key={title} />
            ))}
          </div>
        </main>
        {children}
      </body>
    </html>
  );
}
