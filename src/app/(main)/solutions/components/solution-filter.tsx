'use client';

import AppliedFilters from './applied-filters';
import FilterPillGroup from './filter-pill-group';
import FilterSection from './filter-section';
import { BUDGET_OPTIONS, CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { useSolutionFilter } from '@/hooks/use-solution-filter';
import { Budget, Category } from '@/types';

const SolutionFilter = () => {
  const { pendingFilters, appliedFilters, setBudgetFilter, setFilter, applyFilters, removeFilter, hasActiveFilters } =
    useSolutionFilter();

  // 현재 선택된 budget 옵션 찾기
  const selectedBudget = BUDGET_OPTIONS.find(
    (opt) =>
      (opt.minPrice?.toString() === pendingFilters.minPrice[0] || (!opt.minPrice && !pendingFilters.minPrice[0])) &&
      (opt.maxPrice?.toString() === pendingFilters.maxPrice[0] || (!opt.maxPrice && !pendingFilters.maxPrice[0]))
  );

  return (
    <div className="flex w-[325px] shrink-0 flex-col gap-[50px]">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-900">검색 필터</h2>

        <FilterSection title="솔루션 상세 검색">
          <div className="space-y-[30px]">
            <div>
              <p className="mb-2 text-sm text-gray-600">솔루션 카테고리 선택</p>
              <FilterPillGroup<Category>
                options={CATEGORY_OPTIONS}
                selected={(pendingFilters.category[0] as Category) || null}
                onSelect={(value) => value && setFilter('category', value)}
              />
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">예산 설정</p>
              <FilterPillGroup<Budget>
                options={BUDGET_OPTIONS}
                selected={selectedBudget?.value || null}
                onSelect={(value) => {
                  const option = BUDGET_OPTIONS.find((opt) => opt.value === value);
                  setBudgetFilter(option?.minPrice, option?.maxPrice);
                }}
              />
            </div>

            <button
              type="button"
              onClick={applyFilters}
              className="w-full rounded-[7px] bg-primary py-3 text-base font-medium text-white transition-colors hover:bg-primary/90"
            >
              설정하기
            </button>
          </div>
        </FilterSection>
      </div>

      {hasActiveFilters && <AppliedFilters appliedFilters={appliedFilters} onRemove={removeFilter} />}
    </div>
  );
};

export default SolutionFilter;
