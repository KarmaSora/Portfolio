"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavItems } from "./PortfolioProvider";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  kioskMode: boolean;
  onKioskToggle: () => void;
}

export function Navigation({ kioskMode, onKioskToggle }: NavigationProps) {
  const navItems = useNavItems();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3"
          : "bg-transparent py-6",
        kioskMode && "kiosk-hidden",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="text-xl font-bold font-outfit tracking-tight group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-foreground group-hover:text-primary transition-colors">
            K
          </span>
          <span className="text-primary">.</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            Matar
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={cn(
                "nav-link text-sm font-medium transition-colors hover:text-primary relative",
                activeSection === item.id
                  ? "text-primary active"
                  : "text-muted-foreground",
              )}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <motion.button
            onClick={onKioskToggle}
            className={cn(
              "p-2 rounded-lg transition-all hover:bg-secondary",
              kioskMode && "bg-primary text-primary-foreground",
            )}
            title={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode (Ctrl+K)"}
            aria-label={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Monitor className="w-4 h-4" aria-hidden="true" />
          </motion.button>
          <motion.a
            href="/resume.pdf"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="container mx-auto px-6 py-4 flex flex-col gap-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.a
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                className="flex items-center gap-4 pt-4 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <ThemeToggle />
                <button
                  onClick={onKioskToggle}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label={
                    kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"
                  }
                >
                  <Monitor className="w-5 h-5" aria-hidden="true" />
                </button>
                <a
                  href="/resume.pdf"
                  className="flex-1 text-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
                >
                  Resume
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
