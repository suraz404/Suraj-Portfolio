import type { Project } from "./types";

/**
 * Projects, shown as a horizontal row of cards, newest first.
 * Cover images live in /public/projects (about 1600×1000 works best).
 * Only add links that actually exist.
 */
export const projects: Project[] = [
  {
    slug: "bigawa",
    name: "Bigawa",
    summary:
      "A multi-agent fintech assistant built on agentic RAG and MCP: agents that retrieve your financial context and use tools to answer questions about your money.",
    status: "in-progress",
    stack: ["Next.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Agentic RAG", "MCP"],
    image: { src: "/projects/bigawa.jpg", alt: "Illustration of Bigawa's multi-agent architecture" },
    links: {},
  },
  {
    slug: "devhub",
    name: "DevHub",
    summary:
      "A curated hub for discovering developer tools, from frameworks and APIs to AI and design resources, with search, category pages, a page for every tool, and dark mode.",
    status: "complete",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Motion"],
    image: { src: "/projects/devhub.jpg", alt: "The DevHub homepage with its search bar and popular categories" },
    links: {
      live: "https://devhub-sooty-psi.vercel.app/",
      source: "https://github.com/suraz404/DevHub",
    },
  },
  {
    slug: "w-store",
    name: "W-Store",
    summary:
      "An e-commerce storefront with 200 products, filters by category, brand and price, product pages, a stock-aware cart, Clerk sign-in, and location detection for the delivery address.",
    status: "complete",
    stack: ["React", "Vite", "Tailwind CSS", "React Router", "Clerk", "DummyJSON API"],
    image: { src: "/projects/w-store.jpg", alt: "The W-Store homepage with a product carousel and categories" },
    links: {
      live: "https://w-store-fawn.vercel.app/",
      source: "https://github.com/suraz404/W-Store",
    },
  },
];
