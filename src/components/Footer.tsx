"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp, Github, Linkedin } from "lucide-react";
import { usePersonalInfo, useNavItems } from "./PortfolioProvider";

export function Footer() {
  const personalInfo = usePersonalInfo();
  const navItems = useNavItems();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/50 border-t border-border">
      {/* Gradient Fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold font-outfit tracking-tight inline-block mb-4"
            >
              <span className="text-foreground">K</span>
              <span className="text-primary">.</span>
              <span className="text-muted-foreground">Matar</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Software Engineer & Game Developer passionate about creating
              innovative digital experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 animate-pulse" />{" "}
            using Next.js & Tailwind
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
