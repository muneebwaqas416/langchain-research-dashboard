import { AlertCircle } from "lucide-react";
import { Panel } from "../ui/panel";

type ErrorAlertProps = {
  message: string;
};

export function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) {
    return null;
  }

  return (
    <Panel className="flex items-start gap-md border-error/30 bg-error/5 p-md" role="alert">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
      <div>
        <p className="text-body-sm font-semibold text-error">Request failed</p>
        <p className="mt-xs text-body-sm text-on-surface-variant">{message}</p>
      </div>
    </Panel>
  );
}
