// Creates a new blog post: npm run new-post "My post title"
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Give the post a title, e.g.  npm run new-post "What I learned building my API"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-");
const date = new Date().toISOString().slice(0, 10);
const file = path.join("content", "blog", `${slug}.md`);

if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

writeFileSync(
  file,
  `---
title: ${title}
description: One sentence about this post.
date: ${date}
tags:
draft: true
---

Start writing here.

<!-- Photos: put them in public/blog/ and add them like this:
![What the photo shows](/blog/your-photo.jpg "Optional caption")

Cover photo: name an image public/blog/${slug}.jpg and it is used automatically. -->
`,
);

console.log(`Created ${file}`);
console.log(`Cover photo (optional): public/blog/${slug}.jpg`);
console.log("It's a draft: visible in npm run dev only. Set draft: false to publish.");
