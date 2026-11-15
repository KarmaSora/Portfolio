import ArmDemo from "@/components/demos/ArmDemo";
import { projectDemos } from "@/lib/project-demos";
import { withBasePath } from "@/lib/utils";

export const metadata = { title: "ARMv7 controller in CPUlator | Karam Matar", description: projectDemos.arm.description };

export default function ArmPage() {
  return (
    <main id="main-content" className="flex h-dvh flex-col bg-white text-gray-800" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <nav aria-label="Demo navigation" className="flex min-h-11 shrink-0 flex-wrap items-center justify-between gap-x-4 border-b border-gray-300 px-4 text-sm">
        <a href={withBasePath("/#armv7-display-controller")} className="inline-flex min-h-11 items-center hover:underline">← Back to portfolio</a>
        <span>ARMv7 Display Controller · CPUlator</span>
      </nav>
      <ArmDemo fullPage />
    </main>
  );
}
