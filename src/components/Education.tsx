"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useEducation } from "./PortfolioProvider";
import { Education as EducationType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Education() {
  const education = useEducation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={sectionRef} className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        {/* Different header style — right-aligned on desktop for variety */}
        <h2
          className={cn(
            "text-2xl md:text-3xl font-bold font-outfit mb-12 md:text-right transition-all duration-500",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          Education
        </h2>

        {/* Offset cards — pushed to the right on desktop */}
        <div className="max-w-3xl ml-auto space-y-6">
          {education.map((edu: EducationType, index: number) => (
            <div
              key={edu.id}
              className={cn(
                "glass-card rounded-xl p-6 md:p-8 transition-all duration-500",
                isInView ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="text-lg md:text-xl font-bold font-outfit text-foreground mb-1">
                {edu.degree}
              </h3>
              <p className="text-primary font-medium mb-3">
                {edu.school}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {edu.location}
                </span>
              </div>

              {edu.details && edu.details.length > 0 && (
                <ul className="space-y-1.5">
                  {edu.details.map((detail: string, i: number) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-primary/60"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
