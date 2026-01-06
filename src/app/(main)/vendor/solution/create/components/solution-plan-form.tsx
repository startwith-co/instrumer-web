'use client';

import PlanInput from './plan-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ISolutionFormData } from './solution-form';
import { ICreateSolutionPlan } from '@/types/solution';

const validatePlans = (plans: ICreateSolutionPlan[]) => {
  if (!plans || plans.length === 0) {
    return '최소 1개의 플랜을 입력해주세요.';
  }
  for (let i = 0; i < plans.length; i++) {
    if (!plans[i].name || plans[i].name.trim() === '') {
      return `플랜 ${i + 1}의 이름을 입력해주세요.`;
    }
    if (plans[i].price !== null && (plans[i].price as number) <= 0) {
      return `플랜 ${i + 1}의 가격을 입력해주세요.`;
    }
  }
  // 상세 기능 검증 (첫 번째 플랜 기준)
  const details = plans[0]?.details || [];
  if (details.length === 0) {
    return '최소 1개의 상세 기능을 입력해주세요.';
  }
  for (let i = 0; i < details.length; i++) {
    if (!details[i].name || details[i].name.trim() === '') {
      return `상세 기능 ${i + 1}의 기능명을 입력해주세요.`;
    }
  }
  return true;
};

const SolutionPlanForm = () => {
  const { control } = useFormContext<ISolutionFormData>();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8">
      <h2 className="mb-8 text-xl font-bold">솔루션 플랜 정보 입력</h2>
      <Controller
        name="plans"
        control={control}
        rules={{ validate: validatePlans }}
        render={({ field, fieldState }) => (
          <PlanInput plans={field.value || []} onChange={field.onChange} error={fieldState.error?.message} />
        )}
      />
    </section>
  );
};

export default SolutionPlanForm;
