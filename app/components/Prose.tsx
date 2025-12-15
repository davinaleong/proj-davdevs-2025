import { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export default function Prose({ children, className = "" }: ProseProps) {
  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      <style jsx global>{`
        /* ===============================
           Prose base
        =============================== */
        .prose {
          color: var(--prose-body);
          line-height: 1.75;
        }

        /* ===============================
           Light mode variables
        =============================== */
        .prose-gray {
          --prose-body: #374151;
          --prose-headings: #111827;
          --prose-lead: #4b5563;
          --prose-links: #3b82f6;
          --prose-bold: #111827;
          --prose-counters: #6b7280;
          --prose-bullets: #d1d5db;
          --prose-hr: #e5e7eb;
          --prose-quotes: #111827;
          --prose-quote-borders: #e5e7eb;
          --prose-captions: #6b7280;
          --prose-code: #111827;
          --prose-pre-code: #e5e7eb;
          --prose-pre-bg: #1f2937;
          --prose-th-borders: #d1d5db;
          --prose-td-borders: #e5e7eb;
        }

        /* ===============================
           Dark mode variables
        =============================== */
        .dark .prose-gray {
          --prose-body: #d1d5db;
          --prose-headings: #f9fafb;
          --prose-lead: #9ca3af;
          --prose-links: #60a5fa;
          --prose-bold: #f9fafb;
          --prose-counters: #9ca3af;
          --prose-bullets: #4b5563;
          --prose-hr: #374151;
          --prose-quotes: #f9fafb;
          --prose-quote-borders: #374151;
          --prose-captions: #9ca3af;
          --prose-code: #f9fafb;
          --prose-pre-code: #d1d5db;
          --prose-pre-bg: #0f172a;
          --prose-th-borders: #4b5563;
          --prose-td-borders: #374151;
        }

        /* ===============================
           Typography
        =============================== */
        .prose p {
          margin: 1.25em 0;
          color: var(--prose-body);
        }

        .prose strong {
          color: var(--prose-bold);
          font-weight: 600;
        }

        .prose a {
          color: var(--prose-links);
          text-decoration: underline;
          font-weight: 500;
        }

        .prose h1 {
          color: var(--prose-headings);
          font-weight: 800;
          font-size: 2.25em;
          line-height: 1.2;
          margin: 0 0 1em 0;
          letter-spacing: -0.025em;
        }

        .prose h2 {
          color: var(--prose-headings);
          font-weight: 700;
          font-size: 1.875em;
          line-height: 1.25;
          margin: 2.5em 0 1.25em 0;
          letter-spacing: -0.025em;
        }

        .prose h3 {
          color: var(--prose-headings);
          font-weight: 600;
          font-size: 1.5em;
          line-height: 1.3;
          margin: 2em 0 0.75em 0;
          letter-spacing: -0.025em;
        }

        .prose h4 {
          color: var(--prose-headings);
          font-weight: 600;
          font-size: 1.25em;
          line-height: 1.4;
          margin: 1.75em 0 0.75em 0;
          letter-spacing: -0.025em;
        }

        .prose h5 {
          color: var(--prose-headings);
          font-weight: 600;
          font-size: 1.125em;
          line-height: 1.4;
          margin: 1.75em 0 0.75em 0;
          letter-spacing: -0.025em;
        }

        .prose h6 {
          color: var(--prose-headings);
          font-weight: 600;
          font-size: 1em;
          line-height: 1.4;
          margin: 1.75em 0 0.75em 0;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          font-size: 0.875em;
        }

        /* ===============================
           Inline code
        =============================== */
        .prose code {
          color: var(--prose-code);
          background: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-weight: 600;
          font-family: var(--font-mono, monospace);
        }

        .dark .prose code {
          background: #374151;
        }

        /* ===============================
           Code blocks
        =============================== */
        .prose pre {
          color: var(--prose-pre-code);
          background: var(--prose-pre-bg);
          padding: 1rem 1.25rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: var(--font-mono, monospace);
        }

        .prose pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }

        /* ===============================
           Blockquotes
        =============================== */
        .prose blockquote {
          border-left: 0.25rem solid var(--prose-quote-borders);
          padding: 0.75rem 1rem;
          margin: 1.5em 0;
          font-style: italic;
          background: #f9fafb;
          border-radius: 0.375rem;
        }

        .dark .prose blockquote {
          background: #1f2937;
        }
      `}</style>

      {children}
    </div>
  );
}
