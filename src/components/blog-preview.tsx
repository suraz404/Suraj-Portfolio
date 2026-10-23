import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/blog";

/** The latest few posts, shown on the home page. */
export function BlogPreview() {
  const posts = getPosts().slice(0, 3);

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-[17px] text-muted">The first posts are on their way.</p>
      ) : (
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/blog"
        className="group mt-12 inline-flex h-11 items-center gap-2 rounded-lg border border-line px-5 text-[15px] font-medium transition-colors hover:border-fg/30 hover:bg-surface"
      >
        Read all posts
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
