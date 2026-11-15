"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Dialog } from "../Dialog";
import { projectDemos } from "@/lib/project-demos";
import type { InteractiveDemoKind } from "@/lib/types";
import { withBasePath } from "@/lib/utils";

const loading = () => <p role="status" className="flex min-h-40 items-center justify-center gap-3 text-sm text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Loading interactive demo…</p>;
const Compiler = dynamic(() => import("./CompilerDemo"), { loading });
const Arm = dynamic(() => import("./ArmDemo"), { loading });
const Showcase = dynamic(() => import("./ShowcaseDemo"), { loading });

export function ProjectDemo({ kind }: { kind: InteractiveDemoKind }) {
  return kind === "compiler" ? <Compiler /> : kind === "arm" ? <Arm /> : <Showcase />;
}

export function ProjectDemoDialog({ kind, onClose }: { kind: InteractiveDemoKind; onClose: () => void }) {
  const demo = projectDemos[kind];
  return (
    <Dialog title={demo.title} description={demo.description} closeLabel="Close interactive demo" onClose={onClose}>
      <ProjectDemo kind={kind} />
      <div className="mt-6 border-t border-border pt-3">
        <a href={withBasePath(`/demos/${kind}/`)} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary">Open full demo page <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
      </div>
    </Dialog>
  );
}
