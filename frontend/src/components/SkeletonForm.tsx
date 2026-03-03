import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16 bg-beige-dark" />
          <Skeleton className="h-10 w-full bg-beige-dark" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-16 bg-beige-dark" />
          <Skeleton className="h-10 w-full bg-beige-dark" />
        </div>
      </div>
      <div className="space-y-1">
        <Skeleton className="h-3 w-24 bg-beige-dark" />
        <Skeleton className="h-10 w-full bg-beige-dark" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-3 w-24 bg-beige-dark" />
        <Skeleton className="h-10 w-full bg-beige-dark" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-3 w-32 bg-beige-dark" />
        <Skeleton className="h-28 w-full bg-beige-dark" />
      </div>
      <Skeleton className="h-12 w-full bg-beige-dark" />
    </div>
  );
}
