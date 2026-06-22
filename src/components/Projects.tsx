"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolio } from "./PortfolioProvider";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const DEFAULT_PROJECT_IMAGE = "/images/default-project.png";

export function Projects() {
  const { data, isLoading } = usePortfolio();
  const projects = data.projects;
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Get unique categories from actual data
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filterLabels: Record<string, string> = {
    all: "All",
    ai: "AI",
    web: "Web",
    game: "Games",
    tool: "Tools",
    systems: "Systems",
  };

  const openGallery = (project: Project) => {
    if (project.screenshots && project.screenshots.length > 0) {
      setGalleryProject(project);
      setGalleryIndex(0);
    }
  };

  const closeGallery = () => {
    setGalleryProject(null);
    setGalleryIndex(0);
  };

  const prevImage = () => {
    if (!galleryProject?.screenshots) return;
    setGalleryIndex((i) =>
      i === 0 ? galleryProject.screenshots!.length - 1 : i - 1
    );
  };

  const nextImage = () => {
    if (!galleryProject?.screenshots) return;
    setGalleryIndex((i) =>
      i === galleryProject.screenshots!.length - 1 ? 0 : i + 1
    );
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
                className={cn(
                  "project-card card rounded-xl overflow-hidden group",
                  project.screenshots && project.screenshots.length > 0 && "cursor-pointer"
                )}
                onClick={() => openGallery(project)}
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
                    {/* Gallery indicator badge */}
                    {project.screenshots && project.screenshots.length > 0 && (
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                        {project.screenshots.length} screenshots
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {/* Links right-aligned */}
                      <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
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

      {/* Screenshot gallery modal */}
      {galleryProject && galleryProject.screenshots && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeGallery}
        >
          <div
            className="relative w-full max-w-5xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeGallery}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Project title */}
            <h3 className="absolute -top-12 left-0 text-white/90 font-medium text-sm">
              {galleryProject.title}
              <span className="text-white/50 ml-2">
                {galleryIndex + 1} / {galleryProject.screenshots.length}
              </span>
            </h3>

            {/* Main image */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
              <Image
                src={galleryProject.screenshots[galleryIndex]}
                alt={`${galleryProject.title} screenshot ${galleryIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-14 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-14 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center">
              {galleryProject.screenshots.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  className={cn(
                    "relative w-20 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all",
                    i === galleryIndex
                      ? "border-primary opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  )}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
