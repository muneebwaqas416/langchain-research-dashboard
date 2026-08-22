import { Loader2, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Panel } from "../ui/panel";

type ResearchFormProps = {
  topic: string;
  loading: boolean;
  onTopicChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function ResearchForm({ topic, loading, onTopicChange, onSubmit }: ResearchFormProps) {
  return (
    <Panel className="p-lg">
      <form onSubmit={onSubmit} className="flex flex-col gap-md sm:flex-row sm:items-center">
        <div className="flex-1">
          <label htmlFor="research-topic" className="mb-xs block text-label-md text-on-surface-variant">
            Research Topic
          </label>
          <Input
            id="research-topic"
            placeholder="Enter research topic"
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
            disabled={loading}
            aria-label="Research topic"
          />
        </div>
        <Button type="submit" disabled={loading || !topic.trim()} className="sm:mt-5 sm:min-w-[180px]">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Researching...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Research
            </>
          )}
        </Button>
      </form>
    </Panel>
  );
}
