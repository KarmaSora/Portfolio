"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Navigation,
  Hero,
  About,
  Experience,
  Education,
  Projects,
  Skills,
  Contact,
  Footer,
} from "@/components";

export default function Home() {
  const [kioskMode, setKioskMode] = useState(false);

  // Handle kiosk mode toggle with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle kiosk mode with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setKioskMode((prev) => !prev);
      }
      // Exit kiosk mode with Escape
      if (e.key === "Escape" && kioskMode) {
        setKioskMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [kioskMode]);

  // Auto-scroll in kiosk mode
  useEffect(() => {
    if (!kioskMode) return;

    let scrollInterval: NodeJS.Timeout;
    let isPaused = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          window.scrollBy({ top: 1, behavior: "auto" });
          
          // Reset to top when reaching bottom
          if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 10
          ) {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 3000);
          }
        }
      }, 50);
    };

    // Pause on user interaction
    const pauseScroll = () => {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
      }, 5000);
    };

    window.addEventListener("mousemove", pauseScroll);
    window.addEventListener("wheel", pauseScroll);
    window.addEventListener("touchstart", pauseScroll);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      window.removeEventListener("mousemove", pauseScroll);
      window.removeEventListener("wheel", pauseScroll);
      window.removeEventListener("touchstart", pauseScroll);
    };
  }, [kioskMode]);

  return (
    <div
      className={cn("relative min-h-screen", kioskMode && "kiosk-mode")}
    >
      {/* Kiosk Mode Indicator */}
      {kioskMode && (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2 glass-card rounded-full text-xs text-muted-foreground animate-fade-in">
          Kiosk Mode Active • Press ESC to exit
        </div>
      )}

      {/* Navigation */}
      <Navigation
        kioskMode={kioskMode}
        onKioskToggle={() => setKioskMode(!kioskMode)}
      />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
