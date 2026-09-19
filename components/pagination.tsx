'use client';

import { cn } from '@/lib/utils';
import { MoveLeft, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function Pagination({
  currentPage,
  totalPages,
  page,
  pageUrl,
}: {
  currentPage: number;
  totalPages: number;
  page: number;
  pageUrl?: string;
}) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-row gap-6 pb-14">
      <div className="flex w-full justify-center gap-6">
        <Button
          onClick={() => router.push(`${pageUrl}?page=${currentPage - 1}`)}
          aria-disabled={currentPage === 1}
          disabled={currentPage === 1}
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full opacity-100 shadow-lg',
            currentPage === 1 && 'pointer-none: opacity-50',
          )}
        >
          <MoveLeft />
        </Button>
        <div className="flex items-center justify-between gap-6 text-sm">
          Page {page} of {totalPages}
        </div>

        <Button
          onClick={() => router.push(`${pageUrl}?page=${currentPage + 1}`)}
          aria-disabled={currentPage === totalPages}
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full opacity-100 shadow-lg',
            currentPage === totalPages && 'pointer-none: opacity-50',
          )}
          disabled={currentPage === totalPages}
        >
          <MoveRight />
        </Button>
      </div>
    </div>
  );
}
