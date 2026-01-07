'use client';

import SolutionInfoForm from './solution-info-form';
import SolutionKeywordForm from './solution-keyword-form';
import SolutionPlanForm from './solution-plan-form';
import { Button } from '@/components/ui/button';
import { useCreateSolutionMutation } from '@/lib/solution';
import { ICreateSolutionPlan, ICreateSolutionRequest, ISolutionImage } from '@/types/solution';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

export interface ISolutionFormData {
  name: string;
  explanation: string;
  category: string;
  price: number;
  webUrl: string;
  thumbnailUrl: string;
  pdfUrl: string;
  additionalImages: string[];
  plans: ICreateSolutionPlan[];
  keywords: string[];
}

const SolutionForm = () => {
  const router = useRouter();
  const { mutateAsync: createSolution, isPending } = useCreateSolutionMutation();

  const form = useForm<ISolutionFormData>({
    defaultValues: {
      name: '',
      explanation: '',
      category: '',
      price: 0,
      webUrl: '',
      thumbnailUrl: '',
      pdfUrl: '',
      additionalImages: [],
      plans: [
        {
          name: '',
          subName: '',
          price: 0,
          planType: 'MONTHLY',
          details: [{ name: '', context: '' }],
        },
      ],
      keywords: [],
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: ISolutionFormData) => {
    try {
      const images = [
        ...(data.thumbnailUrl ? [{ imageUrl: data.thumbnailUrl, imageType: 'representation' }] : []),
        ...(data.pdfUrl ? [{ imageUrl: data.pdfUrl, imageType: 'detail' }] : []),
        ...data.additionalImages.filter(Boolean).map((url) => ({ imageUrl: url, imageType: 'optional' })),
      ];

      const requestData: ICreateSolutionRequest = {
        name: data.name,
        explanation: data.explanation,
        category: data.category,
        price: data.price,
        webUrl: data.webUrl,
        images: images.length > 0 ? (images as ISolutionImage[]) : undefined,
        plans: data.plans.length > 0 ? data.plans : undefined,
        keywords: data.keywords.length > 0 ? data.keywords : undefined,
      };

      await createSolution(requestData);
      alert('솔루션이 등록되었습니다.');
      router.push('/vendor/solution');
    } catch (error) {
      console.error('솔루션 등록 실패:', error);
      alert('솔루션 등록에 실패했습니다.');
    }
  };

  // 엔터로 폼 제출 방지 (textarea 제외)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} noValidate className="space-y-6">
        {/* 섹션 1: 솔루션 기본 정보 입력 */}
        <SolutionInfoForm />

        {/* 섹션 2: 솔루션 플랜 정보 입력 */}
        <SolutionPlanForm />

        {/* 섹션 3: 키워드 검색 태그 */}
        <SolutionKeywordForm />

        {/* 하단 버튼 */}
        <div className="flex justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
            className="px-5 py-4 font-semibold leading-none tracking-normal"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary px-5 py-4 font-semibold leading-none tracking-normal text-white"
          >
            {isPending ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SolutionForm;
