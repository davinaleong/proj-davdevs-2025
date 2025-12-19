'use client'

import Anchor from "./Anchor"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  baseHref?: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  baseHref = "",
  className = ""
}: PaginationProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page: number, label?: string) => {
    const isCurrentPage = page === currentPage;
    const displayLabel = label || page.toString();

    if (isCurrentPage) {
      return (
        <span
          key={page}
          className="px-3 py-2 font-bold"
          aria-current="page"
        >
          {displayLabel}
        </span>
      );
    }

    const href = baseHref ? `${baseHref}?page=${page}` : `?page=${page}`;

    return (
      <Anchor
        key={page}
        href={href}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          handlePageClick(page);
        }}
        aria-label={`Go to page ${page}`}
      >
        {displayLabel}
      </Anchor>
    );
  };

  const renderEllipsis = (key: string) => (
    <span key={key} className="px-2 opacity-80">
      &hellip;
    </span>
  );

  // For simple pagination (2-3 pages), show all pages
  if (totalPages <= 3) {
    return (
      <nav className={`flex justify-center items-center gap-2 ${className}`} aria-label="Pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => renderPageButton(page))}
      </nav>
    );
  }

  return (
    <nav className={`flex justify-center items-center gap-2 ${className}`} aria-label="Pagination">
      {/* First page */}
      {renderPageButton(1)}

      {/* Ellipsis before prev if gap > 1 */}
      {currentPage > 3 && renderEllipsis('ellipsis-start')}

      {/* Previous page */}
      {currentPage > 2 && renderPageButton(currentPage - 1)}

      {/* Current page (if not first or last) */}
      {currentPage > 1 && currentPage < totalPages && renderPageButton(currentPage)}

      {/* Next page */}
      {currentPage < totalPages - 1 && renderPageButton(currentPage + 1)}

      {/* Ellipsis after next if gap > 1 */}
      {currentPage < totalPages - 2 && renderEllipsis('ellipsis-end')}

      {/* Last page */}
      {totalPages > 1 && renderPageButton(totalPages)}
    </nav>
  );
}