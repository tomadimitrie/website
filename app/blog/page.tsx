import { TerminalIcon } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { SectionTitle } from "@/components/sections/section";
import React from "react";
import { FeaturedPostCard, PostCard } from "@/app/blog/page-client";
import { dummyPost, getAllPosts, Post } from "@/app/blog/mdx";

export default async function BlogPage() {
  const posts = await getAllPosts();

  function findFeaturedPost(index: number): Post {
    return posts.find((post) => post.metadata.featured === index) ?? dummyPost;
  }
  const featuredPosts = posts
    .filter((post) => post.metadata.featured !== undefined)
    .toSorted((a, b) => a.metadata.featured! - b.metadata.featured!);

  return (
    <div className="w-full flex flex-col gap-10 items-start">
      <div className="inline-flex self-center items-center gap-2 text-muted-foreground font-mono border border-muted px-2 py-1 rounded-md">
        <TerminalIcon className="w-5 h-5 text-primary-foreground" />
        cat /var/log/research/*
      </div>
      <div className="flex flex-col items-center gap-5 text-center w-full">
        <div className="text-5xl">Blog</div>
        <div className="text-muted-foreground text-2xl max-w-3xl">
          {CONFIG.blog.subtitle}
        </div>
      </div>
      <div>
        <SectionTitle title="Featured" />
        <div
          className="grid-cols-[2fr_1fr_1fr] gap-5 hidden lg:grid"
          style={{
            gridTemplateAreas:
              "'left top-right top-right' 'left bottom-right-1 bottom-right-2'",
          }}
        >
          <FeaturedPostCard
            post={findFeaturedPost(0)}
            style={{
              gridArea: "left",
            }}
          />
          <FeaturedPostCard
            post={findFeaturedPost(1)}
            style={{
              gridArea: "top-right",
            }}
          />
          <FeaturedPostCard
            post={findFeaturedPost(2)}
            style={{
              gridArea: "bottom-right-1",
            }}
          />
          <FeaturedPostCard
            post={findFeaturedPost(3)}
            style={{
              gridArea: "bottom-right-2",
            }}
          />
        </div>
        <div className="lg:hidden flex flex-col gap-5">
          {featuredPosts.map((post) => (
            <FeaturedPostCard key={post.metadata.title} post={post} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <SectionTitle title="All Posts" />
        <div className="w-full flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard key={post.metadata.title} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
