import { ISolutionPlanDetail } from '@/types/solution';

interface PlanFeatureTableProps {
  details?: ISolutionPlanDetail[];
}

const PlanFeatureTable = ({ details }: PlanFeatureTableProps) => {
  if (!details || details.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-sm text-gray-700">{detail.name}</span>
          <span className="text-sm text-gray-900">{detail.context || '-'}</span>
        </div>
      ))}
    </div>
  );
};

export default PlanFeatureTable;
