import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

// --- usePagination Hook ---

export const DOTS = '...';

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const totalPageNumbers = siblingCount + 5;

  /*
    Case 1: If the number of pages is less than the page numbers we want to show in our
    paginationComponent, we return the range [1..totalPageCount]
  */
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  /*
    Case 2: No left dots to show, but rights dots to be shown
  */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  /*
    Case 3: No right dots to show, but left dots to be shown
  */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  /*
    Case 4: Both left and right dots to be shown
  */
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  // Default case (shouldn't be reached with above logic but included for safety)
  return range(1, totalPageCount);
};

// --- Pagination Component ---

export interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 pages, don't render pagination
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  if (typeof lastPage !== 'number') {
      // Find the last numeric page number if the last element is DOTS
      const numericPages = paginationRange.filter(page => typeof page === 'number') as number[];
      lastPage = numericPages[numericPages.length -1] || 1;
  } 

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      {/* Previous Button */}
      <Button
        variant="outlined"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="px-2"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers & Dots */}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <span key={`${DOTS}-${index}`} className="flex items-center justify-center px-2 py-1 text-sm text-gray-500">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          );
        }

        return (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(pageNumber as number)}
            disabled={pageNumber === currentPage}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
            className="px-3" // Adjust padding for numbers
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        variant="outlined"
        size="sm"
        onClick={onNext}
        disabled={currentPage === lastPage}
        aria-label="Go to next page"
        className="px-2"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};

Pagination.displayName = 'Pagination'; 