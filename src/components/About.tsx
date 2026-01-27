"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Code } from "lucide-react";
import { usePersonalInfo } from "./PortfolioProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export function About() {
  const personalInfo = usePersonalInfo();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { label: "Years Experience", value: "3+", icon: Briefcase },
    { label: "Projects Completed", value: "20+", icon: Code },
    { label: "Technologies", value: "15+", icon: GraduationCap },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
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
            About Me
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Who Am I?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative Frame */}
              <motion.div
                className="absolute inset-4 border-2 border-primary/20 rounded-2xl"
                initial={{ rotate: 0, opacity: 0 }}
                animate={isInView ? { rotate: 3, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
              <motion.div
                className="absolute inset-4 border-2 border-purple-400/20 rounded-2xl"
                initial={{ rotate: 0, opacity: 0 }}
                animate={isInView ? { rotate: -3, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              />

              {/* Image Container */}
              <motion.div
                className="relative glass-card rounded-2xl overflow-hidden h-full flex items-center justify-center glow-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-400/20" />
                {personalInfo.profileImage ? (
                  <Image
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} - Professional Photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-5xl font-bold text-white font-outfit">
                      KM
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Professional Headshot
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 glass-card rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{personalInfo.location}</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hello! I'm{" "}
                <span className="text-foreground font-semibold">
                  {personalInfo.name}
                </span>
                , a passionate software engineer and game developer based in
                Sweden. I specialize in creating robust, scalable applications
                and immersive gaming experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey in tech began with a fascination for how games were
                built, which evolved into a deep appreciation for software
                engineering as a whole. Today, I work across the full stack,
                from crafting intuitive frontends to designing efficient backend
                systems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or working on my latest
                game development venture. I believe in writing clean,
                maintainable code and building software that makes a difference.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card rounded-xl p-4 text-center group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <motion.p
                    className="text-2xl md:text-3xl font-bold text-gradient mb-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
