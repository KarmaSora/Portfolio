"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { useEducation } from "./PortfolioProvider";
import { Education as EducationType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Education() {
  const education = useEducation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 relative"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-3xl -translate-x-1/3" />
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
            Academic Background
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {education.map((edu: EducationType, index: number) => (
            <div
              key={edu.id}
              className={cn(
                "glass-card rounded-2xl p-6 md:p-8 glow-border hover:scale-[1.02] transition-all duration-500 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Icon Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold font-outfit text-foreground group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-primary text-sm font-medium mt-1">
                    {edu.school}
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary/70" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary/70" />
                  <span>{edu.location}</span>
                </div>
              </div>

              {/* Details */}
              {edu.details && edu.details.length > 0 && (
                <div className="space-y-2">
                  {edu.details.map((detail: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-primary/70 mt-1 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
