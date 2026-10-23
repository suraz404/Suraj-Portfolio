import Image from "next/image";
import Link from "next/link";

import { formatDate, type Post } from "@/lib/blog";

/** A blog post with its cover photo, date and summary. */
export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface ring-1 ring-line">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        ) : (
          // No photo yet: a quiet typographic cover.
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:14px_14px] p-6">
            <span className="text-center font-serif text-2xl leading-tight text-balance text-muted italic">{post.title}</span>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
      </p>
      <h3 className="mt-1.5 font-serif text-2xl leading-snug transition-colors group-hover:text-signal">{post.title}</h3>
      {post.description ? <p className="mt-1.5 text-[15px] leading-relaxed text-muted text-pretty">{post.description}</p> : null}
    </Link>
  );
}
