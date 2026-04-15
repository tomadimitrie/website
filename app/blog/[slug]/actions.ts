"use server";

import { useMDXComponents } from "@/mdx-components";
import crypto from "crypto";
import fs from "fs/promises";
import { evaluate } from "next-mdx-remote-client/rsc";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import React from "react";
import RehypePrettyCode from "rehype-pretty-code";
import { PostMetadata } from "../mdx";

export async function decryptPost(
  slug: string,
  _prevState: any,
  formData: FormData,
) {
  "use server";

  const password = formData.get("password") as string | null;
  if (!password) {
    return {
      error: "Empty password",
    };
  }

  if ((await tryDecryptPost(slug, password)) === null) {
    return {
      error: "Incorrect password",
    };
  }

  const cookieJar = await cookies();
  cookieJar.set(`auth-${slug}`, password, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath(`/blog/${slug}`);

  return {
    error: null,
  };
}

export async function tryDecryptPost(
  slug: string,
  password: string,
): Promise<Buffer | null> {
  const key = crypto.createHash("sha256").update(password).digest();
  const path = `blog/${slug}/content.enc`;
  const encryptedFull = await fs.readFile(path);

  const tag = encryptedFull.subarray(0, 16);
  const iv = encryptedFull.subarray(16, 32);
  const encrypted = encryptedFull.subarray(32);

  const cipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  cipher.setAuthTag(tag);
  try {
    return Buffer.concat([cipher.update(encrypted), cipher.final()]);
  } catch {
    return null;
  }
}

export async function renderDecryptedPost(decrypted: Buffer): Promise<{
  Component: () => React.ReactNode;
  metadata: PostMetadata;
}> {
  const {
    content,
    mod: { metadata },
  } = await evaluate({
    source: decrypted,
    components: useMDXComponents(),
    options: {
      mdxOptions: {
        baseUrl: import.meta.url,
        rehypePlugins: [[RehypePrettyCode, { theme: "catppuccin-mocha" }]],
      },
    },
  });

  return { Component: () => content, metadata: metadata as PostMetadata };
}
