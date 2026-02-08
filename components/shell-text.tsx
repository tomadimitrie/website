"use client";

import { CONFIG } from "@/lib/config";
import { useEffect, useState } from "react";

export function ShellText() {
  const [text, setText] = useState("");

  useEffect(() => {
    const texts = CONFIG.shellText.variants;
    let currentTextIndex = 0;
    let currentLetterIndex = -1;

    let interval = createInterval();

    function createInterval() {
      return setInterval(intervalFn, CONFIG.shellText.typeSpeed);
    }

    function intervalFn() {
      if (currentLetterIndex < texts[currentTextIndex].length - 1) {
        currentLetterIndex += 1;
      } else {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        currentLetterIndex = -1;
      }

      if (currentLetterIndex === texts[currentTextIndex].length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          interval = createInterval();
        }, CONFIG.shellText.switchSpeed);
      }

      setText((text) => {
        if (currentLetterIndex === -1) {
          return "";
        } else {
          return text + texts[currentTextIndex][currentLetterIndex];
        }
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="text-primary-foreground min-h-lh font-mono text-lg md:text-xl lg:text-2xl">
      {text}{" "}
      <span className="w-2 h-5 inline-block bg-primary-foreground animate-blink" />
    </div>
  );
}
