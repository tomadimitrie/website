"use client";

import { LoaderIcon, LockIcon, LogInIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import { decryptPost } from "./actions";

export function PasswordForm({ slug }: { slug: string }) {
  const decryptPostWithSlug = decryptPost.bind(null, slug);

  const [state, formAction, pending] = useActionState(decryptPostWithSlug, {
    error: null,
  } as {
    error: string | null;
  });

  return (
    <>
      <div className="flex items-center gap-5">
        <LockIcon size={50} />
        <div className="text-3xl text-primary-foreground">
          This post is password protected
        </div>
      </div>
      <form className="flex flex-col gap-5" action={formAction}>
        <input
          className={cn(
            "w-full px-5 py-3 border rounded-lg",
            state.error ? "border-destructive" : "border-primary-foreground",
          )}
          name="password"
          placeholder="Password"
        />
        {state.error && (
          <div className="text-destructive text-xl">{state.error}</div>
        )}
        <Button className="text-xl h-12" disabled={pending}>
          {pending ? <LoaderIcon /> : <LogInIcon />} Access
        </Button>
      </form>
    </>
  );
}

export function TableOfContents() {
  type Node = { children: Node[]; heading: Element };

  const [nodes, setNodes] = useState<Node[]>([]);

  function Item({ item, depth }: { item: Node; depth: number }) {
    return (
      <li className="list-none">
        <a
          className="text-xl text-muted-foreground hover:text-primary-foreground hover:underline"
          href={`#${item.heading.id}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: safe, comes from validated files
          dangerouslySetInnerHTML={{
            __html: item.heading.innerHTML,
          }}
        />

        {item.children.length > 0 && (
          <ul>
            {item.children.map((child, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: always same order, cannot use item itself since we don't know if there are duplicates
              <Item key={index} item={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  useEffect(() => {
    const headings = document.querySelectorAll("h1, h2, h3");

    const root: Node = { heading: document.documentElement, children: [] };
    const stack: Node[] = [root];

    for (const heading of headings) {
      const level = parseInt(heading.tagName.substring(1), 10);
      const node = {
        heading,
        children: [],
      };

      while (stack.length > level) {
        stack.pop();
      }

      stack[stack.length - 1].children.push(node);
      stack.push(node);
    }

    setNodes(root.children);
  }, []);

  return (
    <ul>
      {nodes.map((node, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: always same order, cannot use item itself since we don't know if there are duplicates
        <Item key={index} item={node} depth={1} />
      ))}
    </ul>
  );
}
