"use client";

import React from "react";
import { cn, tailwindColor } from "@/lib/utils";
import { useHover } from "@/hooks/useHover";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import { Post } from "@/app/blog/mdx";

export function FeaturedPostCard({
  post,
  className,
  style,
}: {
  post: Post;
  className?: string;
  style?: React.CSSProperties;
}) {
  const accent = tailwindColor(post.metadata.color, 500);
  const background = tailwindColor(post.metadata.color, 700, 30);

  const hover = useHover({
    borderColor: accent,
  });

  return (
    <div
      className={cn(
        "relative group flex flex-col items-start p-7 backdrop-blur-md rounded-md gap-5 border transition-all duration-300 shadow overflow-hidden border-muted hover:cursor-pointer",
        className,
      )}
      {...hover.props}
      style={{
        ...style,
        ...hover.props.style,
      }}
    >
      <div
        className="absolute top-0 left-0 w-0 group-hover:w-full h-1 transition-all duration-300"
        style={{
          backgroundColor: accent,
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom right, ${tailwindColor(post.metadata.color, 950, 75)}, black)`,
        }}
      />
      <div
        className="flex items-center justify-between w-full"
        style={{
          color: accent,
        }}
      >
        <div
          className="p-4 rounded-sm"
          style={{
            backgroundColor: background,
          }}
        >
          <DynamicIcon
            name={post.metadata.icon}
            style={{
              color: accent,
            }}
          />
        </div>
        <ArrowRightIcon className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
      <div className="flex gap-5">
        {post.metadata.tags.map((tag) => (
          <TagItem key={tag} tag={tag} color={post.metadata.color} />
        ))}
      </div>
      <Link
        href={post.link}
        className="text-2xl line-clamp-2 transition-all duration-300 after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0"
        style={
          hover.isHovered
            ? {
                color: accent,
              }
            : {}
        }
      >
        {post.metadata.title}
      </Link>
      <div className="text-xl text-muted-foreground line-clamp-3">
        {post.metadata.description}
      </div>
      <div className="inline-flex gap-3 items-center mt-auto text-muted-foreground">
        <CalendarIcon size={20} />
        {post.metadata.date.toDateString()}
      </div>
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  const accent = tailwindColor(post.metadata.color, 500);
  const background = tailwindColor(post.metadata.color, 700, 30);

  const hover = useHover({
    borderColor: accent,
  });

  return (
    <div
      className="relative group w-full flex items-center gap-5 backdrop-blur-md p-5 border border-muted rounded-md hover:cursor-pointer transition-all duration-300 overflow-hidden"
      {...hover.props}
      style={{
        ...hover.props.style,
      }}
    >
      <div
        className="absolute bottom-0 left-0 h-0 group-hover:h-full w-1 transition-all duration-300"
        style={{
          backgroundColor: accent,
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, ${tailwindColor(post.metadata.color, 950)}, black)`,
        }}
      />
      <div
        className="p-4 rounded-sm"
        style={{
          backgroundColor: background,
        }}
      >
        <DynamicIcon
          name={post.metadata.icon}
          style={{
            color: accent,
          }}
        />
      </div>
      <div className="flex-1">
        <Link
          href={post.link}
          className="line-clamp-1 transition-all duration-300 after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0"
          style={
            hover.isHovered
              ? {
                  color: accent,
                }
              : {}
          }
        >
          {post.metadata.title}
        </Link>
        <div className="text-muted-foreground line-clamp-1">
          {post.metadata.description}
        </div>
        <div className="lg:hidden flex gap-5 flex-wrap mt-3">
          {post.metadata.tags.map((tag) => (
            <TagItem key={tag} tag={tag} color={post.metadata.color} />
          ))}
        </div>
        <div className="lg:hidden inline-flex gap-3 items-center text-muted-foreground mt-3">
          <CalendarIcon size={20} />
          {post.metadata.date.toDateString()}
        </div>
      </div>
      <div className="hidden lg:flex gap-5 flex-wrap max-w-1/4">
        {post.metadata.tags.map((tag) => (
          <TagItem key={tag} tag={tag} color={post.metadata.color} />
        ))}
      </div>
      <div className="hidden lg:inline-flex gap-3 items-center text-muted-foreground text-right w-30">
        {post.metadata.date.toDateString()}
        <CalendarIcon size={20} />
      </div>
      <ArrowRightIcon
        className="max-w-0 group-hover:max-w-10 transition-all duration-300"
        style={{
          color: accent,
        }}
      />
    </div>
  );
}

export function TagItem({ tag, color }: { tag: string; color: string }) {
  const accent = tailwindColor(color, 500);
  const background = tailwindColor(color, 700, 30);
  const hovered = tailwindColor(color, 300);

  const hover = useHover({
    color: hovered,
    backgroundColor: accent,
  });

  return (
    <Link
      key={tag}
      className="grow text-center font-mono font-bold px-3 py-0.5 border rounded-sm z-2"
      {...hover.props}
      style={{
        ...{
          color: accent,
          backgroundColor: background,
          borderColor: accent,
        },
        ...hover.props.style,
      }}
      href={`/blog/tag/${tag}`}
    >
      {tag}
    </Link>
  );
}
