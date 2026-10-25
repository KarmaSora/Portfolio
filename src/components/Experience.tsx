"use client";

import { MapPin } from "lucide-react";
import { useExperiences } from "./PortfolioProvider";

export function Experience() {
  const experiences = useExperiences();

  return (
    <section id="experience" aria-label="Work experience" className="section-space">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-10 md:mb-14">Experience</h2>
        <div className="border-t border-border">
          {experiences.map((experience) => (
            <article key={experience.id} id={experience.id} className="experience-entry grid gap-6 border-b border-border py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12 md:py-10" aria-label={`${experience.role} at ${experience.company}`}>
              <div>
                <p className="text-sm leading-6 text-muted-foreground">{experience.period}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{experience.company}</h3>
                <p className="mt-3 flex items-start gap-1.5 text-sm leading-6 text-muted-foreground">
                  <MapPin className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{experience.location}
                </p>
              </div>
              <div className="min-w-0">
                <h4 className="mb-4 text-lg font-semibold">{experience.role}</h4>
                <ul className="experience-bullets space-y-3">
                  {experience.description.map((item, index) => (
                    <li key={index} className="relative max-w-[75ch] pl-5 text-base leading-7 text-muted-foreground before:absolute before:left-0 before:top-3 before:h-1 before:w-1 before:rounded-full before:bg-primary">{item}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                  {experience.technologies.map((technology) => <span key={technology} className="technology-label">{technology}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
