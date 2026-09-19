import NavBar from '@/components/nav-bar';
import { SkeletonCard } from '@/components/skeleton-card';

export default function loading() {
  return (
    <div className="flex min-h-dvh w-full min-w-dvw flex-col overflow-hidden">
      <div className="relative w-full">
        <NavBar />
      </div>

      <div className="flex flex-col justify-center gap-6">
        <div className="container mx-auto my-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          {Array.from({ length: 8 }, (k, v) => v).map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
