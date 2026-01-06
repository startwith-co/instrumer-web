'use client';

import { Dropdown } from '@/components/ui/dropdown';
import Input from '@/components/ui/input';
import { ICreateSolutionPlan } from '@/types/solution';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const MAX_PLANS = 3;
const MAX_DETAILS = 5;

const PRICE_TYPE_OPTIONS = [
  { value: 'PRICE', label: '가격 입력' },
  { value: 'INQUIRY', label: '가격 문의' },
];

interface PlanInputProps {
  plans: ICreateSolutionPlan[];
  onChange: (plans: ICreateSolutionPlan[]) => void;
  error?: string;
}

const PlanInput = ({ plans, onChange, error }: PlanInputProps) => {
  // 각 플랜별 가격 표시 타입 상태 (PRICE | INQUIRY)
  const [priceTypes, setPriceTypes] = useState<('PRICE' | 'INQUIRY')[]>([]);

  // plans 변경 시 priceTypes 동기화
  useEffect(() => {
    const newPriceTypes = plans.map((plan) => (plan.price === null ? 'INQUIRY' : 'PRICE'));
    setPriceTypes(newPriceTypes);
  }, [plans.length, plans]);

  const handleAddPlan = () => {
    if (plans.length >= MAX_PLANS) return;
    // 기존 플랜의 상세 기능명을 복사 (내용은 빈 값)
    const existingDetails = plans[0]?.details || [];
    const newPlan: ICreateSolutionPlan = {
      name: '',
      subName: '',
      price: 0,
      planType: 'MONTHLY',
      details: existingDetails.map((d) => ({ name: d.name, context: '' })),
    };
    onChange([...plans, newPlan]);
    setPriceTypes([...priceTypes, 'PRICE']);
  };

  const handleRemovePlan = (index: number) => {
    // 최소 1개 플랜 필수
    if (plans.length <= 1) return;
    const updatedPlans = plans.filter((_, i) => i !== index);
    const updatedPriceTypes = priceTypes.filter((_, i) => i !== index);
    onChange(updatedPlans);
    setPriceTypes(updatedPriceTypes);
  };

  const handlePlanChange = (index: number, field: keyof ICreateSolutionPlan, value: string | number | null) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    onChange(updatedPlans);
  };

  const handlePriceTypeChange = (index: number, type: 'PRICE' | 'INQUIRY') => {
    const updatedPriceTypes = [...priceTypes];
    updatedPriceTypes[index] = type;
    setPriceTypes(updatedPriceTypes);

    // 가격 문의 선택 시 price를 null로
    if (type === 'INQUIRY') {
      handlePlanChange(index, 'price', null);
    } else {
      handlePlanChange(index, 'price', 0);
    }
  };

  // 공통 상세 기능 추가 (모든 플랜에 동시 추가)
  const handleAddDetail = () => {
    const currentDetailCount = plans[0]?.details?.length || 0;
    if (currentDetailCount >= MAX_DETAILS) return;

    const updatedPlans = plans.map((plan) => ({
      ...plan,
      details: [...(plan.details || []), { name: '', context: '' }],
    }));
    onChange(updatedPlans);
  };

  // 공통 상세 기능 삭제 (모든 플랜에서 동시 삭제)
  const handleRemoveDetail = (detailIndex: number) => {
    // 최소 1개 상세 기능 필수
    if (sharedDetails.length <= 1) return;
    const updatedPlans = plans.map((plan) => ({
      ...plan,
      details: (plan.details || []).filter((_, i) => i !== detailIndex),
    }));
    onChange(updatedPlans);
  };

  // 공통 기능명 변경 (모든 플랜에 동시 적용)
  const handleDetailNameChange = (detailIndex: number, name: string) => {
    const updatedPlans = plans.map((plan) => {
      const currentDetails = [...(plan.details || [])];
      if (currentDetails[detailIndex]) {
        currentDetails[detailIndex] = { ...currentDetails[detailIndex], name };
      }
      return { ...plan, details: currentDetails };
    });
    onChange(updatedPlans);
  };

  // 플랜별 상세 내용 변경
  const handleDetailContextChange = (planIndex: number, detailIndex: number, context: string) => {
    const updatedPlans = [...plans];
    const currentDetails = [...(updatedPlans[planIndex].details || [])];
    if (currentDetails[detailIndex]) {
      currentDetails[detailIndex] = { ...currentDetails[detailIndex], context };
    }
    updatedPlans[planIndex] = { ...updatedPlans[planIndex], details: currentDetails };
    onChange(updatedPlans);
  };

  // 공통 상세 기능 목록 (첫 번째 플랜 기준)
  const sharedDetails = plans[0]?.details || [];

  return (
    <div className="space-y-6">
      {/* 행 1: 플랜명 */}
      <div className="flex gap-4">
        <div className="w-[180px] shrink-0 pt-2">
          <span className="text-sm text-gray-700">
            플랜명 <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              <Input
                value={plan.name}
                onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                variant="underline"
                placeholder="플랜명을 입력해주세요."
                className="pr-8"
              />
              {plans.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePlan(index)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          {plans.length < MAX_PLANS && (
            <button
              type="button"
              onClick={handleAddPlan}
              className="flex items-center justify-between gap-2 rounded-md bg-[#F9F9F9] px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              플랜 추가하기
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* 행 2: 플랜 부제 */}
      <div className="flex gap-4">
        <div className="w-[180px] shrink-0 pt-2">
          <span className="text-sm text-gray-700">플랜 부제(선택)</span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <Input
              key={index}
              value={plan.subName || ''}
              onChange={(e) => handlePlanChange(index, 'subName', e.target.value)}
              variant="underline"
              placeholder="플랜 부제를 입력해주세요."
            />
          ))}
        </div>
      </div>

      {/* 행 3: 플랜 가격 입력 */}
      <div className="flex gap-4">
        <div className="w-[180px] shrink-0 pt-2">
          <span className="text-sm text-gray-700">
            플랜 가격 입력(VAT 별도) <span className="text-red-500">*</span>
          </span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="flex gap-2">
              {/* 가격 표시 설정 드롭다운 */}
              <Dropdown.Root className="w-[120px] shrink-0">
                <Dropdown.Trigger className="flex w-full items-center justify-between bg-white px-3 py-2 text-sm">
                  <span className="whitespace-nowrap">
                    {priceTypes[index] === 'INQUIRY' ? '가격 문의' : '가격 입력'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Dropdown.Trigger>
                <Dropdown.Content align="start" className="w-[120px]">
                  {PRICE_TYPE_OPTIONS.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      onSelect={() => handlePriceTypeChange(index, option.value as 'PRICE' | 'INQUIRY')}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown.Root>

              {/* 가격 입력 필드 (가격 문의가 아닐 때만 표시) */}
              {priceTypes[index] !== 'INQUIRY' && (
                <Input
                  type="number"
                  value={plan.price ?? ''}
                  onChange={(e) => handlePlanChange(index, 'price', e.target.value ? Number(e.target.value) : 0)}
                  variant="underline"
                  placeholder="가격 입력(VAT 별도)"
                  className="flex-1"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 행 4: 상세 기능 입력 - 공통 기능명(왼쪽 컬럼) + 플랜별 내용 */}
      {/* 헤더 */}
      <div className="flex gap-4">
        <div className="w-[180px] shrink-0 pt-2">
          <span className="text-sm text-gray-700">
            상세 기능 입력 <span className="text-red-500">*</span>
          </span>
        </div>
      </div>

      {/* 상세 기능 행들 */}
      {sharedDetails.map((detail, detailIndex) => (
        <div key={detailIndex} className="flex gap-4">
          {/* 공통 기능명 (왼쪽 컬럼) */}
          <div className="relative w-[180px] shrink-0">
            <Input
              value={detail.name}
              onChange={(e) => handleDetailNameChange(detailIndex, e.target.value)}
              variant="underline"
              placeholder="기능명 입력"
              className={sharedDetails.length > 1 ? 'pr-8' : ''}
            />
            {sharedDetails.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveDetail(detailIndex)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {/* 플랜별 내용 입력 */}
          <div className="grid flex-1 grid-cols-3 gap-4">
            {plans.map((plan, planIndex) => (
              <Input
                key={planIndex}
                value={plan.details?.[detailIndex]?.context || ''}
                onChange={(e) => handleDetailContextChange(planIndex, detailIndex, e.target.value)}
                variant="underline"
                placeholder="내용 입력"
              />
            ))}
          </div>
        </div>
      ))}

      {/* 상세 기능 추가 버튼 */}
      {sharedDetails.length < MAX_DETAILS && (
        <div className="flex gap-4">
          <div className="w-[180px] shrink-0">
            <button
              type="button"
              onClick={handleAddDetail}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              기능 추가 ({sharedDetails.length}/{MAX_DETAILS})
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PlanInput;
