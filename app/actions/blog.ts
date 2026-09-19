'use server';

import { authSession } from '@/lib/auth.utils';
import prisma from '@/lib/prisma';

export const getPosts = async (page: number) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = await prisma.post.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = await prisma.post.findUnique({
      where: { slug },
      include: {
        user: {
          select: { name: true, image: true, id: true },
        },
        category: true,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};

export const updatePostViews = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = await prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};

const PAGE_SIZE = 10;

export const getPostsByCategory = async (categoryId: string, page: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  const session = await authSession();

  const currentUser = session?.user.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { savedPosts: true },
      })
    : null;

  try {
    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        where: { categoryId },
        skip,
        take: PAGE_SIZE,
        orderBy: { updatedAt: 'desc' },
        include: {
          user: {
            select: { image: true, name: true, id: true, savedPosts: true },
          },
          category: true,
        },
      }),
      prisma.post.count({ where: { categoryId } }),
    ]);

    return {
      posts: posts.map((post) => ({
        ...post,
        savedPosts: currentUser?.savedPosts ?? [],
      })),
      totalPage: Math.ceil(totalCount / PAGE_SIZE),
      currentPage: page,
    };
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};
