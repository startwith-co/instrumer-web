'use client';

import CustomerReviewsSection from './components/customer-reviews-section';
import ServicePlansSection from './components/service-plans-section';
import SolutionDetailSkeleton from './components/solution-detail-skeleton';
import SolutionHeroSection from './components/solution-hero-section';
import { useSuspenseSolution } from '@/lib/solution';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

const SolutionDetailContent = ({ solutionSeq }: { solutionSeq: number }) => {
  const { data, error } = useSuspenseSolution(solutionSeq);
  const solution = data?.data;

  // 에러 상태
  if (error || !solution) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">솔루션을 찾을 수 없습니다</h1>
          <p className="text-gray-500">잘못된 접근이거나 삭제된 솔루션입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-20 py-12 w-full flex flex-col gap-16">
      {/* 히어로 섹션 */}
      <SolutionHeroSection solution={solution} />

      {/* 서비스 플랜 섹션 */}
      {solution.plans && solution.plans.length > 0 && <ServicePlansSection solution={solution} />}

      {/* 이용 고객 리뷰 섹션 */}
      <CustomerReviewsSection solutionSeq={solutionSeq} />
    </div>
  );
};

const Page = () => {
  const params = useParams();
  const solutionSeq = Number(params.id);

  return (
    <Suspense fallback={<SolutionDetailSkeleton />}>
      <SolutionDetailContent solutionSeq={solutionSeq} />
    </Suspense>
  );
};

export default Page;
