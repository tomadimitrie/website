import type { Metadata } from "next";
import "./globals.css";
import { BackgroundComponent } from "@/components/background/background";
import { Anta } from "next/font/google";
import { NavComponent } from "@/components/nav";
import React from "react";

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
        <main className="flex-1 flex flex-col items-center max-w-full mb-10">
          <NavComponent />
          <div className="w-full max-w-5xl mt-10 px-5">{children}</div>
        </main>
      </body>
    </html>
  );
}
