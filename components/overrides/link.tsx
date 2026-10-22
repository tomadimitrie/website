import { ExternalLink } from "lucide-react";
import NextLink from "next/link";
import type { ComponentProps } from "react";

export default function Link({
  href,
  children,
  className = "",
  noIcon = false,
  ...rest
}: ComponentProps<typeof NextLink> & { noIcon?: boolean }) {
  const isExternal = /^https?:\/\//.test(href.toString());

  return (
    <NextLink
      href={href}
      className={`inline-block flex items-center gap-2 hover:underline ${className}`}
      {...(isExternal && { target: "_blank" })}
      {...rest}
    >
      {children}
      {isExternal && !noIcon && (
        <ExternalLink size={20} className="inline-block ml-2 mb-1 shrink-0" />
      )}
    </NextLink>
  );
}
