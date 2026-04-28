"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { MapPin, Trophy } from "lucide-react";
import { usePersonalInfo, useAboutContent, useAchievements } from "./PortfolioProvider";
import { cn, withBasePath } from "@/lib/utils";

export function About() {
  const personalInfo = usePersonalInfo();
  const aboutContent = useAboutContent();
  const achievements = useAchievements();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Image — takes 2 columns */}
          <div
            className={cn(
              "lg:col-span-2 transition-all duration-700",
              isInView ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              <div className="relative card rounded-2xl overflow-hidden h-full">
                {personalInfo.profileImage ? (
                  <Image
                    src={withBasePath(personalInfo.profileImage)}
                    alt={`${personalInfo.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground">
                      {personalInfo.initials}
                    </div>
                  </div>
                )}
              </div>

              {/* Location — small, tucked into corner */}
              <div className="absolute -bottom-3 -right-3 px-3 py-1.5 card rounded-lg text-xs flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Content — takes 3 columns */}
          <div
            className={cn(
              "lg:col-span-3 transition-all duration-700 delay-200",
              isInView ? "opacity-100" : "opacity-0"
            )}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              About
            </h2>

            <div className="space-y-5">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Achievements — only shown if they exist */}
            {achievements.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-3">
                    <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">{achievement.result}</span>
                      {" — "}
                      {achievement.link ? (
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {achievement.title} {achievement.type}
                        </a>
                      ) : (
                        <span>{achievement.title} {achievement.type}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
