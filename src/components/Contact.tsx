"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { usePersonalInfo } from "./PortfolioProvider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export function Contact() {
  const personalInfo = usePersonalInfo();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Me",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      action: copyEmail,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: personalInfo.github,
      username: "@karam-matar",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo.linkedin,
      username: "Karam Matar",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
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
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            Let's Work Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of something amazing. Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Contact Methods */}
            <motion.div className="space-y-6" variants={containerVariants}>
              <motion.h3
                className="text-xl font-bold font-outfit text-foreground mb-6"
                variants={itemVariants}
              >
                Contact Information
              </motion.h3>

              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  className="glass-card rounded-2xl p-6 group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <method.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        {method.label}
                      </p>
                      {method.href ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={method.href}
                            className="text-foreground font-medium hover:text-primary transition-colors truncate"
                          >
                            {method.value}
                          </a>
                          {method.action && (
                            <motion.button
                              onClick={method.action}
                              className="p-1 hover:bg-secondary rounded-md transition-colors"
                              title="Copy to clipboard"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-muted-foreground" />
                              )}
                            </motion.button>
                          )}
                        </div>
                      ) : (
                        <p className="text-foreground font-medium">
                          {method.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                className="glass-card rounded-2xl p-6"
                variants={itemVariants}
              >
                <h4 className="text-sm text-muted-foreground mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 group/social"
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover/social:text-primary transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {social.label}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {social.username}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover/social:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              className="glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center glow-border"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(263 70% 58% / 0.3)",
                    "0 0 40px hsl(263 70% 58% / 0.5)",
                    "0 0 20px hsl(263 70% 58% / 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Send className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">
                Ready to Start a Project?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you as soon as possible!
              </p>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                Send Me an Email
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
