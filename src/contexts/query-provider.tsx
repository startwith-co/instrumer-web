'use client';

import { useAlert } from './alert-provider';
import { fetchApi } from '@/lib/base';
import { getErrorMessage, isUnauthorizedError } from '@/lib/error';
import { getClearObject } from '@/utils/utils';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { alert } = useAlert();

  const fetcher = async (url: string, params?: Record<string, unknown>) => {
    return fetchApi.get(url, params);
  };

  const handleError = async (error: Error) => {
    // 401 에러: 로그아웃 후 홈으로 리다이렉트
    if (isUnauthorizedError(error)) {
      await signOut({ redirect: false });
      window.location.href = '/';
      return;
    }

    alert({
      variant: 'error',
      children: getErrorMessage(error),
    });
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleError,
        }),
        mutationCache: new MutationCache({
          onError: handleError,
        }),
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
            // 401 에러는 Error Boundary로 전파하지 않음 (handleError에서 처리)
            throwOnError: (error) => !isUnauthorizedError(error),
            queryFn: ({ queryKey }) =>
              fetcher(queryKey[0] as string, queryKey[1] ? getClearObject(queryKey[1]) : undefined),
            placeholderData: keepPreviousData,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
