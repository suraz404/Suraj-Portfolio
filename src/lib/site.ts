import { profile } from "@/content/profile";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://surajagrahari.runs-on.dev"
).replace(/\/$/, "");

export const siteTitle = `${profile.name} — ${profile.role} in Nepal`;

export const siteDescription =
  "Suraj Agrahari is a full-stack developer and BSc CSIT student in Nepal who designs, builds, and ships complete web products with React, Next.js, Node.js, and PostgreSQL.";

export const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Tech stack" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
