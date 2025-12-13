import { ReactNode } from 'react'

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export default function Prose({ children, className = "" }: ProseProps) {
  return (
    <div className={`prose prose-gray dark:prose-invert max-w-none ${className}`}>
      <style jsx>{`
        .prose {
          color: #374151;
          line-height: 1.75;
        }
        
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
        
        .prose-gray.dark\\:prose-invert {
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
        
        /* Typography */
        .prose p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
          color: var(--prose-body);
        }
        
        .prose strong {
          color: var(--prose-bold);
          font-weight: 600;
        }
        
        .prose em {
          font-style: italic;
        }
        
        .prose code {
          color: var(--prose-code);
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-weight: 600;
        }
        
        .dark .prose code {
          background-color: #374151;
        }
        
        .prose del {
          color: var(--prose-body);
          text-decoration: line-through;
        }
        
        .prose sub,
        .prose sup {
          font-size: 0.75em;
        }
        
        /* Headings */
        .prose h1 {
          color: var(--prose-headings);
          font-weight: 800;
          font-size: 2.25em;
          line-height: 1.111;
          margin-top: 0;
          margin-bottom: 0.889em;
        }
        
        .prose h2 {
          color: var(--prose-headings);
          font-weight: 700;
          font-size: 1.5em;
          line-height: 1.333;
          margin-top: 2em;
          margin-bottom: 1em;
        }
        
        .prose h3 {
          color: var(--prose-headings);
          font-weight: 600;
          font-size: 1.25em;
          line-height: 1.4;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
        }
        
        .prose h4 {
          color: var(--prose-headings);
          font-weight: 600;
          line-height: 1.5;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .prose h5,
        .prose h6 {
          color: var(--prose-headings);
          font-weight: 600;
          line-height: 1.5;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        /* Links */
        .prose a {
          color: var(--prose-links);
          text-decoration: underline;
          font-weight: 500;
        }
        
        .prose a:hover {
          opacity: 0.8;
        }
        
        /* Lists */
        .prose ul {
          list-style-type: disc;
          margin-top: 1.25em;
          margin-bottom: 1.25em;
          padding-left: 1.625em;
        }
        
        .prose ol {
          list-style-type: decimal;
          margin-top: 1.25em;
          margin-bottom: 1.25em;
          padding-left: 1.625em;
        }
        
        .prose li {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          color: var(--prose-body);
        }
        
        .prose ul > li::marker {
          color: var(--prose-bullets);
        }
        
        .prose ol > li::marker {
          color: var(--prose-counters);
        }
        
        /* Tables */
        .prose table {
          width: 100%;
          table-layout: auto;
          text-align: left;
          margin-top: 2em;
          margin-bottom: 2em;
          font-size: 0.875em;
          line-height: 1.714;
        }
        
        .prose thead {
          border-bottom-width: 1px;
          border-bottom-color: var(--prose-th-borders);
        }
        
        .prose thead th {
          color: var(--prose-headings);
          font-weight: 600;
          vertical-align: bottom;
          padding-right: 0.571em;
          padding-bottom: 0.571em;
          padding-left: 0.571em;
        }
        
        .prose tbody td {
          color: var(--prose-body);
          vertical-align: baseline;
          padding-right: 0.571em;
          padding-top: 0.571em;
          padding-bottom: 0.571em;
          padding-left: 0.571em;
        }
        
        .prose tbody tr {
          border-bottom-width: 1px;
          border-bottom-color: var(--prose-td-borders);
        }
        
        /* Blockquotes */
        .prose blockquote {
          font-weight: 500;
          font-style: italic;
          color: var(--prose-quotes);
          border-left-width: 0.25rem;
          border-left-color: var(--prose-quote-borders);
          quotes: "\\201C""\\201D""\\2018""\\2019";
          margin-top: 1.6em;
          margin-bottom: 1.6em;
          padding-left: 1em;
          padding-right: 1em;
          padding-top: 0.5em;
          padding-bottom: 0.5em;
          background-color: #f9fafb;
          border-radius: 0.375rem;
          position: relative;
        }
        
        .dark .prose blockquote {
          background-color: #1f2937;
        }
        
        .prose blockquote p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        
        .prose blockquote p:first-child {
          margin-top: 0;
        }
        
        .prose blockquote p:last-child {
          margin-bottom: 0;
        }
        
        .prose blockquote cite {
          color: var(--prose-captions);
          font-style: normal;
          font-weight: 400;
          font-size: 0.875em;
          margin-top: 0.75em;
          display: block;
        }
        
        .prose blockquote cite::before {
          content: "— ";
        }
        
        /* Nested blockquotes */
        .prose blockquote blockquote {
          border-left-color: var(--prose-bullets);
          margin-top: 1em;
          margin-bottom: 1em;
          background-color: transparent;
        }
        
        .prose blockquote > :first-child {
          margin-top: 0;
        }
        
        .prose blockquote > :last-child {
          margin-bottom: 0;
        }
        
        /* Code blocks */
        .prose pre {
          color: var(--prose-pre-code);
          background-color: var(--prose-pre-bg);
          overflow-x: auto;
          font-weight: 400;
          font-size: 0.875em;
          line-height: 1.714;
          margin-top: 1.714em;
          margin-bottom: 1.714em;
          border-radius: 0.375rem;
          padding-top: 0.857em;
          padding-right: 1.143em;
          padding-bottom: 0.857em;
          padding-left: 1.143em;
        }
        
        .prose pre code {
          background-color: transparent;
          border-width: 0;
          border-radius: 0;
          padding: 0;
          font-weight: inherit;
          color: inherit;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
        }
        
        /* Images */
        .prose img {
          margin-top: 2em;
          margin-bottom: 2em;
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
        
        /* Horizontal rules */
        .prose hr {
          border-color: var(--prose-hr);
          border-top-width: 1px;
          margin-top: 3em;
          margin-bottom: 3em;
        }
        
        /* Figure captions */
        .prose figcaption {
          color: var(--prose-captions);
          font-size: 0.875em;
          line-height: 1.429;
          margin-top: 0.857em;
        }
      `}</style>
      {children}
    </div>
  );
}