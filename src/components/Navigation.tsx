"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Monitor } from "lucide-react";
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
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="text-xl font-bold font-outfit tracking-tight group"
        >
          <span className="text-foreground group-hover:text-primary transition-colors">
            {firstName.charAt(0)}
          </span>
          <span className="text-primary">.</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {lastName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
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
        <div className="hidden md:flex items-center gap-4">
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
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
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
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
