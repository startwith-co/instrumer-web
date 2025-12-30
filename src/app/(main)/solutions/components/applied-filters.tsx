'use client';

import { BUDGET_OPTIONS, CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { FilterValues } from '@/hooks/use-solution-filter';
import { FilterKey } from '@/types';

interface IAppliedFiltersProps {
  appliedFilters: FilterValues;
  onRemove: (keys: FilterKey | FilterKey[], value?: string) => void;
}

const getCategoryLabel = (value: string): string => {
  const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
  return option?.label ?? value;
};

const getBudgetLabel = (minPrice?: string, maxPrice?: string): string | null => {
  if (!minPrice && !maxPrice) return null;
  const option = BUDGET_OPTIONS.find(
    (opt) =>
      (opt.minPrice?.toString() === minPrice || (!opt.minPrice && !minPrice)) &&
      (opt.maxPrice?.toString() === maxPrice || (!opt.maxPrice && !maxPrice))
  );
  return option?.label ?? null;
};

const AppliedFilters = ({ appliedFilters, onRemove }: IAppliedFiltersProps) => {
  const activeFilters: { key: FilterKey | 'budget'; value?: string; label: string }[] = [];

  // 카테고리 필터
  if (appliedFilters.category?.[0]) {
    activeFilters.push({
      key: 'category',
      value: appliedFilters.category[0],
      label: getCategoryLabel(appliedFilters.category[0]),
    });
  }

  // 예산 필터 (minPrice, maxPrice를 하나의 필터로 표시)
  const budgetLabel = getBudgetLabel(appliedFilters.minPrice?.[0], appliedFilters.maxPrice?.[0]);
  if (budgetLabel) {
    activeFilters.push({
      key: 'budget',
      label: budgetLabel,
    });
  }

  if (activeFilters.length === 0) return null;

  const handleRemove = (key: FilterKey | 'budget') => {
    if (key === 'budget') {
      onRemove(['minPrice', 'maxPrice']);
    } else {
      onRemove(key);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-semibold text-gray-900">적용된 필터</h3>
      <div className="flex flex-col gap-4">
        {activeFilters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleRemove(key)}
            className="flex items-center justify-center rounded-[7px] border bg-[#E1DBFF] px-4 py-3 text-base text-gray-900"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppliedFilters;
