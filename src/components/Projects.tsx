"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog } from "./Dialog";
import { usePortfolio } from "./PortfolioProvider";
import { Project } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

const DEFAULT_PROJECT_IMAGE = "/images/default-project.png";

export function Projects() {
  const { data, isLoading } = usePortfolio();
  const projects = data.projects;
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [galleryIndex, galleryProject]);

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
      setDetailProject(null);
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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" role="group" aria-label="Filter projects">
              <button
                onClick={() => setFilter("all")}
                aria-pressed={filter === "all"}
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
                  aria-pressed={filter === cat}
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
              <article
                key={project.id}
                className={cn(
                  "project-card card rounded-xl overflow-hidden group flex flex-col"
                )}
              >
                <div className="flex flex-col flex-1">
                  {/* Thumbnail — always shown, uses default if no image */}
                  <div className="relative bg-secondary overflow-hidden aspect-video">
                    <Image
                      src={withBasePath(project.image || DEFAULT_PROJECT_IMAGE)}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gallery indicator badge */}
                    {project.screenshots && project.screenshots.length > 0 && (
                      <button type="button" onClick={() => openGallery(project)} aria-label={`View ${project.title} screenshots`} className="absolute inset-0 w-full text-white focus-visible:ring-inset">
                      <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                        {project.screenshots.length} screenshots
                      </span>
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
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
                            title="Source code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 p-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`${project.demoLabel || "Live demo"}: ${project.title}`}
                            title={project.demoLabel || "Live demo"}
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{project.demoLabel || "Demo"}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-base mb-4 leading-7">
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
                    <button type="button" onClick={() => setDetailProject(project)} aria-label={`Read details about ${project.title}`} className="mt-5 inline-flex min-h-11 items-center gap-1 self-start text-sm font-medium text-primary hover:underline">
                      Project details <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {detailProject && (
        <Dialog title={detailProject.title} description="Project details" closeLabel="Close project details" onClose={() => setDetailProject(null)}>
          <p className="max-w-prose text-base leading-7 text-muted-foreground">{detailProject.longDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {detailProject.technologies.map((technology) => <span key={technology} className="rounded bg-secondary px-2.5 py-1 text-sm text-muted-foreground">{technology}</span>)}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-medium text-primary">
            {detailProject.github && <a href={detailProject.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline"><Github className="h-4 w-4" aria-hidden="true" />Source code</a>}
            {detailProject.demo && <a href={detailProject.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:underline"><ExternalLink className="h-4 w-4" aria-hidden="true" />{detailProject.demoLabel || "Live demo"}</a>}
            {!!detailProject.screenshots?.length && <button type="button" onClick={() => openGallery(detailProject)} className="min-h-11 hover:underline">View screenshots</button>}
          </div>
        </Dialog>
      )}

      {galleryProject && galleryProject.screenshots && (
        <Dialog
          title={galleryProject.title}
          description="Browse screenshots with the arrows, thumbnails or left and right arrow keys."
          closeLabel="Close gallery"
          onClose={closeGallery}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); prevImage(); }
            if (event.key === "ArrowRight") { event.preventDefault(); nextImage(); }
          }}
        >
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
            <Image src={withBasePath(galleryProject.screenshots[galleryIndex])} alt={`${galleryProject.title} screenshot ${galleryIndex + 1}`} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 1024px" priority />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button type="button" onClick={prevImage} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg border border-border px-3 text-sm hover:bg-secondary" aria-label="Previous screenshot"><ChevronLeft className="h-5 w-5" aria-hidden="true" /><span className="hidden sm:inline">Previous</span></button>
            <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground">{galleryIndex + 1} / {galleryProject.screenshots.length}</p>
            <button type="button" onClick={nextImage} className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-lg border border-border px-3 text-sm hover:bg-secondary" aria-label="Next screenshot"><span className="hidden sm:inline">Next</span><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="mt-4 overflow-x-auto pb-2" role="group" aria-label="Screenshot thumbnails">
            <div className="flex w-max gap-2">
              {galleryProject.screenshots.map((src, index) => (
                <button
                  key={index}
                  ref={index === galleryIndex ? activeThumbnailRef : undefined}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Show screenshot ${index + 1} for ${galleryProject.title}`}
                  aria-pressed={index === galleryIndex}
                  className={cn("relative h-12 w-20 shrink-0 overflow-hidden rounded border-2 transition-opacity", index === galleryIndex ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100")}
                >
                  <Image src={withBasePath(src)} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}
