import crypto from "node:crypto";
import fs from "node:fs/promises";
// @ts-expect-error
import passwords from "./posts-passwords.json" with { type: "json" };

async function processImages(slug: string, content: string): Promise<string> {
  let lines = content
    .split("\n")
    .filter((line) => !line.startsWith('import Image from "next/image"'));
  lines.push("");
  const images: Record<string, string> = {};
  for (const line of lines.filter((line) => line.startsWith("import"))) {
    const regex = /import\s+(\S+)\s+from\s+['"](\S+)['"]/;
    // biome-ignore lint/style/noNonNullAssertion: never null
    const [, name, path] = line.match(regex)!;
    const content = await fs.readFile(`blog/${slug}/${path}`, {
      encoding: "base64",
    });
    images[name] = content;
  }
  for (const [index, line] of lines.entries()) {
    if (!line.startsWith("<Image")) {
      continue;
    }
    const regex = /<Image\s+src=\{(\S+)\}\s+alt="([^"]+)"/;
    // biome-ignore lint/style/noNonNullAssertion: never null
    const [, name, alt] = line.match(regex)!;
    lines[index] = `![${alt}](data:image/png;base64,${images[name]})`;
  }
  lines = lines.filter((line) => !line.startsWith("import"));
  return lines.join("\n");
}

async function main() {
  const postFiles = await Array.fromAsync(
    fs.glob("blog/**/content_decrypted.mdx"),
  );
  for (const path of postFiles) {
    const [, slug] = path.split("/");
    const password = (passwords as { [key: string]: string })[
      slug.replace("--private", "")
    ];
    const iv = crypto.randomBytes(16);
    const key = crypto.createHash("sha256").update(password).digest();

    const decrypted = await fs
      .readFile(path, { encoding: "utf-8" })
      .then((content) => processImages(slug, content));
    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      Buffer.from(key),
      Buffer.from(iv),
    );
    const encrypted = Buffer.concat([
      cipher.update(decrypted, "utf-8"),
      cipher.final(),
    ]);
    await fs.writeFile(
      path.replace("_decrypted", "").replace(".mdx", ".enc"),
      Buffer.concat([cipher.getAuthTag(), iv, encrypted]),
    );
  }
}

main();
