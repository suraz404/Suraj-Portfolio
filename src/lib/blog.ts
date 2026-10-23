import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { marked } from "marked";

/**
 * Blog posts are Markdown files in /content/blog. Each starts with a small header:
 *
 *   ---
 *   title: My first post
 *   description: One sentence that shows up in lists and search results.
 *   date: 2026-10-16
 *   tags: nextjs, postgres
 *   cover: /blog/my-first-post.jpg   (optional)
 *   draft: false
 *   ---
 *
 * The file name (without .md) becomes the URL: /blog/<file-name>.
 *
 * Cover photo: either set `cover:` above, or simply drop an image with the same
 * name as the post into /public/blog (e.g. public/blog/my-first-post.jpg).
 * Photos inside a post use normal Markdown: ![What the photo shows](/blog/photo.jpg "Optional caption")
 * Files starting with "_" (like _template.md) are ignored.
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  /** Cover image path inside /public, if the post has one. */
  cover?: string;
  html: string;
};

const DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC = path.join(process.cwd(), "public");
const COVER_TYPES = ["jpg", "jpeg", "png", "webp", "avif"];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Photos in posts load lazily, and a Markdown image title becomes a caption.
marked.use({
  renderer: {
    image({ href, title, text }) {
      const img = `<img src="${esc(href)}" alt="${esc(text)}" loading="lazy" decoding="async">`;
      return title ? `<figure>${img}<figcaption>${esc(title)}</figcaption></figure>` : img;
    },
  },
});

function findCover(slug: string, declared?: string) {
  if (declared) return declared.startsWith("/") ? declared : `/${declared}`;
  const ext = COVER_TYPES.find((e) => existsSync(path.join(PUBLIC, "blog", `${slug}.${e}`)));
  return ext ? `/blog/${slug}.${ext}` : undefined;
}

function parse(file: string): Post & { draft: boolean } {
  const raw = readFileSync(path.join(DIR, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  const body = match ? match[2] : raw;
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  const slug = file.replace(/\.md$/, "");
  return {
    slug,
    cover: findCover(slug, meta.cover),
    title: meta.title ?? file,
    description: meta.description ?? "",
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html: marked.parse(body, { async: false }) as string,
    draft: meta.draft === "true",
  };
}

/** Published posts, newest first. Drafts only show up in development. */
export function getPosts(): Post[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  } catch {
    return [];
  }
  return files
    .map(parse)
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
