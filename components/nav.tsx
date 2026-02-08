"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { CONFIG } from "@/lib/config";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SquareMenu } from "lucide-react";

export function NavComponent() {
  const [wasScrolled, setWasScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function onScroll() {
      setWasScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function renderItems(isMobile: boolean) {
    return (
      <div
        className={cn(
          "fixed top-0 left-0 z-30 w-full flex flex-col md:flex-row items-center justify-center pt-5 pb-3",
          (wasScrolled || (isMobile && showMenu)) && "backdrop-blur-md",
          isMobile ? "md:hidden" : "hidden md:flex",
        )}
      >
        <SquareMenu
          onClick={() => setShowMenu((showMenu) => !showMenu)}
          className="md:hidden self-end mr-5 text-muted-foreground"
        />
        <div
          className={cn(
            "flex flex-col w-full md:w-auto md:flex-row gap-3",
            (() => {
              if (!isMobile) {
                return null;
              }
              if (showMenu) {
                return "opacity-100 max-h-100";
              } else {
                return "opacity-0 max-h-4";
              }
            })(),
          )}
        >
          {CONFIG.navItems.map((item) => (
            <Button
              className="w-full md:w-auto"
              asChild
              variant="nav"
              key={item.title}
            >
              <Link href={`#${item.title.toLowerCase()}`}>{item.title}</Link>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {renderItems(true)}
      {renderItems(false)}
    </>
  );
}
