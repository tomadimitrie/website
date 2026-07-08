import crypto from "node:crypto";
import fs from "node:fs/promises";
// @ts-expect-error
import passwords from "./posts-passwords.json" with { type: "json" };

async function processImages(slug: string, content: string): Promise<string> {
  const lines = content.split("\n");

  await fs.mkdir(`blog/${slug}/assets`, { recursive: true });

  const imports = ["", `import Image from "next/image"`];
  const alts: string[] = [];

  for (const [index, line] of lines.entries()) {
    if (!line.startsWith("![")) {
      continue;
    }
    const regex = /!\[([^\]]+)\]\(([^)]+)\)/;
    // biome-ignore lint/style/noNonNullAssertion: never null
    const [, alt, encoded] = line.match(regex)!;
    let newAlt = alt;
    let altIndex = 2;
    while (alts.includes(newAlt)) {
      newAlt = `${alt} ${altIndex}`;
      altIndex += 1;
    }
    alts.push(newAlt);
    const decoded = Buffer.from(
      encoded.replace("data:image/png;base64,", ""),
      "base64",
    );
    const filename = `${newAlt
      .replaceAll(" ", "_")
      .replace(/[^a-zA-Z0-9_]/g, "")
      .toLowerCase()}.png`;
    const importedName = newAlt
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.substring(1).toLowerCase(),
      )
      .join("");
    lines[index] = `<Image src={${importedName}} alt="${alt}" />`;
    await fs.writeFile(`blog/${slug}/assets/${filename}`, decoded);
    imports.push(`import ${importedName} from "./assets/${filename}";`);
  }

  const importsIndex =
    // biome-ignore lint/style/noNonNullAssertion: never null
    lines
      .map((line, index) => [line, index] as const)
      .find(([line, _]) => line.trim() === "}")![1] + 1;

  return lines.toSpliced(importsIndex, 0, ...imports).join("\n");
}

async function main() {
  const postFiles = await Array.fromAsync(fs.glob("blog/**/content.enc"));
  for (const path of postFiles) {
    const [, slug] = path.split("/");
    const newSlug = slug.replace("--private", "");
    const password = (passwords as { [key: string]: string })[newSlug];
    const key = crypto.createHash("sha256").update(password).digest();

    const encryptedFull = await fs.readFile(path);
    const tag = encryptedFull.subarray(0, 16);
    const iv = encryptedFull.subarray(16, 32);
    const encrypted = encryptedFull.subarray(32);

    const cipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    cipher.setAuthTag(tag);

    await fs.mkdir(`blog/${newSlug}`, { recursive: true });

    const decrypted = await processImages(
      newSlug,
      Buffer.concat([cipher.update(encrypted), cipher.final()]).toString(),
    );

    await fs.writeFile(`blog/${newSlug}/content.mdx`, decrypted);
  }
}

main();
