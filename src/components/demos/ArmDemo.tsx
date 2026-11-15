import program from "@/data/arm-program.json";
import { withBasePath } from "@/lib/utils";

export const cpulatorUrl = `https://cpulator.01xz.net/?sys=arm-de1soc&loadelf=${encodeURIComponent(`data:application/octet-stream;base64,${program.base64}`)}`;

export default function ArmDemo({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <section className={fullPage ? "flex min-h-0 flex-1 flex-col" : "flex flex-col gap-3"} data-demo="arm">
      <div className="shrink-0 border-b border-gray-300 bg-white px-4 py-3 text-sm leading-6 text-gray-800">
        <p><strong>Your original program is preloaded.</strong> Press <strong>Continue (F3)</strong>, then type <code>u</code> or <code>d</code> in <strong>JTAG UART</strong>.</p>
        <p>Press/release <strong>KEY1</strong> to count up or <strong>KEY0</strong> to count down. In toggle mode, click again to release.</p>
        <div className="mt-1 flex flex-wrap gap-x-6">
          <a href={cpulatorUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-medium underline underline-offset-4">Open CPUlator in its own tab ↗</a>
          <a href={withBasePath("/demos/arm/controller.elf")} download="controller.elf" className="inline-flex min-h-11 items-center underline underline-offset-4">Download controller.elf</a>
          <a href="https://cpulator.01xz.net/doc/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4">CPUlator help</a>
        </div>
      </div>
      <iframe
        title="CPUlator ARMv7 DE1-SoC — original display controller"
        src={cpulatorUrl}
        className={fullPage ? "min-h-0 w-full flex-1 border-0 bg-white" : "h-[75dvh] min-h-[560px] w-full border-0 bg-white"}
        allow="fullscreen"
        allowFullScreen
      />
    </section>
  );
}
