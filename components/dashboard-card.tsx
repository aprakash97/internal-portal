import { Combine } from 'lucide-react';
import { Card, CardDescription, CardTitle } from './ui/card';

interface CardProps {
  totalCategories: number;
  totalPosts: number;
  totalViews: number;
}
export default function DashboardCard({
  totalCategories,
  totalPosts,
  totalViews,
}: CardProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 px-6 md:grid-cols-3">
      <Card className="flex min-h-36 flex-col items-center justify-center shadow-lg">
        <div className="flex w-full justify-between">
          <CardDescription className="text-lg font-medium">
            Total number of categories
          </CardDescription>
          <Combine />
        </div>
        <CardTitle className="text-2xl">{totalCategories}</CardTitle>
      </Card>

      <Card className="flex min-h-36 flex-col items-center justify-center shadow-lg">
        <div className="flex w-full justify-between">
          <CardDescription className="text-lg font-medium">
            Total number of posts
          </CardDescription>
          <Combine />
        </div>
        <CardTitle className="text-2xl">{totalPosts}</CardTitle>
      </Card>

      <Card className="flex min-h-36 flex-col items-center justify-center shadow-lg">
        <div className="flex w-full justify-between">
          <CardDescription className="text-lg font-medium">
            Total number of views
          </CardDescription>
          <Combine />
        </div>
        <CardTitle className="text-2xl">{totalViews}</CardTitle>
      </Card>
    </div>
  );
}
