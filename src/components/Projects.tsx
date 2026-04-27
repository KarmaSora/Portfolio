"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useProjects } from "./PortfolioProvider";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Projects() {
  const projects = useProjects();
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Get unique categories from actual data
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filterLabels: Record<string, string> = {
    all: "All",
    web: "Web",
    game: "Games",
    tool: "Tools",
    systems: "Systems",
  };

  return (
    <section id="projects" aria-label="Projects" className="py-20 md:py-28 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Header with inline filter — not a separate block */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-outfit">
            Things I&apos;ve built
          </h2>

          {/* Filter — simple text links, not pills */}
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "transition-colors",
                filter === "all"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "transition-colors",
                  filter === cat
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {filterLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects — first featured project gets full width */}
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            layout
          >
            {filteredProjects.map((project, index) => {
              // First project in the list spans full width for asymmetry
              const isWide = index === 0 && filteredProjects.length > 2;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "project-card glass-card rounded-xl overflow-hidden group",
                    isWide && "md:col-span-2"
                  )}
                >
                  <div className={cn(
                    isWide ? "md:grid md:grid-cols-2" : "flex flex-col"
                  )}>
                    {/* Thumbnail */}
                    <div className={cn(
                      "relative bg-secondary overflow-hidden",
                      isWide ? "aspect-video md:aspect-auto" : "aspect-video"
                    )}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                          <span className="text-sm">No preview</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-lg font-bold font-outfit text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {/* Links right-aligned */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`View ${project.title} source code`}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`View ${project.title} live demo`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {isWide ? project.longDescription : project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded bg-secondary/60 text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
