import type { Metadata } from "next";

import { BlogShell } from "@/components/blog-shell";
import { PostCard } from "@/components/post-card";
import { profile } from "@/content/profile";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes by ${profile.name} on building full-stack web apps with React, Next.js, Node.js and PostgreSQL.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <BlogShell back={{ href: "/", label: "Home" }} wide>
      <h1 className="mt-10 font-serif text-5xl tracking-[0.04em] uppercase sm:text-6xl">Blog</h1>
      <p className="mt-4 text-[17px] text-muted">Notes from what I’m building and learning.</p>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">The first posts are on their way.</p>
      ) : (
        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <PostCard post={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </BlogShell>
  );
}
