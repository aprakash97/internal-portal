'use client';

import { Category, User } from '@/lib/generated/prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';

interface DashboardCategoriesProps {
  categories: (Category & { user: User })[];
}

export default function DashboardCategories({
  categories,
}: DashboardCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest categories</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-6 rounded-lg p-4 shadow-sm"
          >
            <p className="font-medium">{category.name}</p>
            <div className="flex items-center gap-1">
              <div className="relative h-8 w-8 rounded-full shadow-lg">
                <Image
                  className="rounded-full shadow-lg"
                  src={category.user?.image || '/defaultUser.svg'}
                  alt={'User Image'}
                  fill
                />
              </div>
              <p className="font-medium">{category.user?.name}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
