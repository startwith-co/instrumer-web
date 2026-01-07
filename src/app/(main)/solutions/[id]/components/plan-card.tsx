'use client';

import PlanFeatureTable from './plan-feature-table';
import { useLoginModal } from '@/components/auth/login-modal';
import { Button } from '@/components/ui/button';
import { ISolutionPlan } from '@/types/solution';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
  solutionSeq: number;
  plan: ISolutionPlan;
  vendorSeq: number;
}

const PlanCard = ({ solutionSeq, plan, vendorSeq }: PlanCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { open: openLoginModal } = useLoginModal();

  const handlePurchase = () => {
    if (!session) {
      openLoginModal();
      return;
    }
    router.push(`/payment/${solutionSeq}?planId=${plan.solutionPlanSeq}`);
  };

  const handlePriceInquiry = () => {
    if (!session) {
      openLoginModal();
      return;
    }
    router.push(`/customer/chat?vendorSeq=${vendorSeq}`);
  };

  const isPriceInquiry = plan.price === null;

  return (
    <div className="w-full flex flex-col gap-6 p-4 rounded-md bg-[#F9F9F9] shadow-[0px_0px_10px_0px_#0000001A]">
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        {plan.subName && <p className="text-sm text-[#7A7A7A]">{plan.subName}</p>}
        <p className="text-xl font-semibold mt-2">
          {isPriceInquiry ? (
            '가격 문의'
          ) : (
            <>
              {plan.price?.toLocaleString()}원<span className="text-base font-normal">/월</span>
              <span className="text-sm font-normal text-[#7A7A7A]">(VAT 제외)</span>
            </>
          )}
        </p>
      </div>

      {/* Features */}
      <div className="w-full flex flex-col gap-2">
        <h4 className="text-sm font-semibold">기능 상세</h4>
        <PlanFeatureTable details={plan.details} />
      </div>

      {/* CTA */}
      <Button
        variant={isPriceInquiry ? 'white' : 'default'}
        size="lg"
        onClick={isPriceInquiry ? handlePriceInquiry : handlePurchase}
        className="w-full"
      >
        {isPriceInquiry ? '가격 문의하기' : '구매하기'}
      </Button>
    </div>
  );
};

export default PlanCard;
