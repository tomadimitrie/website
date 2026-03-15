import type { MDXComponents } from "mdx/types";

const components = {
  h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
