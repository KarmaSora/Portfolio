"use client";

import { ArrowUp } from "lucide-react";
import { useNavItems, usePersonalInfo } from "./PortfolioProvider";

const SECONDARY_SECTIONS = new Set(["education", "documents", "skills"]);

export function Footer() {
  const personalInfo = usePersonalInfo();
  const navItems = useNavItems();

  return (
    <footer className="border-t border-border py-8" aria-label="Site footer">
      <div className="container mx-auto flex flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {personalInfo.name}</p>
        <nav aria-label="Additional sections" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {navItems.filter((item) => SECONDARY_SECTIONS.has(item.id)).map((item) => <a key={item.id} href={item.href} className="inline-flex min-h-11 items-center hover:text-primary">{item.label}</a>)}
        </nav>
        <a href="#home" className="inline-flex min-h-11 items-center gap-2 self-start text-sm text-muted-foreground hover:text-primary md:self-auto">Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
