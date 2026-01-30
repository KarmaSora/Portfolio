"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Code } from "lucide-react";
import { usePersonalInfo, useAboutContent } from "./PortfolioProvider";
import { Stat } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

const iconMap = {
  briefcase: Briefcase,
  code: Code,
  graduation: GraduationCap,
};

export function About() {
  const personalInfo = usePersonalInfo();
  const aboutContent = useAboutContent();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
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
            {aboutContent.sectionTitle}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            {aboutContent.sectionSubtitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div
            className={cn(
              "relative transition-all duration-700",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Frame */}
              <div className="absolute inset-4 border-2 border-primary/20 rounded-2xl rotate-3" />
              <div className="absolute inset-4 border-2 border-purple-400/20 rounded-2xl -rotate-3" />

              {/* Image Container */}
              <div className="relative glass-card rounded-2xl overflow-hidden h-full flex items-center justify-center glow-border hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-400/20" />
                {personalInfo.profileImage ? (
                  <Image
                    src={withBasePath(personalInfo.profileImage)}
                    alt={`${personalInfo.name} - Professional Photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-5xl font-bold text-white font-outfit">
                      {personalInfo.initials}
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Location Badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 glass-card rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className={cn(
              "space-y-8 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="space-y-6">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {aboutContent.stats.map((stat: Stat, index: number) => {
                const IconComponent = iconMap[stat.icon] || Code;
                return (
                  <div
                    key={stat.label}
                    className="glass-card rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                    <p className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
