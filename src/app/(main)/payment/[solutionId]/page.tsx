'use client';

import OrderDetailSection from './components/order-detail-section';
import OrdererInfoSection from './components/orderer-info-section';
import PaymentPageSkeleton from './components/payment-page-skeleton';
import PaymentSummarySection from './components/payment-summary-section';
import RefundPolicySection from './components/refund-policy-section';
import { useSuspenseSolution } from '@/lib/solution';
import { useSuspenseUserInfo } from '@/lib/user';
import { ISolutionPlan } from '@/types/solution';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';

interface PaymentPageContentProps {
  solutionId: number;
  planId: number | null;
}

const PaymentPageContent = ({ solutionId, planId }: PaymentPageContentProps) => {
  const { data: solutionData, error: solutionError } = useSuspenseSolution(solutionId);
  const { data: userData, error: userError } = useSuspenseUserInfo();

  const solution = solutionData?.data;
  const user = userData?.data;

  // planId에 해당하는 플랜 찾기
  const selectedPlan: ISolutionPlan | null = useMemo(() => {
    if (!solution?.plans || !planId) return null;
    return solution.plans.find((plan) => plan.planSeq === planId) || null;
  }, [solution?.plans, planId]);

  // 결제 금액 (플랜 가격 우선, 없으면 솔루션 기본 가격)
  const price = selectedPlan?.price ?? solution?.price ?? 0;

  // 에러 상태
  if (solutionError || userError || !solution || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">결제 정보를 불러올 수 없습니다</h1>
          <p className="text-gray-500">잘못된 접근이거나 로그인이 필요합니다.</p>
        </div>
      </div>
    );
  }

  // 플랜이 지정되었는데 찾을 수 없는 경우
  if (planId && !selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">플랜 정보를 찾을 수 없습니다</h1>
          <p className="text-gray-500">잘못된 플랜 정보입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-20 py-12 w-full">
      <div className="flex flex-row gap-8">
        {/* 좌측: 주문 정보 */}
        <div className="flex-1 flex flex-col gap-6 rounded-lg shadow-md bg-white p-6">
          {/* 주문 상세 내역 */}
          <OrderDetailSection solution={solution} selectedPlan={selectedPlan} />
          <div className="h-px bg-gray-200" />
          {/* 주문자 정보 */}
          <OrdererInfoSection user={user} />

          {/* 취소/환불 유의 사항 */}
          <RefundPolicySection />
        </div>

        {/* 우측: 결제 금액 */}
        <div className="w-[400px]">
          <PaymentSummarySection price={price} />
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const solutionId = Number(params.solutionId);
  const planId = searchParams.get('planId') ? Number(searchParams.get('planId')) : null;

  return (
    <Suspense fallback={<PaymentPageSkeleton />}>
      <PaymentPageContent solutionId={solutionId} planId={planId} />
    </Suspense>
  );
};

export default PaymentPage;
