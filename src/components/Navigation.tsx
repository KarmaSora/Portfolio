"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Monitor, Download } from "lucide-react";
import { cn, withBasePath } from "@/lib/utils";
import { useNavItems, usePersonalInfo } from "./PortfolioProvider";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  kioskMode: boolean;
  onKioskToggle: () => void;
}

export function Navigation({ kioskMode, onKioskToggle }: NavigationProps) {
  const navItems = useNavItems();
  const personalInfo = usePersonalInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  // Get name parts for logo
  const nameParts = personalInfo.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      let found = false;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }
      
      // If no section found (at very top), default to home
      if (!found) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3"
          : "bg-transparent py-6",
        kioskMode && "kiosk-hidden",
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-3" aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="text-lg sm:text-xl font-bold tracking-tight group shrink-0 whitespace-nowrap"
        >
          <span className="text-foreground group-hover:text-primary transition-colors">
            {firstName.charAt(0)}
          </span>
          <span className="text-primary">.</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate inline-block max-w-[9rem] sm:max-w-none align-bottom">
            {lastName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <button
            onClick={onKioskToggle}
            className={cn(
              "p-2 rounded-lg transition-all hover:bg-secondary",
              kioskMode && "bg-primary text-primary-foreground",
            )}
            title={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode (Ctrl+K)"}
            aria-label={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}
          >
            <Monitor className="w-4 h-4" aria-hidden="true" />
          </button>
          <a
            href={withBasePath(personalInfo.resumeUrl)}
            download
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Download CV
          </a>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a href={withBasePath(personalInfo.resumeUrl)} download className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        {/* Compact navigation */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-secondary transition-colors shrink-0"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            className="xl:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border max-h-[calc(100dvh-6rem)] overflow-y-auto overflow-x-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 pb-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "text-base font-medium py-2 transition-colors hover:text-primary",
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <ThemeToggle />
                <button
                  onClick={onKioskToggle}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}
                >
                  <Monitor className="w-5 h-5" aria-hidden="true" />
                </button>
                <a
                  href={withBasePath(personalInfo.resumeUrl)}
                  download
                  className="flex-1 text-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
