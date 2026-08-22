import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { STEP_LABELS, STEP_ORDER, type ResearchStep, type StepName, type StepStatus } from "../../types/research";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { MarkdownContent } from "../ui/MarkdownContent";
import { Panel } from "../ui/panel";

type StepTimelineProps = {
  steps: ResearchStep[];
  loading: boolean;
};

function resolveStatus(name: StepName, latestByName: Partial<Record<StepName, ResearchStep>>): StepStatus {
  const step = latestByName[name];
  if (!step) return "pending";
  return step.status === "running" ? "running" : "completed";
}

const statusTone: Record<StepStatus, "muted" | "primary" | "success"> = {
  pending: "muted",
  running: "primary",
  completed: "success",
};

const statusLabel: Record<StepStatus, string> = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
};

export function StepTimeline({ steps, loading }: StepTimelineProps) {
  const latestByName = Object.fromEntries(
    steps.map((step) => [step.name, step]),
  ) as Partial<Record<StepName, ResearchStep>>;

  const completedCount = STEP_ORDER.filter((name) => latestByName[name]?.status === "completed").length;
  const progress = loading
    ? Math.round((completedCount / STEP_ORDER.length) * 100)
    : completedCount === STEP_ORDER.length
      ? 100
      : 0;

  const stepsWithOutput = STEP_ORDER.filter((name) => latestByName[name]?.output?.trim());

  if (!loading && steps.length === 0) {
    return null;
  }

  return (
    <Panel className="p-lg">
      <div className="mb-lg flex items-center justify-between gap-md">
        <h3 className="text-body-md font-semibold text-on-surface">Agent Progress</h3>
        {loading && <Badge tone="primary">{progress}%</Badge>}
      </div>

      <div className="relative grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        <div className="absolute left-6 right-6 top-6 hidden h-px bg-white/5 lg:block" />
        <div
          className="absolute left-6 top-6 hidden h-px bg-primary shadow-glow transition-all duration-500 lg:block"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />

        {STEP_ORDER.map((name) => {
          const status = resolveStatus(name, latestByName);

          return (
            <div key={name} className="relative z-10 flex items-center gap-sm lg:flex-col lg:text-center">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-surface transition-all",
                  status === "completed" && "bg-secondary text-on-secondary shadow-glow-success",
                  status === "running" && "animate-pulse-glow border-primary bg-primary-container text-on-primary-container",
                  status === "pending" && "bg-surface-variant text-on-surface-variant opacity-45",
                )}
              >
                {status === "running" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </div>
              <div className={cn(status === "pending" && "opacity-60")}>
                <p
                  className={cn(
                    "text-label-md font-bold",
                    status === "completed" && "text-secondary",
                    status === "running" && "text-primary",
                    status === "pending" && "text-on-surface-variant",
                  )}
                >
                  {STEP_LABELS[name]}
                </p>
                <div className="mt-xs flex items-center gap-xs lg:justify-center">
                  <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {stepsWithOutput.length > 0 && (
        <div className="mt-lg space-y-md border-t border-white/5 pt-lg">
          <h4 className="text-label-md uppercase tracking-[0.1em] text-on-surface-variant">Agent Output</h4>
          {stepsWithOutput.map((name) => {
            const step = latestByName[name]!;
            const status = resolveStatus(name, latestByName);

            return (
              <div
                key={name}
                className="rounded-lg border border-white/5 bg-surface-container-low/50 p-md"
              >
                <div className="mb-sm flex items-center justify-between gap-sm">
                  <span className="text-body-sm font-semibold text-on-surface">{STEP_LABELS[name]}</span>
                  <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>
                </div>
                <div className="max-h-48 overflow-y-auto rounded-md border border-white/5 bg-surface-container-lowest/60 p-sm">
                  <MarkdownContent content={step.output} variant="compact" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Panel>
  );
}
