// Genel sayfalama hook
'use client';

import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({ totalItems, initialPage = 1, initialPageSize = 10 }: UsePaginationOptions) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return {
    page,
    pageSize,
    totalPages,
    from,
    to,
    setPage: goToPage,
    setPageSize: (size: number) => {
      setPageSize(size);
      setPage(1);
    },
    nextPage,
    prevPage,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}
