import { Activity, Loader2 } from "lucide-react";
import { Panel } from "../ui/panel";

export function LoadingPlaceholder() {
  return (
    <Panel className="flex min-h-[320px] flex-col items-center justify-center gap-md p-xl">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-full w-full rounded-full border border-primary/20" />
        <span className="absolute h-full w-full animate-orbit rounded-full border-t-2 border-primary" />
        <Activity className="h-7 w-7 text-primary" />
      </div>
      <div className="text-center">
        <p className="flex items-center justify-center gap-sm text-body-md text-on-surface-variant">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Researching your topic...
        </p>
        <p className="mt-sm text-label-md text-on-surface-variant/60">
          Agents are searching, reading, writing, and reviewing.
        </p>
      </div>
    </Panel>
  );
}
