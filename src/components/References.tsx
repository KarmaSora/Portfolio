"use client";

import { FileText, ExternalLink, Mail, Linkedin, Phone, Quote } from "lucide-react";
import { usePortfolio } from "./PortfolioProvider";
import { withBasePath } from "@/lib/utils";

export function References() {
  const { data } = usePortfolio();
  const content = data.referencesContent ?? {
    sectionTitle: "References & recommendations",
    sectionDescription: "Read written recommendations from my thesis supervisors, or get in touch to discuss professional references.",
    requestLabel: "Request references",
    requestDescription: "Get in touch to discuss references relevant to the role.",
  };
  const references = data.professionalReferences ?? [];
  const letters = data.documents.filter((document) => document.type === "recommendation");
  const requestUrl = `mailto:${data.personalInfo.email}?subject=${encodeURIComponent("Professional references request")}`;

  return (
    <section id="references" aria-label="Professional references and recommendations" className="section-space bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <h2 className="section-title mb-4">{content.sectionTitle}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{content.sectionDescription}</p>
        </div>

        {references.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 mb-10">
            {references.map((reference) => (
              <article key={reference.id} className="card rounded-xl p-6">
                <h3 className="text-lg font-semibold">{reference.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{reference.role} · {reference.organization}</p>
                <p className="mt-3 text-sm font-medium">{reference.relationship}</p>
                {reference.quote && (
                  <blockquote className="mt-4 border-l-2 border-primary pl-4 text-base leading-relaxed text-muted-foreground">
                    <Quote className="mb-2 h-4 w-4 text-primary" aria-hidden="true" />
                    <p>{reference.quote}</p>
                  </blockquote>
                )}
                {reference.canDiscuss && reference.canDiscuss.length > 0 && (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Can speak about: {reference.canDiscuss.join(", ")}.</p>
                )}
                {(reference.email || reference.phone || reference.linkedin) && (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                    {reference.email && <a href={`mailto:${reference.email}`} className="inline-flex items-center gap-2 text-primary hover:underline"><Mail className="h-4 w-4" aria-hidden="true" />Email</a>}
                    {reference.phone && <a href={`tel:${reference.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 text-primary hover:underline"><Phone className="h-4 w-4" aria-hidden="true" />Phone</a>}
                    {reference.linkedin && <a href={reference.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline"><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {letters.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-medium  text-muted-foreground mb-4">Written recommendations</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {letters.map((letter) => (
                <a key={letter.id} href={withBasePath(letter.file)} target="_blank" rel="noopener noreferrer" className="card rounded-xl p-5 flex items-start gap-4 transition-shadow hover:border-primary/40 group">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary shrink-0"><FileText className="h-5 w-5" aria-hidden="true" /></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold group-hover:text-primary">{letter.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{letter.subtitle}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{letter.issuer}</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="card rounded-xl p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{content.requestDescription}</p>
          <a href={requestUrl} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 shrink-0">
            <Mail className="h-4 w-4" aria-hidden="true" />{content.requestLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
