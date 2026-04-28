"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown, Mail, Download } from "lucide-react";
import { usePersonalInfo, usePortfolio } from "./PortfolioProvider";
import { HeroSkeleton } from "./Skeleton";
import { withBasePath } from "@/lib/utils";

export function Hero() {
  const personalInfo = usePersonalInfo();
  const { isLoading } = usePortfolio();

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <HeroSkeleton />;
  }

  const firstName = personalInfo.name.split(" ")[0];
  const lastName = personalInfo.name.split(" ")[1];

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[85vh] flex items-center justify-center py-24 sm:py-28 md:py-0"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[0.95]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {firstName}{" "}
            <span className="text-primary">{lastName}</span>
          </motion.h1>

          {/* Title — understated */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {personalInfo.title}
          </motion.p>

          {/* Bio — left-aligned prose, reads like a human wrote it */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* Links — inline, casual row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={withBasePath(personalInfo.resumeUrl)}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              CV
            </a>
          </motion.div>

          {/* Scroll hint — just an arrow, no label */}
          <motion.button
            onClick={scrollToAbout}
            className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            aria-label="Scroll to content"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
