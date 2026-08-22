import { Bot, Sparkles } from "lucide-react";

export function SideNav() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[280px] flex-col border-r border-white/10 bg-surface/80 px-md py-lg backdrop-blur-xl lg:flex">
      <div className="px-xs">
        <div className="flex items-center gap-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary shadow-glow">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-headline-md font-bold text-primary">Nexus AI</h1>
            <p className="text-label-md uppercase tracking-[0.16em] text-on-surface-variant/60">
              Multi-Agent Research
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-md rounded-xl border border-white/5 bg-surface-container p-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <Bot className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-label-md font-bold text-on-surface">Research Pipeline</p>
            <p className="truncate text-label-md text-on-surface-variant/70">Streaming API</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
