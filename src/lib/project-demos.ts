import type { InteractiveDemoKind } from "./types";

export const projectDemos: Record<InteractiveDemoKind, { title: string; label: string; description: string; projectId: string }> = {
  compiler: {
    title: "Inside the compiler",
    label: "Compiler walkthrough",
    description: "Explore recorded outputs from the original C++ compiler, from source and generated graphs to bytecode and execution.",
    projectId: "compiler-from-scratch",
  },
  arm: {
    title: "ARMv7 controller in CPUlator",
    label: "ARM in CPUlator",
    description: "Run the original compiled controller in CPUlator’s DE1-SoC interface, using its native UART, display and push-button controls.",
    projectId: "armv7-display-controller",
  },
  showcase: {
    title: "Explore ShowcaseSERL",
    label: "ShowcaseSERL demo",
    description: "Run the original ShowcaseSERL application with its own interface, bundled catalogue, search and kiosk mode.",
    projectId: "showcase-serl",
  },
};

export const demoKinds = Object.keys(projectDemos) as InteractiveDemoKind[];
