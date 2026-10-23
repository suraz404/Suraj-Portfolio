# Suraj Agrahari — Portfolio

A single-page portfolio built with Next.js (App Router), TypeScript and Tailwind CSS v4.
Content lives in local data files, so there is no database or CMS. The whole site is
rendered statically at build time.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (Next.js core-web-vitals + TypeScript rules)
npm run typecheck  # tsc --noEmit
```

## Edit the content

Content is kept separate from the components. To update the site, change these files:

| File | What it controls |
| --- | --- |
| `src/content/profile.ts` | Name, headline, intro, photo, About text, **tech stack**, **experience**, **education**, and **contact links** |
| `src/content/projects.ts` | The projects in the horizontal Work row |
| `content/blog/*.md` | **Blog posts** (one Markdown file per post) |
| `src/lib/site.ts` | Page title, meta description, and section order |

### Writing a blog post

The quickest way:

```bash
npm run new-post "What I learned building my first API"
```

That creates `content/blog/what-i-learned-building-my-first-api.md` with today's date, as a draft.
Write in Markdown, then change `draft: true` to `draft: false` to publish. (Or copy `content/blog/_template.md`.)

**Photos**

- **Cover photo:** put an image in `public/blog/` with the same name as the post, e.g.
  `public/blog/what-i-learned-building-my-first-api.jpg` (`.png`, `.webp` and `.avif` also work). It is
  used automatically in the blog lists, at the top of the post, and as the link preview. You can also set
  `cover: /blog/any-name.jpg` in the post header.
- **Photos inside a post:** put them in `public/blog/` and write
  `![What the photo shows](/blog/photo.jpg "Optional caption")`. A title in quotes becomes a caption.

Each post's header looks like this:

```md
---
title: My post title
description: One sentence for lists, search results and link previews.
date: 2026-10-20
tags: nextjs, postgres
draft: false
---
```

Posts appear on the home page (latest three), on `/blog`, in `/rss.xml` and in the sitemap automatically.
Drafts only show in `npm run dev`.

### Before you publish

1. **Photos.** `public/images/suraj-portrait.jpg` is the hero photo and the link-preview image, and
   `public/images/suraj-avatar.jpg` is the small round photo in the sidebar. Replace them to change the
   photo. If you reuse a file name, clear `.next/cache/images` so the old version isn't served.
2. **Contact links.** GitHub, LinkedIn, X and email are set in `profile.ts` under `contact`.
   Set any of them to `null` to hide it.
3. **Projects.** Bigawa, DevHub and W-Store live in `projects.ts`. Covers are in `public/projects/`
   (DevHub and W-Store are screenshots of the live sites in a browser frame). When Bigawa has a live
   link or repo, add it under `links` and swap in a real screenshot.
4. **Site URL.** Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your production domain.
   It is used for canonical URLs, the sitemap, RSS, structured data and Open Graph tags.
5. **Search indexing.** After deploying to your real domain, verify ownership in Google Search Console
   and Bing Webmaster Tools, then submit `https://surajagrahari.runs-on.dev/sitemap.xml`. Keep page titles,
   descriptions, and blog post summaries specific and accurate; metadata cannot replace useful content.

## Deploy

### Vercel (simplest)

1. Push this folder to a GitHub repository.
2. Import the repository at vercel.com/new. The framework is detected automatically.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL=https://surajagrahari.runs-on.dev`.
4. Deploy. Later pushes to `main` redeploy automatically.

### Any Node host

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://surajagrahari.runs-on.dev npm run build
npm start          # serves on PORT (default 3000)
```

## How it is put together

```
src/
  app/            layout (fonts, metadata, JSON-LD, theme script), page, OG image, robots, sitemap
  components/     one file per section, plus the shared pieces
  content/        all editable content and its types
  lib/            site config and a class-name helper
```

- **Sidebar** (`components/site-nav.tsx`): your photo and name, local time, the section index, social
  links and the theme button. A small robot (`components/robot.tsx`) floats beside the index and glides to
  the section you're reading or hovering. Click it to say hi. At the bottom, a small animated drawing
  (`components/coder.tsx`) shows me coding and sipping coffee.
- **Mobile menu**: a button at the top right opens a panel from the right edge.
- **Pull cord** (`components/pull-cord.tsx`): hangs from the top right. Drag it down and let go, click it,
  or press Enter/Space on it to switch light and dark, with a click sound made by the Web Audio API. A
  "pull this" hint shows until the first pull.
- **Hero** (`components/hero.tsx`): name, intro, a framed portrait, and a short fact strip.
- **Work** (`components/project-rail.tsx`): a horizontal, snap-scrolling row of project cards.
- **Blog** (`src/lib/blog.ts`, `src/app/blog/`): Markdown posts rendered at build time with `marked`.
- **Cursor** (`components/cursor.tsx`): an arrow that follows the pointer on a spring and turns to face the
  direction of travel. It is disabled on touch devices and for visitors who prefer reduced motion.
- **SEO**: per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards (with your photo),
  JSON-LD (`Person`, `WebSite`, `BlogPosting`), `sitemap.xml`, `robots.txt` and an RSS feed.
- **Colours**: light/dark tokens in `app/globals.css`. The theme choice is saved in `localStorage` and
  falls back to the system preference.
- **Accessibility**: skip link, semantic landmarks, a labelled scroll region for projects,
  visible focus rings, and support for reduced motion.
