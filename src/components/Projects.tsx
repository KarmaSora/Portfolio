"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Loader2 } from "lucide-react";
import { usePortfolio } from "./PortfolioProvider";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const DEFAULT_PROJECT_IMAGE = "/images/default-project.png";

export function Projects() {
  const { data, isLoading } = usePortfolio();
  const projects = data.projects;
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
          <h2 className="text-2xl md:text-3xl font-bold">
            Projects
          </h2>

          {/* Filter — simple text links, not pills */}
          {!isLoading && (
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
          )}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          /* Project grid — no staggered animations, just instant render */
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card card rounded-xl overflow-hidden group"
              >
                <div className="flex flex-col">
                  {/* Thumbnail — always shown, uses default if no image */}
                  <div className="relative bg-secondary overflow-hidden aspect-video">
                    <Image
                      src={project.image || DEFAULT_PROJECT_IMAGE}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
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
                      {project.description}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
