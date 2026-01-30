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
      className="py-24 relative bg-card/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Career Path
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div
              className={cn(
                "absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-400 to-border transform md:-translate-x-1/2 transition-all duration-1000",
                isInView ? "scale-y-100" : "scale-y-0"
              )}
              style={{ transformOrigin: "top" }}
            />

            {/* Experience Items */}
            <div>
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={cn(
                    "relative mb-12 last:mb-0 transition-all duration-500",
                    index % 2 === 0
                      ? "md:pr-[50%] md:text-right"
                      : "md:pl-[50%] md:ml-auto",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={cn(
                      "absolute top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30",
                      "left-0 md:left-1/2 transform -translate-x-1/2",
                      "z-10",
                    )}
                  />

                  {/* Content Card */}
                  <div
                    className={cn(
                      "ml-8 md:ml-0 glass-card rounded-2xl p-6 md:p-8 glow-border hover:scale-[1.02] transition-transform duration-300",
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8",
                    )}
                  >
                    {/* Period Badge */}
                    <div
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-4",
                        index % 2 === 0 ? "md:float-right md:ml-4" : "",
                      )}
                    >
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-outfit text-foreground mb-2 clear-both">
                      {exp.role}
                    </h3>

                    <div
                      className={cn(
                        "flex flex-wrap gap-4 mb-4 text-muted-foreground text-sm",
                        index % 2 === 0 ? "md:justify-end" : "",
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul
                      className={cn(
                        "space-y-2 mb-6",
                        index % 2 === 0 ? "md:text-right" : "md:text-left",
                      )}
                    >
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground text-sm leading-relaxed"
                        >
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div
                      className={cn(
                        "flex flex-wrap gap-2",
                        index % 2 === 0 ? "md:justify-end" : "",
                      )}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
