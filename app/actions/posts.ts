'use server';

import { PostFormValues } from '@/components/post-form';
import { authSession } from '@/lib/auth.utils';
import { Post, PostStatus } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';

export const getUniquePost = async (id: string) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = (await prisma.post.findUnique({ where: { id } })) as Post;
    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};

export const createPost = async (params: PostFormValues) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = await prisma.post.create({
      data: {
        slug: params.slug,
        content: params.content,
        imageUrl: params.imageUrl,
        categoryId: params.categoryId,
        title: params.title,
        tags: params.tags.map((t) => t.value),
        status: params.status as PostStatus,
        userId: session.user.id,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};

export const updatePost = async (params: PostFormValues) => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const { categories, tags, id, ...rest } = params;
    const data = { ...rest, tags: tags.map((t) => t.value) };
    const res = await prisma.post.update({
      where: {
        id,
      },
      data: {
        ...data,
        status: data.status as PostStatus,
        userId: session.user.id,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};

export const getAllPosts = async () => {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = prisma.post.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      include: { category: true },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
};
