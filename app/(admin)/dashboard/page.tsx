import { requireAuth } from '@/lib/auth.utils';

export default async function DashboardPage() {
  await requireAuth();
  return <div>Dashboard Page</div>;
}
