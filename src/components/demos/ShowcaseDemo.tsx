import { withBasePath } from "@/lib/utils";

export default function ShowcaseDemo({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <iframe
      title="ShowcaseSERL original application"
      src={withBasePath("/project-apps/showcase/index.html")}
      className={fullPage ? "min-h-0 w-full flex-1 border-0 bg-[#faf3e0]" : "h-[min(75dvh,760px)] w-full rounded-lg border-0 bg-[#faf3e0]"}
      allow="fullscreen"
      allowFullScreen
    />
  );
}
