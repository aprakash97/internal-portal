'use server';

import { authSession } from '@/lib/auth.utils';
import { PostStatus } from '@/lib/generated/prisma/enums';
import prisma from '@/lib/prisma';

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

export async function searchContent(query: string) {
  if (query.trim().length < 2) {
    return { results: [] };
  }

  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const [posts, categories] = await Promise.all([
      prisma.post.findMany({
        where: {
          status: PostStatus.published,
          OR: [
            { title: { contains: query, mode: 'insensitive' }},
            { content: { contains: query, mode: 'insensitive' }},
            { tags: { hasSome: [query] } },
          ],
        },
        select: {
          id: true,
          title: true,
          imageUrl: true,
          slug: true,
        },
        take: 10,
        orderBy: { updatedAt: 'desc' },
      }),

      prisma.category.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
        select: { id: true, name: true },
        take: 10,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    const results: SearchResult[] = [
      ...posts.map((post) => ({
        type: 'post' as const,
        id: post.id,
        title: post.title,
        url: `/blog/posts/${post.slug}`,
        imageUrl: post.imageUrl,
      })),
      ...categories.map((category) => ({
        type: 'category' as const,
        id: category.id,
        name: category.name,
        url: '',
      })),
    ];
    return { results };
  } catch (err) {
    console.error({ err });
    throw new Error(`Something went wrong ${query}`);
  }
}
