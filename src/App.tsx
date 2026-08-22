import { SideNav } from "./components/layout/SideNav";
import { TopBar } from "./components/layout/TopBar";
import { LoadingPlaceholder } from "./components/research/LoadingPlaceholder";
import { ResearchForm } from "./components/research/ResearchForm";
import { ResearchResults } from "./components/research/ResearchResults";
import { StepTimeline } from "./components/research/StepTimeline";
import { ErrorAlert } from "./components/ui/ErrorAlert";
import { useResearchStream } from "./hooks/useResearchStream";

function App() {
  const { topic, setTopic, loading, error, steps, result, handleSubmit } = useResearchStream();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav />
      <div className="min-h-screen lg:pl-[280px]">
        <TopBar loading={loading} />
        <main className="min-h-screen overflow-y-auto px-md pb-xl pt-24 sm:px-lg lg:px-xl">
          <div className="mx-auto flex max-w-[960px] flex-col gap-lg">
            <ResearchForm
              topic={topic}
              loading={loading}
              onTopicChange={setTopic}
              onSubmit={handleSubmit}
            />

            <ErrorAlert message={error} />

            <StepTimeline steps={steps} loading={loading} />

            {loading && !result && <LoadingPlaceholder />}

            {result && <ResearchResults result={result} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
