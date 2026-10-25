"use client";

import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { usePersonalInfo, usePortfolio } from "./PortfolioProvider";
import { HeroSkeleton } from "./Skeleton";
import { withBasePath } from "@/lib/utils";

export function Hero() {
  const personalInfo = usePersonalInfo();
  const { data, isLoading } = usePortfolio();

  if (isLoading) return <HeroSkeleton />;

  const recentExperience = data.experiences.slice(0, 3);

  return (
    <section id="home" aria-label="Introduction" className="hero-section">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,1fr)] lg:gap-20">
          <div className="min-w-0">
            <p className="mb-3 text-base font-medium text-primary sm:mb-5 sm:text-lg">{personalInfo.title}</p>
            <h1 className="hero-name">{personalInfo.name}</h1>
            <p className="mt-5 max-w-[38rem] text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg">
              {personalInfo.bio}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
              <a href={`mailto:${personalInfo.email}`} className="button-primary">
                <Mail className="h-4 w-4" aria-hidden="true" /> Get in touch
              </a>
              <a href={withBasePath(personalInfo.resumeUrl)} download aria-label={`Download ${personalInfo.name}'s CV (PDF)`} className="button-secondary">
                <Download className="h-4 w-4" aria-hidden="true" /> Download CV
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub profile" title="GitHub profile">
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn profile" title="LinkedIn profile">
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            {personalInfo.available && (
              <div className="mt-5 flex max-w-xl items-start gap-3 text-sm leading-6 text-muted-foreground sm:mt-8">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <p>{personalInfo.availableText}</p>
              </div>
            )}
          </div>

          <aside className="recent-work hidden lg:block" aria-label="Recent experience">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h2 className="text-base font-semibold">Recent experience</h2>
              <span className="h-2 w-2 rounded-full border border-primary" aria-hidden="true" />
            </div>
            <div className="divide-y divide-border">
              {recentExperience.map((experience) => (
                <a key={experience.id} href={`#${experience.id}`} className="group flex min-h-28 items-center justify-between gap-4 py-5">
                  <div className="min-w-0">
                    <p className="text-xs leading-6 text-muted-foreground">{experience.period}</p>
                    <p className="mt-1 text-lg font-semibold tracking-tight group-hover:text-primary">{experience.company}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{experience.role}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
        <a href="#experience" className="mt-6 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary sm:mt-12 lg:mt-16">
          <ArrowDown className="h-4 w-4" aria-hidden="true" /> Explore my experience
        </a>
      </div>
    </section>
  );
}
