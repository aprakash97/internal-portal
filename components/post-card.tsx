'use client';

import { Category, Post } from '@/lib/generated/prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { MoveRight } from 'lucide-react';
import RichTextViewer from './rich-text-viewer';
import { stripeHtml } from '@/lib/utils';

interface PostProps {
  post: Post & { category: Category | null} & {
    user: {
      name: string;
      id: string;
      image: string | null;
      savedPosts: string[];
    };
  };
  //   currentUserId: string;
}

export default function PostCard({ post }: PostProps) {
  const excerpt = stripeHtml(post.content);
  return (
    <Card className="relative w-full gap-1 border-0 p-0 pb-4 shadow-md">
      <div className="relative h-60">
        <Image
          src={post.imageUrl || '/defaultImage.svg'}
          alt={post.title}
          fill
          className="rounded-sm object-cover"
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 13vw"
        />
      </div>
      <CardHeader className="gap-0">
        <CardTitle className="line-clamp-1 pt-2 font-semibold">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* <RichTextViewer content={post.content} /> */}
        <div className="line-clamp-2 h-40">
          <p className="flex flex-wrap gap-2 py-6">{excerpt}</p>
        </div>
        <div className="flex flex-wrap gap-2 py-6">
          {post.tags.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <Badge variant="secondary"> #{tag}</Badge>
            </Link>
          ))}
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex gap-1">
            <div className="relative h-8 w-8 rounded-full shadow-lg">
              <Image
                className="rounded-full shadow-lg"
                src={post.user?.image || '/defaultUser.svg'}
                alt={post.user.name}
                width="40"
                height="40"
                // sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold">{post.user.name}</span>
            <span className="text-[10px] font-semibold text-neutral-500">
              {format(post.createdAt, 'dd/MM/yyyy')}
            </span>
          </div>

          <Link
            href={`/blog/posts/${post.slug}`}
            className="text-sx flex items-center gap-1 font-medium"
          >
            Read More <MoveRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
