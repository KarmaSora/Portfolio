"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Download, GraduationCap } from "lucide-react";
import { Dialog } from "./Dialog";
import { useCertificates, useDocuments } from "./PortfolioProvider";
import { Certificate, Document as DocumentType } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

export function Documents() {
  const certificates = useCertificates();
  const documents = useDocuments();
  const [previewCertificate, setPreviewCertificate] = useState<Certificate | null>(null);

  const degree = documents.filter((d: DocumentType) => d.type === "degree");

  return (
    <>
      <section
        id="documents"
        aria-label="Documents & Certificates"
        className="section-space"
      >
        <div className="container mx-auto px-6">
          <h2
            className={cn(
              "section-title mb-12 "
            )}
          >
            Documents & Certificates
          </h2>

          {/* Degree */}
          {degree.length > 0 && (
            <div
              className={cn(
                "mb-10 "
              )}
            >
              <h3 className="text-sm font-medium text-muted-foreground  mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Degree
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {degree.map((doc: DocumentType) => (
                  <a
                    key={doc.id}
                    href={withBasePath(doc.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "card rounded-xl p-5 group hover:border-primary/40 transition-colors flex items-start gap-4"
                    )}
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {doc.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.issuer}
                      </p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div
              className={cn(
                "mb-10  "
              )}
            >
              <h3 className="text-sm font-medium text-muted-foreground  mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certificates
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {certificates.map((cert: Certificate) => (
                  <button
                    key={cert.id}
                    onClick={() => setPreviewCertificate(cert)}
                    className={cn(
                      "card rounded-xl overflow-hidden group hover:border-primary/40 transition-colors text-left w-full"
                    )}
                  >
                    {/* Certificate thumbnail */}
                    <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
                      <Image
                        src={withBasePath(cert.image)}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5 rounded-lg bg-background/90 text-foreground text-xs font-medium backdrop-blur-sm">
                          View Certificate
                        </span>
                      </div>
                    </div>
                    {/* Certificate info */}
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cert.date}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {cert.description}
                      </p>
                      {cert.note && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cert.note}</p>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {previewCertificate && (
        <Dialog
          title={previewCertificate.title}
          description={`${previewCertificate.issuer} · ${previewCertificate.date}`}
          closeLabel="Close certificate preview"
          onClose={() => setPreviewCertificate(null)}
          className="max-w-4xl"
        >
          <Image src={withBasePath(previewCertificate.image)} alt={previewCertificate.title} width={1200} height={1600} className="max-h-[65dvh] w-full h-auto rounded-lg object-contain" priority />
          {previewCertificate.note && <p className="mt-4 rounded-lg bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">{previewCertificate.note}</p>}
        </Dialog>
      )}
    </>
  );
}
