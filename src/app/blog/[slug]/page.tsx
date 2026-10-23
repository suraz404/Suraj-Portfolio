import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog-shell";
import { profile } from "@/content/profile";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description || `Read ${post.title} by ${profile.name}.`,
      ...(post.date ? { publishedTime: post.date } : {}),
      authors: [profile.name],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || `Read ${post.title} by ${profile.name}.`,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || `Read ${post.title} by ${profile.name}.`,
    ...(post.date ? { datePublished: post.date } : {}),
    keywords: post.tags.join(", "),
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    publisher: { "@type": "Person", name: profile.name, url: siteUrl },
    inLanguage: "en",
    ...(post.cover ? { image: `${siteUrl}${post.cover}` } : {}),
  };

  return (
    <BlogShell back={{ href: "/blog", label: "All posts" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article className="mt-10">
        <header>
          <p className="text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-balance sm:text-5xl">{post.title}</h1>
          {post.description ? <p className="mt-4 text-lg text-muted text-pretty">{post.description}</p> : null}
          {post.tags.length ? (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </header>
        {post.cover ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-xl bg-surface ring-1 ring-line">
            <Image src={post.cover} alt={`Cover image for ${post.title}`} fill priority sizes="(min-width: 768px) 672px, 100vw" className="object-cover" />
          </div>
        ) : null}
        {/* Posts are Markdown files from this repository, so the HTML is trusted. */}
        <div className="article mt-10 border-t border-line pt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </BlogShell>
  );
}
