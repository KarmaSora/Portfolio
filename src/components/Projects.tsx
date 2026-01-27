"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Gamepad2, Code, Wrench } from "lucide-react";
import { useProjects } from "./PortfolioProvider";
import { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryIcons = {
  web: Code,
  game: Gamepad2,
  tool: Wrench,
};

const categoryLabels = {
  web: "Web Application",
  game: "Game Development",
  tool: "Developer Tool",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

export function Projects() {
  const projects = useProjects();
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filters: Array<{ id: "all" | Project["category"]; label: string }> = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web" },
    { id: "game", label: "Games" },
    { id: "tool", label: "Tools" },
  ];

  return (
    <section id="projects" className="py-24 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">
            My Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full mb-8" />

          {/* Filter Tabs */}
          <div className="inline-flex items-center gap-2 p-1 glass-card rounded-full">
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 relative",
                  filter === filterOption.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter === filterOption.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{filterOption.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const CategoryIcon = categoryIcons[project.category];

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="project-card glass-card rounded-2xl overflow-hidden group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-card via-secondary to-card overflow-hidden">
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full text-xs font-medium">
                        <CategoryIcon className="w-3.5 h-3.5 text-primary" />
                        <span>{categoryLabels[project.category]}</span>
                      </div>
                    </div>

                    {/* Project Image or Placeholder */}
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                            <CategoryIcon className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Project Thumbnail
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {project.longDescription}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-outfit text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
