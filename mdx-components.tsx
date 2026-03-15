import type { MDXComponents } from "mdx/types";

const components = {
  h1: ({ children }) => (
    <h1 className="text-3xl text-primary-foreground mt-5">- {children}</h1>
  ),
  h2: ({ children }) => (
    <h1 className="text-2xl text-primary-foreground mt-5">-- {children}</h1>
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
  code: ({ children }) => (
    <code className="text-foreground break-all">{children}</code>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
