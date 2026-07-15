import fs from "node:fs/promises";
import path from "node:path";
import pick from "lodash/pick";
import Link from "next/link";
import nunjucks from "nunjucks";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { cvssInfo } from "@/components/sections/cves";
import { CONFIG } from "@/lib/config";

class SkipSanitizationWrapper<T extends JsonValue> {
  constructor(public inner: T) {}
}
type Primitive =
  string | number | boolean | SkipSanitizationWrapper<Primitive> | JsxWrapper;
type JsonValue = Primitive | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

class JsxWrapper {
  constructor(public nodes: JsonValue[]) {}

  toString(): string {
    return this.nodes.join("");
  }
}

function jsxToStatic(element: React.ReactNode): JsonValue {
  if (typeof element === "string" || typeof element === "number") {
    return String(element);
  }
  if (Array.isArray(element)) {
    return new JsxWrapper(element.map(jsxToStatic));
  }

  if (!React.isValidElement(element)) {
    throw new TypeError("invalid React element");
  }

  const { type, props } = element as React.ReactElement<{
    children?: React.ReactNode;
  }>;
  const children = props.children ? jsxToStatic(props.children) : "";

  // types which enforce sanitization
  switch (type) {
    case React.Fragment:
      return children;
  }

  // types which do not enforce sanitization (e.g. they contain LaTeX commands)
  const result = (() => {
    switch (type) {
      case "a":
      case Link: {
        const {
          props: { href },
        } = element as React.ReactElement<{ href: string }>;
        return `\\itemcustomlink{${href}}{${children}}`;
      }
      case "b":
        return `\\textbf{${sanitize(children)}}`;
      case "span": {
        const {
          props: { className },
        } = element as React.ReactElement<{ className: string }>;
        switch (className) {
          case "font-mono":
            return `\\texttt{${sanitize(children)}}`;
          default:
            return `${sanitize(children)}`;
        }
      }
    }
  })();

  if (!result) {
    return renderToStaticMarkup(element);
  }

  return new SkipSanitizationWrapper(result);
}

function escapeText(data: string | SkipSanitizationWrapper<string>): string {
  if (data instanceof SkipSanitizationWrapper) {
    return data.inner;
  }
  const escapeMap: Record<string, string> = {
    "\\": "\\textbackslash{}",
    "&": "\\&",
    "%": "\\%",
    $: "\\$",
    "#": "\\#",
    _: "\\_",
    "{": "\\{",
    "}": "\\}",
    "~": "\\textasciitilde{}",
    "^": "\\textasciicircum{}",
  };
  return data.replace(/[\\&%$#_{}~^]/g, (match) => escapeMap[match] ?? match);
}

function sanitize(data: string, skipSanitization?: boolean): string;
function sanitize<T extends Primitive>(data: T, skipSanitization?: boolean): T;
function sanitize<T extends JsonValue>(
  data: T[],
  skipSanitization?: boolean,
): T;
function sanitize<T extends Record<string, JsonValue>>(
  data: T,
  skipSanitization?: boolean,
): { [K in keyof T]: T[K] };
function sanitize(data: JsonValue, skipSanitization?: boolean): JsonValue;

function sanitize(
  data: JsonValue,
  skipSanitization: boolean = false,
): JsonValue {
  if (data instanceof SkipSanitizationWrapper) {
    return sanitize(data.inner, true);
  }

  if (data instanceof JsxWrapper) {
    return data.nodes.map((item) => sanitize(item, skipSanitization)).join("");
  }

  const performEscaping = skipSanitization
    ? (data: Parameters<typeof escapeText>[0]) => data
    : escapeText;

  if (Array.isArray(data)) {
    return data.map((item) => sanitize(item, skipSanitization));
  } else if (typeof data === "object" && data !== null) {
    const sanitized: Record<string, JsonValue> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitize(value, skipSanitization);
    }
    return sanitized;
  } else if (typeof data === "number") {
    return data;
  } else if (typeof data === "string") {
    return performEscaping(data);
  } else {
    throw new TypeError(`invalid type for sanitization ${data}`);
  }
}

function selectFields(config: typeof CONFIG): Record<string, JsonValue> {
  const literalFields = ["name", "subtitle", "about"] as const;
  const result: Record<string, JsonValue> = pick(config, literalFields);

  result.socials = Object.fromEntries(
    Object.entries(config.socials).map(([social, data]) => [
      social,
      data.handle,
    ]),
  );

  result.cves = config.sections.cves.items.map((cve) => ({
    url: cve.url,
    cve: cve.cve,
    title: cve.title,
    cvss: cve.cvss,
    features: cve.features.map(jsxToStatic),
    severity: cvssInfo(cve.cvss)[0],
  }));

  result.certifications = config.sections.certifications.items.map(
    (certification) => ({
      title: certification.title,
      fullTitle: certification.fullTitle,
      url: certification.url,
    }),
  );

  result.skills = config.sections.skills.items;

  result.education = config.sections.education.items.map((item) => ({
    university: item.university,
    type: item.type,
    domain: item.domain,
    from: item.from,
    to: item.to,
    features: item.features.map(jsxToStatic),
  }));

  result.experience = config.sections.experience.items.map((item) => ({
    from: item.from,
    to: item.to,
    position: item.position,
    company: item.company,
    location: item.location,
    features: item.features.map(jsxToStatic),
    tags: item.tags,
  }));

  result.achievements = config.sections.achievements.items.map((item) => ({
    title: item.title,
    subtitle: jsxToStatic(item.subtitle),
  }));

  result.projects = config.sections.projects.items.map((item) => ({
    title: item.title,
    shortDescription: item.shortDescription,
    description: item.description,
    features: item.features,
    url: !item.source?.comingSoon ? (item.source?.link ?? "") : "",
  }));

  return result;
}

async function main() {
  const env = nunjucks.configure({
    autoescape: false,
    tags: {
      blockStart: "((*",
      blockEnd: "*))",
      variableStart: "((",
      variableEnd: "))",
      commentStart: "((=",
      commentEnd: "=))",
    },
    throwOnUndefined: true,
  });
  const rendered = env.render(
    path.join(__dirname, "./tex_template/cv.tex"),
    sanitize(selectFields(CONFIG)),
  );
  const outDir = "./cv/build";

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "cv_rendered.tex"), rendered);
  await fs.copyFile(
    "./cv/tex_template/altacv.cls",
    path.join(outDir, "altacv.cls"),
  );

  console.log(`Written build files to ${path.resolve(outDir)}`);
  console.log("Build files:");
  const files = await fs.readdir(outDir);
  for (const file of files) {
    console.log(`\t ${file}`);
  }
}

main();
