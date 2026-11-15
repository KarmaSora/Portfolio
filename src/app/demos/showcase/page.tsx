import ShowcaseDemo from "@/components/demos/ShowcaseDemo";
import { withBasePath } from "@/lib/utils";

export const metadata = { title: "ShowcaseSERL — Original application", description: "The original ShowcaseSERL application, with its own interface, project catalogue and kiosk mode." };

export default function ShowcasePage() {
  return (
    <main id="main-content" className="flex h-dvh flex-col bg-[#faf3e0] text-[#4a3f35]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <nav aria-label="Demo navigation" className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 border-b border-[#d8cbb0] px-4 text-sm">
        <a href={withBasePath("/#showcase-serl")} className="inline-flex min-h-11 items-center hover:underline">← Back to portfolio</a>
        <a href={withBasePath("/project-apps/showcase/index.html")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:underline">Open application in its own tab ↗</a>
      </nav>
      <ShowcaseDemo fullPage />
    </main>
  );
}
