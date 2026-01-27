"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layout, Server, Wrench } from "lucide-react";
import { useSkillCategories } from "./PortfolioProvider";
import { cn } from "@/lib/utils";

const categoryIcons = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  tools: Wrench,
};

const categoryColors = {
  languages: "from-violet-500 to-purple-500",
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  tools: "from-orange-500 to-amber-500",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
};

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function Skills() {
  const skillCategories = useSkillCategories();
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">
            Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent =
              categoryIcons[category.id as keyof typeof categoryIcons];
            const gradientColor =
              categoryColors[category.id as keyof typeof categoryColors];

            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300"
                whileHover={{ y: -5 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                      gradientColor,
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-bold font-outfit text-foreground">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List */}
                <motion.div
                  className="space-y-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={skillVariants}
                      custom={skillIndex}
                      className="group/skill flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {/* Skill Icon/Bullet */}
                      <motion.div
                        className={cn(
                          "w-2 h-2 rounded-full bg-gradient-to-r",
                          gradientColor,
                        )}
                        whileHover={{ scale: 1.5 }}
                      />

                      {/* Skill Name */}
                      <span className="text-sm font-medium text-muted-foreground group-hover/skill:text-foreground transition-colors flex-1">
                        {skill}
                      </span>

                      {/* Skill Level Indicator */}
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <motion.div
                            key={level}
                            className={cn(
                              "w-1.5 h-4 rounded-full",
                              level <= 4
                                ? `bg-gradient-to-t ${gradientColor}`
                                : "bg-secondary",
                            )}
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{
                              delay:
                                categoryIndex * 0.15 +
                                skillIndex * 0.05 +
                                level * 0.1,
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Skills Banner */}
        <motion.div
          className="mt-16 glass-card rounded-2xl p-8 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-muted-foreground mb-6">
            Always learning and exploring new technologies. Currently interested
            in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "WebAssembly",
              "Rust",
              "Machine Learning",
              "Cloud Architecture",
              "Blockchain",
              "AR/VR Development",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
