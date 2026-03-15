import { notFound } from "next/navigation";
import { PostMetadata } from "@/app/blog/mdx";
import { TagItem } from "@/app/blog/page-client";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let Component;
  let metadata: PostMetadata;
  try {
    ({ default: Component, metadata } = await import(`@/blog/${slug}.mdx`));

    return (
      <div className="flex flex-col gap-5">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary-foreground hover:underline"
        >
          <ArrowLeftIcon /> Back to Blog
        </Link>
        <div className="flex gap-3 w-min">
          {metadata.tags.map((tag) => (
            <TagItem key={tag} tag={tag} color={metadata.color} />
          ))}
        </div>
        <div className="text-4xl">{metadata.title}</div>
        <div className="text-2xl text-muted-foreground">
          {metadata.description}
        </div>
        <div className="inline-flex gap-3 items-center text-muted-foreground">
          <CalendarIcon size={20} />
          {metadata.date.toDateString()}
        </div>
        <div className="w-full h-0.5 bg-muted" />
        <div className="mt-5">
          <Component />
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
