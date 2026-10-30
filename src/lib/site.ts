import { profile } from "@/content/profile";

export const siteUrl = (
  process.env.SITE_URL ?? "https://www.surajagrahari.com.np"
).replace(/\/$/, "");

export const siteTitle = `${profile.name} — ${profile.role} in Nepal`;

export const siteDescription =
  "Suraj Agrahari is a full-stack developer and BSc CSIT student in Nepal who designs, builds, and ships complete web products with React, Next.js, Node.js, and PostgreSQL.";
