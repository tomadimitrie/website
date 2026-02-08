import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { NavComponent } from "@/components/nav";
import { BackgroundComponent } from "@/components/background/background";
import { CONFIG } from "@/lib/config";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${googleSans.className} dark antialiased min-h-screen max-w-screen flex`}
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
