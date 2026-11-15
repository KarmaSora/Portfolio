import { DemoPage } from "@/components/demos/DemoPage";
import { projectDemos } from "@/lib/project-demos";

export const metadata = { title: "Compiler walkthrough | Karam Matar", description: projectDemos.compiler.description };

export default function CompilerPage() {
  return <DemoPage kind="compiler" />;
}
