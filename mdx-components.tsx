import type { MDXComponents } from "mdx/types";
import React from "react";
import { cn } from "./lib/utils";

function getNodeText(node: React.ReactNode): string {
  if (["string", "number"].includes(typeof node)) {
    return String(node);
  }
  if (node instanceof Array) {
    return node.map(getNodeText).join("");
  }
  if (typeof node === "object" && node && "children" in node) {
    return getNodeText(node.children);
  }
  return "";
}

function getAnchorId(children: React.ReactNode) {
  return getNodeText(children)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-+/, "-");
}

function AnchorWrapper({ children }: { children: React.ReactNode }) {
  return (
    <a className="hover:underline" href={`#${getAnchorId(children)}`}>
      {children}
    </a>
  );
}

const components = {
  h1: ({ children }) => (
    <h1
      className="text-3xl text-primary-foreground mt-5"
      id={getAnchorId(children)}
    >
      - <AnchorWrapper>{children}</AnchorWrapper>
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="text-2xl text-primary-foreground mt-5"
      id={getAnchorId(children)}
    >
      -- <AnchorWrapper>{children}</AnchorWrapper>
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className="text-xl text-primary-foreground mt-5"
      id={getAnchorId(children)}
    >
      --- <AnchorWrapper>{children}</AnchorWrapper>
    </h3>
  ),
  a: ({ href, children }) => (
    <a className="text-primary-foreground hover:underline" href={href}>
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside marker:text-primary-foreground">
      {children}
    </ul>
  ),
  figure: ({ children, className, ...rest }) => (
    <figure className={cn(className, "w-full")} {...rest}>
      {children}
    </figure>
  ),
  pre: ({ children, className, ...rest }) => (
    <pre className={cn(className, "p-5 w-full rounded-2xl overflow-x-auto")} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children, className }) => (
    <code
      className={cn(
        className,
        "text-foreground",
      )}
      style={{
        wordBreak: "break-word",
      }}
    >
      {children}
    </code>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
