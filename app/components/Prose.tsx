'use client'

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

        /* ===============================
          Lists
        =============================== */
        .prose ul,
        .prose ol {
          margin: 1.25em 0;
          padding-left: 1.5em;
        }

        .prose ul {
          list-style-type: disc;
        }

        .prose ol {
          list-style-type: decimal;
        }

        /* List items */
        .prose li {
          margin: 0.5em 0;
          padding-left: 0.25em;
          color: var(--prose-body);
        }

        /* Nested lists */
        .prose ul ul,
        .prose ul ol,
        .prose ol ul,
        .prose ol ol {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        /* Marker styling (modern browsers) */
        .prose li::marker {
          color: var(--prose-bullets);
          font-weight: 600;
        }

        /* Ordered list numbers */
        .prose ol li::marker {
          color: var(--prose-counters);
          font-weight: 600;
        }

        /* Paragraphs inside list items */
        .prose li p {
          margin: 0.5em 0;
        }

        /* Tight lists (optional utility style) */
        .prose .list-tight li {
          margin: 0.25em 0;
        }

        /* ===============================
            Tables
          =============================== */
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 2em 0;
            font-size: 0.95em;
            line-height: 1.6;
          }

          /* Header */
          .prose thead th {
            text-align: left;
            font-weight: 600;
            color: var(--prose-headings);
            padding: 0.75rem 0.75rem;
            border-bottom: 2px solid var(--prose-th-borders);
            vertical-align: bottom;
          }

          /* Body cells */
          .prose tbody td {
            padding: 0.75rem 0.75rem;
            border-bottom: 1px solid var(--prose-td-borders);
            vertical-align: top;
          }

          /* Zebra striping (very subtle) */
          .prose tbody tr:nth-child(even) {
            background: rgba(0, 0, 0, 0.02);
          }

          .dark .prose tbody tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.03);
          }

          /* Inline code inside tables */
          .prose table code {
            font-size: 0.85em;
          }

          /* Paragraph spacing inside cells */
          .prose td p,
          .prose th p {
            margin: 0.5em 0;
          }

          /* First / last row cleanup */
          .prose tbody tr:last-child td {
            border-bottom: none;
          }

          /* ===============================
            Images
            =============================== */

          .prose img {
            display: block;
            border-radius: 0.125rem;
            max-height: 40ch;
            margin-inline-start: auto;
            margin-inline-end: auto;
          }

      `}</style>

      {children}
    </div>
  );
}
