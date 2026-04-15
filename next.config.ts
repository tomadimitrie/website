import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    rules: {
      "*.enc": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "catppuccin-mocha",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
