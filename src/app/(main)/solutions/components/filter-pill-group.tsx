'use client';

import { cn } from '@/lib/utils';

interface IFilterPillGroupProps<T extends string> {
  options: { value: T; label: string }[];
  selected: T | T[] | null;
  onSelect: (value: T | null) => void;
  multiple?: boolean;
}

const FilterPillGroup = <T extends string>({
  options,
  selected,
  onSelect,
  multiple = false,
}: IFilterPillGroupProps<T>) => {
  const isSelected = (value: T) => {
    if (multiple && Array.isArray(selected)) {
      return selected.includes(value);
    }
    return selected === value;
  };

  const handleClick = (value: T) => {
    if (multiple && Array.isArray(selected)) {
      // 다중 선택: toggle
      onSelect(value);
    } else {
      // 단일 선택
      onSelect(value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          className={cn(
            'rounded-[7px] border px-4 py-2.5 text-xs transition-colors',
            isSelected(value) ? 'border-primary bg-primary text-white' : 'bg-[#F1F1F1] text-gray-900'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterPillGroup;
