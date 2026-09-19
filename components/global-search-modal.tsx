'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Spinner } from './ui/spinner';
import { toast } from 'sonner';
import Link from 'next/link';
import { searchContent } from '@/app/actions/search';

type SearchResult =
  | {
      type: 'post';
      id: string;
      title: string;
      url: string;
      imageUrl: string;
    }
  | {
      type: 'category';
      id: string;
      name: string;
      url: string;
    };

export default function GlobalSearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    timer.current = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchContent(query);
        setResults(data.results ?? []);
      } catch (err) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setResults([]);
      setQuery('');
    }
  }, [results, isOpen]);

  const grouped = useMemo(() => {
    const posts = results.filter((res) => res.type === 'post') as Extract<
      SearchResult,
      { type: 'post' }
    >[];
    const categories = results.filter(
      (res) => res.type === 'category',
    ) as Extract<SearchResult, { type: 'category' }>[];

    return { posts, categories };
  }, [results]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-h-48 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle>Search for anything</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-3">
          <Input
            placeholder="Search posts, categories, ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-80 overflow-auto px-2 pb-4">
          {isLoading && (
            <div className="flex items-center justify-center p-5">
              <Spinner className="size-6" />
            </div>
          )}

          {!isLoading && results.length === 0 && query.length >= 2 && (
            <div className="text-muted-foreground px-4 py-2 text-sm">
              No results found
            </div>
          )}

          {grouped.posts.length > 0 && (
            <div className="py-2">
              <div className="text-muted-foreground px-3 pb-1 text-xs font-semibold uppercase">
                Posts
              </div>
              <div className="flex flex-col gap-1">
                {grouped.posts.map((post) => (
                  <Link
                    href={post.url}
                    className="rounded-sm px-3 py-2"
                    key={post.id}
                  >
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{post.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {grouped.categories.length > 0 && (
            <div className="py-2">
              <div className="text-muted-foreground px-3 pb-1 text-xs font-semibold uppercase">
                Categories
              </div>
              <div className="flex flex-col gap-1">
                {grouped.categories.map((category) => (
                  <Link
                    href={category.name}
                    className="rounded-sm px-3 py-2"
                    key={category.id}
                  >
                    <div className="flex flex-col">
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
