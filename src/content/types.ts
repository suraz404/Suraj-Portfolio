export type LinkItem = {
  label: string;
  href: string;
};

export type ProjectStatus = "complete" | "in-progress" | "sample";

export type Project = {
  slug: string;
  name: string;
  /** One or two sentences: what it is and what problem it solves. */
  summary: string;
  status: ProjectStatus;
  /** Year or range, e.g. "2026". Leave empty if unknown. */
  year?: string;
  stack: string[];
  /**
   * Cover image in /public, e.g. "/projects/my-app.png".
   * A screenshot around 1600×1000 works best.
   */
  image: {
    src: string;
    alt: string;
  };
  /** Only add links that actually exist. Missing links are not rendered. */
  links: {
    live?: string;
    source?: string;
  };
};
