'use client';

import SolutionListItem from './solution-list-item';
import SolutionListSkeleton from './solution-list-skeleton';
import { SimplePagination } from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useSearchParams } from '@/hooks/use-search-params';
import { useSolutions } from '@/lib/solution';

const PAGE_SIZE = 20;

const SolutionList = () => {
  const { searchParams } = useSearchParams();
  const { currentPage, setPage } = usePagination({ pageSize: PAGE_SIZE });

  const { data, isLoading } = useSolutions({
    page: currentPage - 1,
    size: PAGE_SIZE,
    category: searchParams.category as string | undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
  });
  const solutions = data?.data?.content ?? [];
  const totalPages = data?.data?.page?.totalPages ?? 1;

  if (isLoading) {
    return <SolutionListSkeleton />;
  }

  return (
    <div className="w-full">
      <p className="mb-4 font-semibold text-sm">
        <span className="text-primary">{data?.data?.page?.totalElements ?? 0}</span>개의 솔루션
      </p>
      <div className="grid grid-cols-4 gap-6">
        {solutions.map((solution) => (
          <SolutionListItem key={solution.solutionSeq} solution={solution} />
        ))}
      </div>
      <SimplePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} className="mt-8" />
    </div>
  );
};

export default SolutionList;
