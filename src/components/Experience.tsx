"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Calendar, MapPin } from "lucide-react";
import { useExperiences } from "./PortfolioProvider";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function Experience() {
  const experiences = useExperiences();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative bg-card/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
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
            Career Path
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-400 to-border transform md:-translate-x-1/2"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />

            {/* Experience Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={cn(
                    "relative mb-12 last:mb-0",
                    index % 2 === 0
                      ? "md:pr-[50%] md:text-right"
                      : "md:pl-[50%] md:ml-auto",
                  )}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className={cn(
                      "absolute top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30",
                      "left-0 md:left-1/2 transform -translate-x-1/2",
                      "z-10",
                    )}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.3,
                      duration: 0.4,
                      type: "spring",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={cn(
                      "ml-8 md:ml-0 glass-card rounded-2xl p-6 md:p-8 glow-border transition-all duration-300",
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8",
                    )}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Period Badge */}
                    <motion.div
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-4",
                        index % 2 === 0 ? "md:float-right md:ml-4" : "",
                      )}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-bold font-outfit text-foreground mb-2 clear-both">
                      {exp.role}
                    </h3>

                    <div
                      className={cn(
                        "flex flex-wrap gap-4 mb-4 text-muted-foreground text-sm",
                        index % 2 === 0 ? "md:justify-end" : "",
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul
                      className={cn(
                        "space-y-2 mb-6",
                        index % 2 === 0 ? "md:text-right" : "md:text-left",
                      )}
                    >
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-muted-foreground text-sm leading-relaxed"
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? 20 : -20,
                          }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            delay: 0.5 + index * 0.3 + i * 0.1,
                            duration: 0.4,
                          }}
                        >
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div
                      className={cn(
                        "flex flex-wrap gap-2",
                        index % 2 === 0 ? "md:justify-end" : "",
                      )}
                    >
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: 0.7 + index * 0.3 + i * 0.05,
                            duration: 0.3,
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
