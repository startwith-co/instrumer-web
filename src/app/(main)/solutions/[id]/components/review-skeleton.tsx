const ReviewSkeleton = () => {
  return (
    <div className="flex gap-3 p-3 bg-[#F9F9F9] rounded-[10px] items-center animate-pulse">
      {/* Avatar Skeleton */}
      <div className="size-9 shrink-0 rounded-full bg-gray-300" />

      {/* Content Skeleton */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-row items-center gap-2">
            <div className="h-3 w-16 bg-gray-300 rounded" />
            <div className="h-3 w-20 bg-gray-300 rounded" />
          </div>
          <div className="h-3 w-32 bg-gray-300 rounded" />
        </div>

        {/* Review Text */}
        <div className="space-y-1">
          <div className="h-3 w-full bg-gray-300 rounded" />
          <div className="h-3 w-3/4 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

const ReviewListSkeleton = () => {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <ReviewSkeleton key={index} />
      ))}
    </div>
  );
};

export { ReviewSkeleton, ReviewListSkeleton };
