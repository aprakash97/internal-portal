import { getBlogPostBySlug, updatePostViews } from '@/app/actions/blog';
import RichTextViewer from '@/components/rich-text-viewer';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Hash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  await updatePostViews(post?.id as string);

  if (!post) {
    return null;
  }

  console.log('post', post, slug);
  return (
    <div className="flex w-full flex-col items-center p-6 md:p-0">
      <div className="flex max-w-6xl flex-col justify-center gap-6">
        <h1 className="text-2xl font-semibold md:text-5xl">{post.title}</h1>
        <div className="flex gap-6 text-sm">
          <div className="flex gap-6">
            <div className="relative h-8 w-8 rounded-full shadow-lg">
              <Image
                src={post.user.image || '/defaultUser.svg'}
                alt={post.user.name || 'user'}
                className="rounded-full shadow-lg"
                fill
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sx font-medium">{post.user.name}</span>
              <span className="text-sx font-medium text-neutral-500">
                {format(post.createdAt, 'MM/dd/yyyy')}
              </span>
            </div>

            <Link
              href={`/blog/category/${post.categoryId}`}
              className="font-semibold"
            >
              {post.category?.name}
            </Link>
          </div>
        </div>

        <div className="relative h-80 w-full">
          <Image
            src={post.imageUrl || '/defaultImage.svg'}
            alt={post.title || 'Title'}
            className="rounded-sm object-cover"
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        <RichTextViewer content={post?.content} />

        <div className="flex flex-wrap gap-2 py-6">
          {post.tags.map((tag) => (
            <Link href={`/blog/tag/${tag}`} key={tag}>
              <Badge variant="outline">#{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
