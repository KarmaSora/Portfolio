"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, Menu, Monitor, X } from "lucide-react";
import { cn, withBasePath } from "@/lib/utils";
import { useNavItems, usePersonalInfo } from "./PortfolioProvider";
import { ThemeToggle } from "./ThemeToggle";

interface NavigationProps {
  kioskMode: boolean;
  onKioskToggle: () => void;
}

const PRIMARY_SECTIONS = new Set(["experience", "projects", "references", "about", "contact"]);
const SECONDARY_SECTIONS = new Set(["education", "documents", "skills"]);

export function Navigation({ kioskMode, onKioskToggle }: NavigationProps) {
  const navItems = useNavItems();
  const personalInfo = usePersonalInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeNavigation = () => {
    setIsOpen(false);
    setIsMoreOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const current = [...navItems].reverse().find((item) => {
        const section = document.getElementById(item.id);
        return section && section.getBoundingClientRect().top <= 150;
      });
      setActiveSection(current?.id ?? "home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navItems]);

  useEffect(() => {
    if (!isOpen && !isMoreOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsMoreOpen(false);
        (isMoreOpen ? moreButtonRef : menuButtonRef).current?.focus();
      }
    };
    const onOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsOpen(false);
        setIsMoreOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => {
      setIsOpen(false);
      setIsMoreOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    window.addEventListener("pointerdown", onOutsidePress);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("pointerdown", onOutsidePress);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen, isMoreOpen]);

  return (
    <header ref={headerRef} className={cn("site-header fixed inset-x-0 top-0 z-50", scrolled || isOpen ? "border-border bg-background/95 shadow-sm backdrop-blur-xl" : "border-transparent bg-background/90", kioskMode && "kiosk-hidden")}>
      <nav className="container mx-auto flex h-20 items-center justify-between gap-4 px-5 sm:px-6" aria-label="Main navigation">
        <a href="#home" onClick={closeNavigation} className="wordmark shrink-0" aria-label={`${personalInfo.name}, home`}>{personalInfo.name}</a>
        <div className="hidden items-center gap-7 xl:flex">
          {navItems.filter((item) => PRIMARY_SECTIONS.has(item.id)).map((item) => (
            <a key={item.id} href={item.href} onClick={closeNavigation} aria-current={activeSection === item.id ? "location" : undefined} className={cn("nav-item", activeSection === item.id && "is-active")}>{item.label}</a>
          ))}
          <div className="relative">
            <button type="button" ref={moreButtonRef} onClick={() => setIsMoreOpen((open) => !open)} aria-label="More sections" aria-expanded={isMoreOpen} aria-controls="additional-navigation" className={cn("nav-item gap-1.5", SECONDARY_SECTIONS.has(activeSection) && "is-active")}>
              More <ChevronDown className={cn("h-4 w-4 transition-transform", isMoreOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {isMoreOpen && (
              <div id="additional-navigation" className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-border bg-background p-2 shadow-sm">
                {navItems.filter((item) => SECONDARY_SECTIONS.has(item.id)).map((item) => (
                  <a key={item.id} href={item.href} onClick={closeNavigation} aria-current={activeSection === item.id ? "location" : undefined} className={cn("flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary", activeSection === item.id ? "text-accent" : "text-muted-foreground")}>{item.label}</a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="hidden items-center gap-2 xl:flex">
          <ThemeToggle />
          <button type="button" onClick={onKioskToggle} className="icon-link" title="Presentation mode (Ctrl+K)" aria-label={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}>
            <Monitor className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <a href={withBasePath(personalInfo.resumeUrl)} download className="button-secondary ml-2">Download CV</a>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <a href={withBasePath(personalInfo.resumeUrl)} download className="button-secondary px-3 text-sm" aria-label="Download CV">
            <Download className="h-4 w-4" aria-hidden="true" /><span><span className="hidden min-[400px]:inline">Download </span>CV</span>
          </a>
          <button type="button" ref={menuButtonRef} onClick={() => setIsOpen((open) => !open)} className="icon-link shrink-0" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} aria-controls="mobile-navigation">
            {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div id="mobile-navigation" role="navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background px-6 py-5 xl:hidden">
          <div className="container mx-auto grid gap-x-8 gap-y-1 px-0 sm:grid-cols-2">
            {navItems.map((item) => (
              <a key={item.id} href={item.href} onClick={() => setIsOpen(false)} aria-current={activeSection === item.id ? "location" : undefined} className={cn("min-h-11 rounded-lg px-3 py-3 font-medium hover:bg-secondary", activeSection === item.id ? "text-accent" : "text-muted-foreground")}>{item.label}</a>
            ))}
            <div className="col-span-full mt-4 flex items-center gap-3 border-t border-border pt-4">
              <ThemeToggle />
              <button type="button" onClick={() => { setIsOpen(false); onKioskToggle(); }} className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-muted-foreground hover:text-primary" aria-label={kioskMode ? "Exit Kiosk Mode" : "Enter Kiosk Mode"}>
                <Monitor className="h-4 w-4" aria-hidden="true" /> Presentation mode
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
