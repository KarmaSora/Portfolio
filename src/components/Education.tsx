"use client";

import { Calendar, MapPin } from "lucide-react";
import { useEducation } from "./PortfolioProvider";
import { Education as EducationType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Education() {
  const education = useEducation();

  return (
    <section id="education" className="section-space bg-card/30">
      <div className="container mx-auto px-6">
        <h2
          className={cn(
            "section-title mb-12 "
          )}
        >
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu: EducationType) => (
            <div
              key={edu.id}
              className={cn(
                "card rounded-xl p-6 md:p-8 "
              )}
            >
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                {edu.degree}
              </h3>
              <p className="text-foreground/70 font-medium mb-3">
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
                      className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-muted-foreground/60"
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
