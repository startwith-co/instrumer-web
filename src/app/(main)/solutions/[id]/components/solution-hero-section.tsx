import SolutionImageCarousel from './solution-image-carousel';
import SolutionInfoCard from './solution-info-card';
import { IGetSolutionResponse } from '@/types/solution';

interface SolutionHeroSectionProps {
  solution: IGetSolutionResponse;
}

const SolutionHeroSection = ({ solution }: SolutionHeroSectionProps) => {
  const images = solution.images?.filter(
    (image) => image.imageType === 'representation' || image.imageType === 'optional'
  );
  return (
    <section className="w-full">
      <div className="flex flex-row gap-8">
        <div className="flex-1 w-1/2">
          <SolutionImageCarousel images={images} category={solution.category} />
        </div>
        <div className="flex-1 w-1/2">
          <SolutionInfoCard solution={solution} />
        </div>
      </div>
    </section>
  );
};

export default SolutionHeroSection;
