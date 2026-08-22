import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../lib/utils";

type MarkdownVariant = "default" | "compact";

type MarkdownContentProps = {
  content: string;
  variant?: MarkdownVariant;
  className?: string;
};

function createComponents(variant: MarkdownVariant): Components {
  const isCompact = variant === "compact";

  return {
    h1: ({ children }) => (
      <h1
        className={cn(
          "font-bold text-on-surface",
          isCompact ? "mb-xs mt-sm text-body-sm" : "mb-md mt-lg text-headline-md first:mt-0",
        )}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={cn(
          "font-semibold text-on-surface",
          isCompact ? "mb-xs mt-sm text-body-sm" : "mb-sm mt-lg text-body-lg first:mt-0",
        )}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={cn(
          "font-semibold text-on-surface",
          isCompact ? "mb-xs mt-xs text-label-md" : "mb-xs mt-md text-body-md first:mt-0",
        )}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={cn("font-semibold text-on-surface", isCompact ? "mb-xs text-label-md" : "mb-xs text-body-sm")}>
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p
        className={cn(
          "text-on-surface-variant leading-relaxed",
          isCompact ? "mb-xs text-[11px] leading-4 last:mb-0" : "mb-md text-body-md last:mb-0",
        )}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        className={cn(
          "list-disc text-on-surface-variant",
          isCompact ? "mb-xs ml-md space-y-0.5 text-[11px]" : "mb-md ml-lg space-y-xs text-body-md",
        )}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={cn(
          "list-decimal text-on-surface-variant",
          isCompact ? "mb-xs ml-md space-y-0.5 text-[11px]" : "mb-md ml-lg space-y-xs text-body-md",
        )}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote
        className={cn(
          "border-l-2 border-primary/40 text-on-surface-variant",
          isCompact ? "my-xs pl-sm text-[11px] italic" : "my-md border-l-4 pl-md text-body-sm italic",
        )}
      >
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary-fixed hover:decoration-primary"
      >
        {children}
      </a>
    ),
    code: ({ className, children }) => {
      const isBlock = className?.includes("language-");

      if (isBlock) {
        return <code className={cn("font-mono text-mono-md", className)}>{children}</code>;
      }

      return (
        <code
          className={cn(
            "rounded bg-surface-container-high px-1 py-0.5 font-mono text-primary",
            isCompact ? "text-[10px]" : "text-mono-md",
          )}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre
        className={cn(
          "overflow-x-auto rounded-lg border border-white/10 bg-surface-container-low font-mono text-on-surface-variant",
          isCompact ? "my-xs p-sm text-[10px] leading-4" : "my-md p-md text-mono-md",
        )}
      >
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className={cn("overflow-x-auto", isCompact ? "my-xs" : "my-md")}>
        <table className="w-full border-collapse text-left">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="border-b border-white/10">{children}</thead>,
    th: ({ children }) => (
      <th
        className={cn(
          "font-semibold text-on-surface",
          isCompact ? "px-sm py-xs text-[10px]" : "px-md py-sm text-label-md",
        )}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        className={cn(
          "border-t border-white/5 text-on-surface-variant",
          isCompact ? "px-sm py-xs text-[10px]" : "px-md py-sm text-body-sm",
        )}
      >
        {children}
      </td>
    ),
    hr: () => <hr className={cn("border-white/10", isCompact ? "my-sm" : "my-lg")} />,
    strong: ({ children }) => <strong className="font-semibold text-on-surface">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  };
}

export function MarkdownContent({ content, variant = "default", className }: MarkdownContentProps) {
  if (!content?.trim()) {
    return null;
  }

  return (
    <div className={cn("markdown-content", variant === "compact" && "markdown-content-compact", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={createComponents(variant)}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
