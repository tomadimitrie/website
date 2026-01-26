"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { CONFIG } from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function NavComponent() {
  const navRef = useRef<HTMLDivElement>(null);

  const [wasScrolled, setWasScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setWasScrolled(window.scrollY > navRef.current!.offsetHeight);
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 z-30 w-full flex items-center justify-center h-20 pt-0",
        wasScrolled && "backdrop-blur-md",
      )}
    >
      <div className="flex gap-3">
        {CONFIG.navItems.map((item) => (
          <Button asChild variant="nav" key={item.title}>
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
