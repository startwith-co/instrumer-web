'use client';

import { FILTER_CONFIG } from '@/constants/solution-constants';
import { FilterKey } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type FilterValues = Record<FilterKey, string[]>;

export const useSolutionFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parseFiltersFromUrl = useCallback((): FilterValues => {
    const result = {} as FilterValues;
    Object.entries(FILTER_CONFIG).forEach(([key, config]) => {
      const param = searchParams.get(config.paramName);
      result[key as FilterKey] = param ? (config.multiple ? param.split(',') : [param]) : [];
    });
    return result;
  }, [searchParams]);

  const appliedFilters = useMemo(() => parseFiltersFromUrl(), [parseFiltersFromUrl]);
  const [pendingFilters, setPendingFilters] = useState<FilterValues>(appliedFilters);

  useEffect(() => {
    setPendingFilters(appliedFilters);
  }, [appliedFilters]);

  const setFilter = useCallback((key: FilterKey, value: string | null) => {
    setPendingFilters((prev) => ({ ...prev, [key]: value ? [value] : [] }));
  }, []);

  const setBudgetFilter = useCallback((minPrice?: number, maxPrice?: number) => {
    setPendingFilters((prev) => ({
      ...prev,
      minPrice: minPrice !== undefined ? [minPrice.toString()] : [],
      maxPrice: maxPrice !== undefined ? [maxPrice.toString()] : [],
    }));
  }, []);

  const toggleFilter = useCallback((key: FilterKey, value: string) => {
    setPendingFilters((prev) => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');

    Object.entries(FILTER_CONFIG).forEach(([key, config]) => {
      const values = pendingFilters[key as FilterKey] || [];
      const isDefault = values.length === 1 && values[0] === config.defaultValue;
      if (values.length > 0 && !isDefault) {
        params.set(config.paramName, values.join(','));
      } else {
        params.delete(config.paramName);
      }
    });

    router.push(params.toString() ? `${pathname}?${params}` : pathname);
  }, [router, pathname, searchParams, pendingFilters]);

  const removeFilter = useCallback(
    (key: FilterKey, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const config = FILTER_CONFIG[key];
      params.delete('page');

      if (config.multiple && value) {
        const newValues = (appliedFilters[key] || []).filter((v) => v !== value);
        if (newValues.length > 0) {
          params.set(config.paramName, newValues.join(','));
        } else {
          params.delete(config.paramName);
        }
      } else {
        params.delete(config.paramName);
      }

      router.push(params.toString() ? `${pathname}?${params}` : pathname);
    },
    [router, pathname, searchParams, appliedFilters]
  );

  const clearFilters = useCallback(() => router.push(pathname), [router, pathname]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(FILTER_CONFIG).some(([key, config]) => {
      const values = appliedFilters[key as FilterKey] || [];
      return values.length > 0 && !(values.length === 1 && values[0] === config.defaultValue);
    });
  }, [appliedFilters]);

  return {
    pendingFilters,
    appliedFilters,
    setFilter,
    setBudgetFilter,
    toggleFilter,
    applyFilters,
    removeFilter,
    clearFilters,
    hasActiveFilters,
  };
};
