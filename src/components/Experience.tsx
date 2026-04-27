"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useExperiences } from "./PortfolioProvider";
import { cn } from "@/lib/utils";

export function Experience() {
  const experiences = useExperiences();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="Work experience"
      className="py-20 md:py-28 bg-card/30"
    >
      <div className="container mx-auto px-6">
        {/* Varied header — left-aligned, no subtitle */}
        <h2
          className={cn(
            "text-2xl md:text-3xl font-bold font-outfit mb-12 transition-all duration-500",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          Where I&apos;ve worked
        </h2>

        {/* Simple stacked cards — no alternating timeline */}
        <div className="max-w-3xl space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={cn(
                "glass-card rounded-xl p-6 md:p-8 transition-all duration-500 hover:shadow-md",
                isInView ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Role + Company on same line */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3 className="text-lg md:text-xl font-bold font-outfit text-foreground">
                  {exp.role}
                </h3>
                <span className="text-primary font-medium">
                  @ {exp.company}
                </span>
              </div>

              {/* Meta — inline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>

              {/* Description */}
              <ul className="space-y-1.5 mb-5">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-primary/60">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs rounded bg-secondary/60 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
