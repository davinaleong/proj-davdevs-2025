'use client'

import Button from "./Button"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
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

    return (
      <Button
        key={page}
        onClick={() => handlePageClick(page)}
        disabled={isCurrentPage}
        className={isCurrentPage 
          ? "!bg-gray-300 !text-gray-600 !cursor-not-allowed dark:!bg-gray-600 dark:!text-gray-400 !shadow-none !px-3 !py-2"
          : "!bg-transparent !text-blue-500 hover:!bg-blue-50 dark:hover:!bg-blue-950 !shadow-none !px-3 !py-2"
        }
        aria-label={isCurrentPage ? undefined : `Go to page ${page}`}
        {...(isCurrentPage ? { 'aria-current': 'page' } : {})}
      >
        {displayLabel}
      </Button>
    );
  };

  const renderEllipsis = (key: string) => (
    <span key={key} className="px-2 text-gray-500">
      &hellip;
    </span>
  );

  return (
    <nav className={`flex justify-center items-center gap-2 text-sm ${className}`} aria-label="Pagination">
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