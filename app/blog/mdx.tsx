import fs from "fs/promises";
import { dynamicIconImports } from "lucide-react/dynamic";

export interface PostMetadata {
  title: string;
  description: string;
  date: Date;
  featured?: number;
  tags: string[];
  icon: keyof typeof dynamicIconImports;
  color: string;
}

export interface Post {
  link: string;
  metadata: PostMetadata;
}

export const dummyPost: Post = {
  link: "/blog",
  metadata: {
    title: "Coming soon",
    description: "",
    date: new Date(0),
    tags: [],
    icon: "file-clock",
    color: "blue",
  },
};

export async function getAllPosts(): Promise<Post[]> {
  const postFiles = await Array.fromAsync(
    fs.glob("**/content.mdx", { cwd: "blog/" }),
  );

  return (
    await Promise.all(
      postFiles.map(async (name) => {
        return {
          link: `/blog/${name.split("/").at(0)!}`,
          metadata: (await import(`@/blog/${name}`)).metadata as PostMetadata,
        };
      }),
    )
  ).toSorted((a, b) => a.metadata.date.valueOf() - b.metadata.date.valueOf());
}
