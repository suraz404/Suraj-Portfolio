import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";

/** Simple frame for the blog pages: a header back to home, the content, and the footer. */
export function BlogShell({
  back,
  wide = false,
  children,
}: {
  back: { href: string; label: string };
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-6 ${wide ? "max-w-5xl" : "max-w-2xl"}`}>
      <header className="flex items-center justify-between py-6">
        <Link href="/" className="group inline-flex items-center gap-3">
          <Image src={profile.photo.avatar} alt="" width={36} height={36} className="size-9 rounded-full object-cover ring-1 ring-line" />
          <span className="font-serif text-lg">{profile.name}</span>
        </Link>
        <ThemeToggle />
      </header>
      <main id="main" tabIndex={-1} className="pt-8 pb-20 outline-none">
        <Link
          href={back.href}
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          {back.label}
        </Link>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
