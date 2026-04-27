"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Mail, Copy, Check, Github, Linkedin, ExternalLink } from "lucide-react";
import { usePersonalInfo, useContactContent } from "./PortfolioProvider";
import { cn } from "@/lib/utils";

export function Contact() {
  const personalInfo = usePersonalInfo();
  const contactContent = useContactContent();
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

  return (
    <section id="contact" ref={sectionRef} aria-label="Contact" className="py-20 md:py-28 bg-card/30">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "max-w-2xl mx-auto text-center transition-all duration-500",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Simple, direct */}
          <h2 className="text-2xl md:text-3xl font-bold font-outfit mb-4">
            Let&apos;s talk
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {contactContent.sectionDescription}
          </p>

          {/* Email — prominent, with copy */}
          <div className="card rounded-xl p-6 mb-8 inline-block">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {personalInfo.email}
              </a>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded-md hover:bg-secondary transition-colors"
                title="Copy email"
                aria-label="Copy email to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Social — simple links, no cards */}
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <span className="text-border">·</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
