import { API_BASE_URL } from "../config/env";
import type { ResearchResult, ResearchStep } from "../types/research";

type StreamCallbacks = {
  onStart?: (data: { status: string; topic: string }) => void;
  onStep?: (step: ResearchStep) => void;
  onComplete?: (result: ResearchResult) => void;
  onError?: (message: string) => void;
};

export async function runResearch(topic: string): Promise<ResearchResult> {
  const response = await fetch(`${API_BASE_URL}/research/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Research request failed");
  }

  return data as ResearchResult;
}

export function runResearchStream(
  topic: string,
  { onStart, onStep, onComplete, onError }: StreamCallbacks,
): EventSource {
  const url = `${API_BASE_URL}/research/stream/?topic=${encodeURIComponent(topic)}`;
  const eventSource = new EventSource(url);

  eventSource.addEventListener("status", (event) => {
    const data = JSON.parse(event.data) as { status: string; topic: string };
    onStart?.(data);
  });

  eventSource.addEventListener("step", (event) => {
    const step = JSON.parse(event.data) as ResearchStep;
    onStep?.(step);
  });

  eventSource.addEventListener("complete", (event) => {
    const result = JSON.parse(event.data) as ResearchResult;
    onComplete?.(result);
    eventSource.close();
  });

  eventSource.addEventListener("error", (event) => {
    if (event instanceof MessageEvent && event.data) {
      try {
        const data = JSON.parse(event.data) as { error?: string };
        onError?.(data.error || "Streaming failed");
      } catch {
        onError?.("Streaming connection failed");
      }
    } else {
      onError?.("Streaming connection failed");
    }

    eventSource.close();
  });

  return eventSource;
}
