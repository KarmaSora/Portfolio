"use client";

import { useState } from "react";
import { Check, Copy, Github, Linkedin, MapPin } from "lucide-react";
import { useContactContent, usePersonalInfo } from "./PortfolioProvider";

export function Contact() {
  const info = usePersonalInfo();
  const content = useContactContent();
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(info.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="section-space bg-secondary/60">
      <div className="container mx-auto grid gap-8 px-6 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <h2 className="section-title mb-5">Contact</h2>
          <p className="max-w-md text-base leading-7 text-muted-foreground">{content.sectionDescription}</p>
        </div>
        <div className="min-w-0 md:pt-1">
          <div className="flex min-w-0 items-center justify-between gap-3 border-b border-border pb-5">
            <a href={`mailto:${info.email}`} className="min-w-0 break-all text-lg font-semibold tracking-tight text-primary underline-offset-4 hover:underline sm:text-2xl">{info.email}</a>
            <button type="button" onClick={copyEmail} className="icon-link" aria-label="Copy email to clipboard" title="Copy email">
              {copyStatus === "copied" ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
          <p role="status" aria-live="polite" className="mt-2 min-h-6 text-sm text-muted-foreground">
            {copyStatus === "copied" ? "Email copied to clipboard." : copyStatus === "failed" ? "Copy failed. Select the address or use the email link." : ""}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a href={info.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><Github className="h-4 w-4" aria-hidden="true" />GitHub</a>
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{info.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
