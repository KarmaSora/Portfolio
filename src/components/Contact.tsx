"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
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
      username: personalInfo.githubUsername,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: personalInfo.linkedin,
      username: personalInfo.linkedinName,
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
        <div
          className={cn(
            "text-center mb-16 transition-all duration-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">
            {contactContent.sectionTitle}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">
            {contactContent.sectionSubtitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-400 mx-auto rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {contactContent.sectionDescription}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "grid md:grid-cols-2 gap-8 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-outfit text-foreground mb-6">
                Contact Information
              </h3>

              {contactMethods.map((method) => (
                <div
                  key={method.label}
                  className="glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
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
                            <button
                              onClick={method.action}
                              className="p-1 hover:bg-secondary rounded-md transition-colors"
                              title="Copy to clipboard"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-foreground font-medium">
                          {method.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-sm text-muted-foreground mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 group/social"
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
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center glow-border hover:scale-[1.02] transition-transform duration-300">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mb-6 animate-pulse">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-outfit text-foreground mb-4">
                {contactContent.ctaTitle}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-sm">
                {contactContent.ctaDescription}
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                {contactContent.ctaButtonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
