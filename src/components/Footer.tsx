"use client";

import { Heart, ArrowUp, Github, Linkedin } from "lucide-react";
import { usePersonalInfo, useNavItems, useFooterContent } from "./PortfolioProvider";

export function Footer() {
  const personalInfo = usePersonalInfo();
  const navItems = useNavItems();
  const footerContent = useFooterContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  // Get first and last name for the logo
  const nameParts = personalInfo.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <footer className="relative bg-card/50 border-t border-border">
      {/* Gradient Fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-bold font-outfit tracking-tight inline-block mb-4"
            >
              <span className="text-foreground">{firstName.charAt(0)}</span>
              <span className="text-primary">.</span>
              <span className="text-muted-foreground">{lastName}</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              {footerContent.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500" /> using Next.js & Tailwind
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
}
