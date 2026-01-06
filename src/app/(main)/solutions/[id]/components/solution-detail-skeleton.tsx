const PlanCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6 p-4 rounded-md bg-[#F9F9F9] animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-1 items-center">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-4 w-24 bg-gray-300 rounded mt-1" />
        <div className="h-6 w-40 bg-gray-300 rounded mt-2" />
      </div>

      {/* Features */}
      <div className="w-full flex flex-col gap-2">
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="h-3 w-32 bg-gray-300 rounded" />
              <div className="h-3 w-24 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="h-10 w-full bg-gray-300 rounded-md" />
    </div>
  );
};

const PlansSectionSkeleton = () => {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="h-8 w-48 bg-gray-300 rounded animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <PlanCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

const HeroSectionSkeleton = () => {
  return (
    <section className="w-full">
      <div className="flex flex-row gap-8">
        {/* 이미지 캐러셀 스켈레톤 */}
        <div className="flex-1 w-1/2">
          <div className="relative w-full aspect-[4/3] rounded-[10px] bg-gray-300 animate-pulse" />
        </div>

        {/* 솔루션 정보 카드 스켈레톤 */}
        <div className="flex-1 w-1/2">
          <div className="flex h-full flex-col justify-between">
            {/* 상단: 제목 + 설명 */}
            <div className="flex flex-col gap-4">
              {/* 제목 */}
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse" />
              {/* 설명 */}
              <div className="flex flex-col gap-2">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>

            {/* 하단: 가격 및 버튼 */}
            <div className="flex flex-col gap-6">
              <div className="h-10 w-56 bg-gray-300 rounded animate-pulse" />
              <div className="w-full flex flex-row gap-3">
                <div className="h-12 w-full bg-gray-300 rounded-full animate-pulse" />
                <div className="h-12 w-full bg-gray-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionDetailSkeleton = () => {
  return (
    <div className="mx-auto px-20 py-12 w-full flex flex-col gap-16">
      {/* 히어로 섹션 스켈레톤 */}
      <HeroSectionSkeleton />

      {/* 서비스 플랜 섹션 스켈레톤 */}
      <PlansSectionSkeleton />

      {/* 리뷰 섹션 스켈레톤 */}
      <section className="mb-16">
        <div className="h-8 w-40 bg-gray-300 rounded animate-pulse mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-3 p-3 bg-[#F9F9F9] rounded-[10px] items-center animate-pulse">
              <div className="size-9 shrink-0 rounded-full bg-gray-300" />
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex flex-row items-center gap-2">
                    <div className="h-3 w-16 bg-gray-300 rounded" />
                    <div className="h-3 w-20 bg-gray-300 rounded" />
                  </div>
                  <div className="h-3 w-32 bg-gray-300 rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-full bg-gray-300 rounded" />
                  <div className="h-3 w-3/4 bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SolutionDetailSkeleton;
