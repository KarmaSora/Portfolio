"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Award, FileText, Download, GraduationCap, X } from "lucide-react";
import { useCertificates, useDocuments } from "./PortfolioProvider";
import { Certificate, Document as DocumentType } from "@/lib/types";
import { cn, withBasePath } from "@/lib/utils";

export function Documents() {
  const certificates = useCertificates();
  const documents = useDocuments();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const degree = documents.filter((d: DocumentType) => d.type === "degree");
  const recommendations = documents.filter(
    (d: DocumentType) => d.type === "recommendation"
  );

  return (
    <>
      <section
        id="documents"
        ref={sectionRef}
        aria-label="Documents & Certificates"
        className="py-20 md:py-28"
      >
        <div className="container mx-auto px-6">
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold mb-12 transition-all duration-500",
              isInView ? "opacity-100" : "opacity-0"
            )}
          >
            Documents & Certificates
          </h2>

          {/* Degree */}
          {degree.length > 0 && (
            <div
              className={cn(
                "mb-10 transition-all duration-500",
                isInView ? "opacity-100" : "opacity-0"
              )}
            >
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Degree
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {degree.map((doc: DocumentType, index: number) => (
                  <a
                    key={doc.id}
                    href={withBasePath(doc.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "card rounded-xl p-5 group hover:shadow-md transition-all duration-300 flex items-start gap-4"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {doc.issuer}
                      </p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div
              className={cn(
                "mb-10 transition-all duration-500 delay-100",
                isInView ? "opacity-100" : "opacity-0"
              )}
            >
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certificates
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {certificates.map((cert: Certificate, index: number) => (
                  <button
                    key={cert.id}
                    onClick={() => setLightboxImage(cert.image)}
                    className={cn(
                      "card rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300 text-left w-full"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {cert.date}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                        {cert.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation Letters */}
          {recommendations.length > 0 && (
            <div
              className={cn(
                "transition-all duration-500 delay-200",
                isInView ? "opacity-100" : "opacity-0"
              )}
            >
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Recommendation Letters
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((doc: DocumentType, index: number) => (
                  <a
                    key={doc.id}
                    href={withBasePath(doc.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "card rounded-xl p-5 group hover:shadow-md transition-all duration-300 flex items-start gap-4"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {doc.subtitle}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {doc.issuer}
                      </p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox for certificate images */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-label="Certificate preview"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            aria-label="Close preview"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={withBasePath(lightboxImage)}
              alt="Certificate"
              width={1200}
              height={800}
              className="rounded-xl object-contain w-full h-auto max-h-[85vh]"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
