import { FileText, MessageSquareQuote, Search } from "lucide-react";
import type { ResearchResult } from "../../types/research";
import { Badge } from "../ui/badge";
import { MarkdownContent } from "../ui/MarkdownContent";
import { Panel } from "../ui/panel";
import { CollapsibleSection } from "./CollapsibleSection";

type ResearchResultsProps = {
  result: ResearchResult;
};

export function ResearchResults({ result }: ResearchResultsProps) {
  return (
    <div className="flex flex-col gap-lg">
      <Panel className="p-lg sm:p-xl">
        <div className="mb-md flex items-center gap-sm">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-headline-md text-on-surface">Research Report</h2>
          <Badge tone="success">Complete</Badge>
        </div>
        <MarkdownContent content={result.report} />
      </Panel>

      <Panel className="p-lg">
        <div className="mb-md flex items-center gap-sm">
          <MessageSquareQuote className="h-5 w-5 text-tertiary" />
          <h2 className="text-body-md font-semibold text-on-surface">Critic Review</h2>
        </div>
        <MarkdownContent content={result.feedback} variant="default" className="text-body-sm" />
      </Panel>

      <div className="flex flex-col gap-md">
        <div className="flex items-center gap-sm px-xs">
          <Search className="h-4 w-4 text-on-surface-variant" />
          <h3 className="text-label-md uppercase tracking-[0.1em] text-on-surface-variant">Supporting Evidence</h3>
        </div>
        <CollapsibleSection title="Search Results" content={result.search_results} />
        <CollapsibleSection title="Scraped Content" content={result.scraped_content} />
      </div>
    </div>
  );
}
