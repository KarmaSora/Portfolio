"use client";

import { ArrowUp } from "lucide-react";
import { usePersonalInfo, useFooterContent } from "./PortfolioProvider";

export function Footer() {
  const personalInfo = usePersonalInfo();
  const footerContent = useFooterContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border py-8" aria-label="Site footer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <button
            onClick={scrollToTop}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
