'use client';

import { Button } from '@/components/ui/button';
import { IGetSolutionResponse } from '@/types/solution';

interface SolutionInfoCardProps {
  solution: IGetSolutionResponse;
}

const SolutionInfoCard = ({ solution }: SolutionInfoCardProps) => {
  const handlePdfClick = () => {
    const pdfUrl = solution.images?.find((image) => image.imageType === 'detail')?.imageUrl;
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  const handleWebsiteClick = () => {
    if (solution.webUrl) {
      window.open(solution.webUrl, '_blank');
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{solution.name}</h1>
        <p className="text-base whitespace-pre-line">{solution.explanation}</p>
      </div>
      {/* 가격 */}
      <div className="flex flex-col gap-6">
        <div className="text-4xl font-semibold">
          {solution.price.toLocaleString()}원~
          <span className="text-lg font-normal tracking-tight">
            /월<span className="text-[#7A7A7A]">(VAT 제외)</span>
          </span>
        </div>

        {/* CTA 버튼 */}
        <div className="w-full flex flex-row gap-3">
          <Button onClick={handlePdfClick} className="w-full rounded-full font-medium h-12 shrink">
            솔루션 상세 설명 PDF 보기
          </Button>
          <Button
            variant="outline"
            onClick={handleWebsiteClick}
            className="w-full rounded-full font-medium h-12 !border-[#684DFF] !bg-white text-primary hover:bg-primary/5 shrink "
          >
            웹사이트 이동하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolutionInfoCard;
