import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";

type TopBarProps = {
  loading: boolean;
};

export function TopBar({ loading }: TopBarProps) {
  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-white/10 bg-surface/80 px-md backdrop-blur-xl sm:px-lg lg:w-[calc(100%-280px)] lg:px-xl">
      <div className="flex min-w-0 items-center gap-md">
        <h2 className="text-body-md font-semibold text-on-surface">Research Dashboard</h2>
        {loading && (
          <Badge tone="primary" className="gap-xs">
            <Loader2 className="h-3 w-3 animate-spin" />
            Researching
          </Badge>
        )}
      </div>
    </header>
  );
}
