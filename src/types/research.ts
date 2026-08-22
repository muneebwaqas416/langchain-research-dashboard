export type StepName = "search" | "reader" | "writer" | "critic";

export type StepStatus = "pending" | "running" | "completed";

export interface ResearchStep {
  name: StepName;
  status: "running" | "completed";
  output: string;
}

export interface ResearchResult {
  topic: string;
  steps: ResearchStep[];
  search_results: string;
  scraped_content: string;
  report: string;
  feedback: string;
}

export const STEP_ORDER: StepName[] = ["search", "reader", "writer", "critic"];

export const STEP_LABELS: Record<StepName, string> = {
  search: "Search Agent",
  reader: "Reader Agent",
  writer: "Report Writer",
  critic: "Critic Review",
};
