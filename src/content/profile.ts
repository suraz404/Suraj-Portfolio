import type { LinkItem } from "./types";

/**
 * Personal details. Everything on the site reads from here,
 * so edit this file instead of the components.
 */
export const profile = {
  name: "Suraj Agrahari",
  initials: "SA",
  role: "Full-Stack Developer",
  location: "Nepal",
  /** IANA time zone, used for the local-time readout in the sidebar. */
  timeZone: "Asia/Kathmandu",

  headline: {
    lead: "I design, build, and ship",
    emphasis: "complete",
    tail: "digital products.",
  },
  intro:
    "Full-stack developer exploring the intersection of thoughtful design, reliable backend systems, and useful AI-powered applications.",


  /**
   * Portrait shown in the hero. Put the file in /public and point to it here.
   * If the file is missing, a monogram frame is shown instead.
   */
  photo: {
    src: "/images/suraj-portrait.jpg",
    /** Used for link previews and search results. */
    full: "/images/suraj-portrait.jpg",
    alt: "Portrait of Suraj Agrahari",
    /** Small square crop used next to your name in the sidebar. */
    avatar: "/images/suraj-avatar.jpg",
  },

  /** The Tech stack section. Only list what you actually use. */
  techStack: [
    { group: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript"] },
    { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "Authentication"] },
    { group: "Databases", items: ["PostgreSQL", "MongoDB"] },
    { group: "Tools", items: ["Git", "GitHub", "Docker", "Deployment"] },
    { group: "Exploring", items: ["AI integration", "Vector search", "Cloud security"] },
  ],

  about: [
    "I'm Suraj, a CSIT student and full-stack developer from Nepal. I like turning ideas into working products, understanding the systems behind them, and fixing the small details that make software reliable and pleasant to use.",
    "I work across the frontend, the backend, and the database, and I'm most interested in useful applications that pair a thoughtful interface with solid engineering underneath.",
    "Making a project work is only the first step. I want to know why it works, where it can fail, and how to make it better.",
  ],

  /** Most recent first. Only add results you actually have. */
  education: [
    {
      qualification: "BSc in Computer Science & Information Technology",
      short: "BSc CSIT",
      institution: "Butwal Multiple Campus",
      place: "Butwal, Nepal",
      result: "7th semester",
      current: true,
      progress: { current: 7, total: 8, asOf: "October 2026" },
    },
    {
      qualification: "Higher Secondary (+2), Computer Science",
      short: "+2",
      institution: "Oxford Secondary School",
      result: "GPA 3.4",
    },
    {
      qualification: "Secondary Education (Class 10)",
      short: "Class 10",
      institution: "Munal English Boarding High School",
      result: "GPA 3.75",
    },
  ] as Array<{
    qualification: string;
    short: string;
    institution: string;
    place?: string;
    result?: string;
    current?: boolean;
    progress?: { current: number; total: number; asOf: string };
  }>,

  /**
   * Experience, shown in two groups: "Work" and "Volunteering". Each organisation lists its roles, newest first.
   * To add a job or internship, add an entry like:
   *   { kind: "Work", organization: "Company name", place: "City", roles: [{ title: "Intern", period: "2026 – Present", current: true, summary: "What you did." }] }
   */
  experience: [
    {
      kind: "Volunteering",
      organization: "CSIT Association of Nepal",
      place: "Rupandehi",
      roles: [
        { title: "Treasurer", period: "2026 – 2027", current: true },
        { title: "Executive Member", period: "Previous tenure" },
      ],
    },
  ] as Array<{
    kind: "Work" | "Volunteering";
    organization: string;
    place?: string;
    roles: Array<{ title: string; period: string; current?: boolean; summary?: string }>;
  }>,

  /**
   * Contact links. Leave a value as null until you have a real one.
   * Null entries are not rendered, so there are never dead links.
   *
   * Example:
   *   email: "you@example.com",
   *   github: "https://github.com/your-username",
   *   linkedin: "https://www.linkedin.com/in/your-handle",
   *   x: "https://x.com/your-handle",
   */
  contact: {
    email: "surazagrahari1980@gmail.com" as string | null,
    github: "https://github.com/suraz404" as string | null,
    linkedin: "https://www.linkedin.com/in/suraz404" as string | null,
    x: "https://x.com/surajlovescodes" as string | null,
  },

  /** Extra links (résumé, blog, etc.). Only real URLs. */
  extraLinks: [] as LinkItem[],
};
