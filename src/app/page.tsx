import { About } from "@/components/about";
import { BlogPreview } from "@/components/blog-preview";
import { Contact } from "@/components/contact";
import { Background } from "@/components/background";
import { Hero } from "@/components/hero";
import { ProjectRail, RailControls, RailTrack } from "@/components/project-rail";
import { PullCord } from "@/components/pull-cord";
import { Section } from "@/components/section";
import { MobileNav, Sidebar } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <>
      <MobileNav />
      <PullCord />

      <div className="mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
        <Sidebar />

        <main id="main" tabIndex={-1} className="min-w-0 outline-none lg:pl-14">
          <Hero />

          <ProjectRail>
            <Section
              id="work"
              title="Work"
              intro="Things I’ve designed, built and shipped, plus what I’m building right now."
              aside={<RailControls />}
            >
              <RailTrack />
            </Section>
          </ProjectRail>

          <Section id="about" title="About">
            <About />
          </Section>

          <Section id="stack" title="Tech stack" intro="The tools I reach for, from the screen to the server.">
            <TechStack />
          </Section>

          <Section id="experience" title="Experience and education" hideTitle>
            {/* Lets /#education links scroll here too; the tab itself is picked from the hash. */}
            <span id="education" aria-hidden="true" className="absolute top-0" />
            <Background />
          </Section>

          <Section id="blog" title="Blog" intro="Notes from what I’m building and learning.">
            <BlogPreview />
          </Section>

          <Section
            id="contact"
            title="Contact"
            intro="Have an idea, some feedback on my work, or an opportunity? I’d be glad to hear from you."
          >
            <Contact />
          </Section>

          <SiteFooter />
        </main>
      </div>
    </>
  );
}
