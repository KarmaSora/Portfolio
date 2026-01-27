"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      aria-hidden="true"
    />
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status badge */}
          <Skeleton className="h-10 w-48 mx-auto rounded-full" />

          {/* Name */}
          <div className="space-y-4">
            <Skeleton className="h-16 md:h-24 w-64 mx-auto" />
            <Skeleton className="h-16 md:h-24 w-48 mx-auto" />
          </div>

          {/* Title */}
          <Skeleton className="h-8 w-96 mx-auto" />

          {/* Bio */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
            <Skeleton className="h-4 w-4/6 mx-auto" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>

          {/* Social links */}
          <div className="flex gap-4 justify-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <Skeleton className="h-10 w-48 mx-auto mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSkeleton() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <Skeleton className="h-10 w-48 mx-auto mb-12" />
        <div className="max-w-3xl mx-auto space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSkeleton() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <Skeleton className="h-10 w-32 mx-auto mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="flex gap-2 flex-wrap">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-14 rounded-full" />
                <Skeleton className="h-8 w-18 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FullPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation skeleton */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6">
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="hidden md:flex items-center gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </nav>
      </header>

      <HeroSkeleton />
      <ExperienceSkeleton />
      <ProjectsSkeleton />
      <SkillsSkeleton />
    </div>
  );
}
