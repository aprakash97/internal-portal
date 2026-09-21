'use server';

import { SettingsFormValues } from '@/components/settings-form';
import { authSession } from '@/lib/auth.utils';
import prisma from '@/lib/prisma';

export async function getCurrentUserDetails(id: string) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = await prisma.user.findUnique({
      where: { id },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
}

export async function updateUserProfile(params: SettingsFormValues) {
  try {
    const session = await authSession();

    if (!session) {
      throw new Error('Unauthorized: User Id not found');
    }

    const res = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: params.name,
        image: params.imageUrl,
      },
    });

    return res;
  } catch (err) {
    console.error({ err });
    throw new Error('Something went wrong');
  }
}
