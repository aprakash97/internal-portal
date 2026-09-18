import { authSession, requireAuth } from '@/lib/auth.utils';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  await requireAuth();
  const session = await authSession();
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full flex-col flex-wrap gap-6 p-14 px-6">
        <Link href="/">
          <span>Visit public site</span>
          <Rocket />
        </Link>
        <h1 className="text-2xl font-semibold">Hi, {session?.user.name}</h1>
      </div>
      <div className="container flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <DashboardCard /> */}
          <div className="px-4 md:px-6">

          </div>
        </div>
      </div>
    </div>
  );
}
