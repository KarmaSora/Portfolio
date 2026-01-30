"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layout, Server, Wrench, Languages, Gamepad2 } from "lucide-react";
import { useSkillCategories, useSkillsContent } from "./PortfolioProvider";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Code2> = {
  "spoken-languages": Languages,
  programming: Code2,
  languages: Code2,
  frontend: Layout,
  backend: Server,
  "game-dev": Gamepad2,
  tools: Wrench,
};

const categoryColors: Record<string, string> = {
  "spoken-languages": "from-pink-500 to-rose-500",
  programming: "from-violet-500 to-purple-500",
  languages: "from-violet-500 to-purple-500",
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  "game-dev": "from-red-500 to-orange-500",
  tools: "from-orange-500 to-amber-500",
};

export function Skills() {
  const skillCategories = useSkillCategories();
  const skillsContent = useSkillsContent();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative bg-card/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)`,
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
            {skillsContent.sectionTitle}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            {skillsContent.sectionSubtitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = categoryIcons[category.id] || Code2;
            const gradientColor = categoryColors[category.id] || "from-slate-500 to-gray-500";

            return (
              <div
                key={category.id}
                className={cn(
                  "glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                      gradientColor,
                    )}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-foreground">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List - Simple tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills Banner */}
        {skillsContent.currentlyLearning.length > 0 && (
          <div
            className={cn(
              "mt-16 glass-card rounded-2xl p-8 max-w-4xl mx-auto text-center transition-all duration-500 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            <p className="text-muted-foreground mb-6">
              {skillsContent.learningTitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {skillsContent.currentlyLearning.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
