import { BackgroundComponent } from "@/components/background/background";
import { NavComponent } from "@/components/nav";
import type { Metadata } from "next";
import { Anta } from "next/font/google";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio",
};

const font = Anta({
  display: "swap",
  weight: "400",
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${font.className} dark antialiased min-h-screen max-w-screen flex`}
      >
        <BackgroundComponent />
        <main className="flex-1 flex flex-col items-center max-w-full mb-10">
          <NavComponent />
          <div className="w-full max-w-5xl mt-10 px-5">{children}</div>
        </main>
      </body>
    </html>
  );
}
