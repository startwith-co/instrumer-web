import PlanCard from './plan-card';
import { IGetSolutionResponse } from '@/types/solution';

interface ServicePlansSectionProps {
  solution: IGetSolutionResponse;
}

const ServicePlansSection = ({ solution }: ServicePlansSectionProps) => {
  if (!solution.plans || solution.plans.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-semibold">서비스 플랜 정보</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {solution.plans.map((plan, index) => (
          <PlanCard
            key={`${plan.name}-${index}`}
            solutionSeq={solution.solutionSeq}
            plan={plan}
            vendorSeq={solution.vendorSeq}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicePlansSection;
