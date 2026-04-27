"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useSkillCategories, useSkillsContent } from "./PortfolioProvider";
import { cn } from "@/lib/utils";

export function Skills() {
  const skillCategories = useSkillCategories();
  const skillsContent = useSkillsContent();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} aria-label="Skills" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold font-outfit mb-12 transition-all duration-500",
              isInView ? "opacity-100" : "opacity-0"
            )}
          >
            Skills &amp; tools
          </h2>

          {/* Flat list with category labels — not a grid of cards */}
          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.id}
                className={cn(
                  "transition-all duration-500",
                  isInView ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: `${categoryIndex * 80}ms` }}
              >
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Currently learning — casual note */}
          {skillsContent.currentlyLearning.length > 0 && (
            <div
              className={cn(
                "mt-12 pt-8 border-t border-border transition-all duration-500",
                isInView ? "opacity-100" : "opacity-0"
              )}
            >
              <p className="text-sm text-muted-foreground mb-3">
                Currently exploring:
              </p>
              <div className="flex flex-wrap gap-2">
                {skillsContent.currentlyLearning.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg border border-primary/30 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
