import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  variant?: 'artwork' | 'testimonial' | 'press';
  count?: number;
}

function ArtworkSkeleton() {
  return (
    <div className="group">
      <Skeleton className="w-full aspect-[4/3] bg-beige-dark" />
      <div className="pt-3 pb-1 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-beige-dark" />
        <Skeleton className="h-3 w-1/2 bg-beige-dark" />
        <Skeleton className="h-3 w-1/3 bg-beige-dark" />
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="bg-beige p-8 space-y-4">
      <Skeleton className="h-3 w-full bg-beige-dark" />
      <Skeleton className="h-3 w-5/6 bg-beige-dark" />
      <Skeleton className="h-3 w-4/6 bg-beige-dark" />
      <div className="pt-2 space-y-1">
        <Skeleton className="h-3 w-1/3 bg-beige-dark" />
        <Skeleton className="h-3 w-1/4 bg-beige-dark" />
      </div>
    </div>
  );
}

function PressSkeleton() {
  return (
    <div className="border border-beige-dark p-6 space-y-3">
      <Skeleton className="h-4 w-1/3 bg-beige-dark" />
      <Skeleton className="h-3 w-1/4 bg-beige-dark" />
      <Skeleton className="h-4 w-full bg-beige-dark" />
      <Skeleton className="h-3 w-5/6 bg-beige-dark" />
      <Skeleton className="h-3 w-4/6 bg-beige-dark" />
    </div>
  );
}

export default function SkeletonCard({ variant = 'artwork', count = 1 }: SkeletonCardProps) {
  const items = Array.from({ length: count });
  return (
    <>
      {items.map((_, i) => (
        <div key={i}>
          {variant === 'artwork' && <ArtworkSkeleton />}
          {variant === 'testimonial' && <TestimonialSkeleton />}
          {variant === 'press' && <PressSkeleton />}
        </div>
      ))}
    </>
  );
}
