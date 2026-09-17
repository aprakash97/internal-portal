import { headers } from 'next/headers';
import { auth } from './auth';
import { redirect } from 'next/navigation';

export const authSession = async () => {
  try {
    const session = auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error('Unauthorized: no valid session found');
    }

    return session;
  } catch (err) {
    console.error({ err });
    throw new Error('Authentication Failed');
  }
};

export const requireAuth = async () => {
  const session = await authSession();

  if (!session) {
    redirect('/sign-in');
  }

  return session;
};

export const requireNoAuth = async () => {
  const session = await authSession();

  if (session) {
    redirect('/');
  }
};
