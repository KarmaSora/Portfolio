import { ArrowLeft } from "lucide-react";
import { ProjectDemo } from "./ProjectDemo";
import { projectDemos } from "@/lib/project-demos";
import type { InteractiveDemoKind } from "@/lib/types";
import { withBasePath } from "@/lib/utils";

export function DemoPage({ kind }: { kind: InteractiveDemoKind }) {
  const demo = projectDemos[kind];
  return (
    <main id="main-content" className="min-h-screen bg-background px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <a href={withBasePath("/#project-demos")} className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary"><ArrowLeft size={17} aria-hidden="true" /> Back to Karam&apos;s portfolio</a>
        <header className="mb-8 max-w-3xl"><p className="mb-2 text-sm text-muted-foreground">Karam Matar · Interactive projects</p><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{demo.title}</h1><p className="mt-4 leading-7 text-muted-foreground">{demo.description}</p></header>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-7"><ProjectDemo kind={kind} /></div>
        <a href={withBasePath(`/#${demo.projectId}`)} className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-primary">Project description, screenshots and source</a>
      </div>
    </main>
  );
}
