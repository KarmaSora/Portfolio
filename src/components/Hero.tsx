"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown, Mail } from "lucide-react";
import { usePersonalInfo, usePortfolio } from "./PortfolioProvider";
import { HeroSkeleton } from "./Skeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-glow absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
        <div
          className="hero-glow absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
          style={{ animationDelay: "-4s" }}
        />
        <div className="hero-glow-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Noise Overlay for premium texture */}
      <div className="noise-overlay" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          {personalInfo.available && (
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">
                {personalInfo.availableText}
              </span>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-outfit mb-6"
          >
            <span className="text-foreground">
              {personalInfo.name.split(" ")[0]}
            </span>
            <br />
            <span className="text-gradient">
              {personalInfo.name.split(" ")[1]}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-8"
          >
            {personalInfo.title}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">GitHub</span>
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">LinkedIn</span>
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm font-medium">Contact</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToAbout}
            className="group inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
