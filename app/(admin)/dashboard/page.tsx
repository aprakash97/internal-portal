import { getCategoriesWithUser } from '@/app/actions/categories';
import { getPostsByUser } from '@/app/actions/posts';
import DashboardCard from '@/components/dashboard-card';
import DashboardCategories from '@/components/dashboard-categories';
import { DashboardChart } from '@/components/dashboard-chart';
import { authSession, requireAuth } from '@/lib/auth.utils';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  await requireAuth();
  const session = await authSession();
  const posts = await getPostsByUser();
  const categories = await getCategoriesWithUser();

  const totalViews = posts.reduce((acc, item) => acc + item.views!, 0);
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full flex-col flex-wrap gap-6 p-14 px-6">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 font-medium text-blue-400"
        >
          <span>Visit public site</span>
          <Rocket />
        </Link>
        <h1 className="text-2xl font-semibold">Hi, {session?.user.name} </h1>
      </div>
      <div className="container flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCard
            totalCategories={categories.length}
            totalPosts={posts.length}
            totalViews={totalViews}
          />
        </div>
        <div className="px-4 md:px-6">
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <DashboardChart data={posts} />
            <DashboardCategories categories={categories} />
          </div>
        </div>
      </div>
    </div>
  );
}
