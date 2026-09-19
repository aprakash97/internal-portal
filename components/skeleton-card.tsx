import { Skeleton } from './ui/skeleton';

export const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="rounded=xl h-35 w-90">
        <div className="space-y-2">
          <Skeleton className="h-4 w-90" />
          <Skeleton className="h-4 w-90" />
          <Skeleton className="h-4 w-90" />
        </div>
      </Skeleton>
    </div>
  );
};
