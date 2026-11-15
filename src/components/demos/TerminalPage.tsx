import { withBasePath } from "@/lib/utils";
import runtime from "@/data/terminal-runtime.json";

export default function TerminalPage({ project, title }: { project: "marvin" | "typing" | "analyser" | "fat"; title: string }) {
  return (
    <main id="main-content" className="h-dvh bg-[#101214]">
      <iframe src={withBasePath(`/project-apps/terminal/index.html?project=${project}&v=${runtime.revision}`)} title={`${title} — original program in a browser terminal`} className="h-full w-full border-0" />
    </main>
  );
}
