import { PostMetadata } from "@/app/blog/mdx";
import { PostIcon, TagItem } from "@/app/blog/page-client";
import fs from "fs/promises";
import fsOrig from "fs";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { renderDecryptedPost, tryDecryptPost } from "./actions";
import { PasswordForm, TableOfContents } from "./page-client";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  function Base({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col gap-5">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary-foreground hover:underline"
        >
          <ArrowLeftIcon /> Back to Blog
        </Link>
        {children}
      </div>
    );
  }

  function renderPost(
    Component: () => React.ReactNode,
    metadata: PostMetadata,
  ) {
    return (
      <Base>
        <div className="flex gap-3 w-min">
          {metadata.tags.map((tag) => (
            <TagItem key={tag} tag={tag} color={metadata.color} />
          ))}
        </div>
        <div className="flex items-center gap-5">
          <PostIcon name={metadata.icon} color={metadata.color} type="static" />
          <div className="text-4xl">{metadata.title}</div>
        </div>
        <div className="text-2xl text-muted-foreground">
          {metadata.description}
        </div>
        <div className="inline-flex gap-3 items-center text-muted-foreground">
          <CalendarIcon size={20} />
          {metadata.date.toDateString()}
        </div>
        <div className="w-full h-0.5 bg-muted" />
        <TableOfContents />
        <div className="w-full h-0.5 bg-muted" />
        <div className="flex flex-col gap-3 items-start text-xl text-muted-foreground [&>img]:self-center text-justify">
          <Component />
        </div>
      </Base>
    );
  }

  function renderPasswordPrompt() {
    return (
      <Base>
        <PasswordForm slug={slug} />
      </Base>
    );
  }

  if (slug.endsWith("--private")) {
    const path = `blog/${slug}/content.enc`;
    try {
      await fs.access(path, fs.constants.F_OK);
    } catch {
      return notFound();
    }

    const cookieJar = await cookies();
    const password = cookieJar.get(`auth-${slug}`);
    if (!password) {
      return renderPasswordPrompt();
    }

    const decrypted = await tryDecryptPost(slug, password.value);
    if (decrypted === null) {
      return renderPasswordPrompt();
    }

    const result = await renderDecryptedPost(decrypted);

    return renderPost(result.Component, result.metadata);
  } else {
    let path = `@/blog/${slug}/content.mdx`;
    try {
      await fs.access(path.substring(2));
    } catch {
      const postFiles = await Array.fromAsync(fs.glob("blog/**/content.mdx"));
      for (const postFile of postFiles) {
        const chunks = [];
        for await (const chunk of fsOrig.createReadStream(postFile, {
          start: 0,
          end: 500,
        })) {
          chunks.push(chunk);
        }
        const content = Buffer.concat(chunks).toString();
        const idLine = content
          .split("\n")
          .find((line) => line.trim().startsWith("id: "));
        if (!idLine) {
          continue;
        }
        const regex = /\s+id:\s+"([^"]+)"/;
        const [, id] = idLine.match(regex)!;
        if (id === slug) {
          return redirect(`/blog/${postFile.split("/")[1]}`);
        }
      }
    }
    try {
      const { default: Component, metadata } = await import(path);
      return renderPost(Component, metadata);
    } catch {
      return notFound();
    }
  }
}
