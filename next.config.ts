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
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/blog/HjtcK4ztHD",
        destination: "/blog/CVE-2026-54424",
        permanent: true,
      },
      {
        source: "/blog/HjtcK4ztHD--private",
        destination: "/blog/CVE-2026-54424",
        permanent: true,
      },
    ];
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
