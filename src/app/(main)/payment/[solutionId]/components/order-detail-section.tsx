import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { IGetSolutionResponse, ISolutionPlan } from '@/types/solution';
import Image from 'next/image';

interface OrderDetailSectionProps {
  solution: IGetSolutionResponse;
  selectedPlan: ISolutionPlan | null;
}

const OrderDetailSection = ({ solution, selectedPlan }: OrderDetailSectionProps) => {
  // 대표 이미지 찾기
  const representImage = solution.images?.find((img) => img.imageType === 'representation')?.imageUrl;

  // 카테고리 라벨 변환
  const categoryLabel = CATEGORY_OPTIONS.find((opt) => opt.value === solution.category)?.label || solution.category;

  // 표시할 가격 (플랜 가격 우선)
  const displayPrice = selectedPlan?.price ?? solution.price;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-md font-semibold">주문 상세 내역</h2>

      <div className="flex flex-row gap-6">
        {/* 솔루션 이미지 */}
        <div className="w-[220px] aspect-[4/3] relative shrink-0 bg-gray-100 rounded-md overflow-hidden">
          {representImage ? (
            <Image src={representImage} alt={solution.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        {/* 솔루션 정보 */}
        <div className="flex flex-col flex-1">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-lg font-semibold">{solution.name}</h3>
            <span className="text-xs text-gray-500">{solution.vendorBusinessName}</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">가격</span>
              <span className="text-sm">
                {displayPrice.toLocaleString()}원<span className="text-gray-400">/월 (VAT 별도)</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">솔루션 카테고리</span>
              <span className="text-sm">{categoryLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSection;
