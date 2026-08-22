import { useCallback, useEffect, useRef, useState } from "react";
import { runResearchStream } from "../api/research";
import type { ResearchResult, ResearchStep } from "../types/research";

export function useResearchStream() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [steps, setSteps] = useState<ResearchStep[]>([]);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const trimmedTopic = topic.trim();
      if (!trimmedTopic) {
        setError("Please provide a topic.");
        return;
      }

      eventSourceRef.current?.close();
      setLoading(true);
      setError("");
      setResult(null);
      setSteps([]);

      eventSourceRef.current = runResearchStream(trimmedTopic, {
        onStart: () => setSteps([]),
        onStep: (step) => setSteps((prev) => [...prev, step]),
        onComplete: (data) => {
          setResult(data);
          setLoading(false);
          eventSourceRef.current = null;
        },
        onError: (message) => {
          setError(message);
          setLoading(false);
          eventSourceRef.current = null;
        },
      });
    },
    [topic],
  );

  return {
    topic,
    setTopic,
    loading,
    error,
    steps,
    result,
    handleSubmit,
  };
}
