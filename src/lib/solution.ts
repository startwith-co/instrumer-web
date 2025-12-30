import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';
import {
  ICreateSolutionRequest,
  ICreateSolutionResponse,
  IGetSolutionListResponse,
  IGetSolutionResponse,
  ISolutionListParams,
  IUpdateSolutionRequest,
} from '@/types/solution';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 솔루션 목록 조회 (Public)
export const useSolutions = (params?: ISolutionListParams) => {
  return useQuery<IBaseResponse<IGetSolutionListResponse>>({
    queryKey: ['/api/public/solutions/list', params],
  });
};

// 솔루션 상세 조회 (Public)
export const useSolution = (solutionSeq?: number) => {
  return useQuery<IBaseResponse<IGetSolutionResponse>>({
    queryKey: [`/api/public/solutions/${solutionSeq}`],
    enabled: !!solutionSeq,
  });
};

// 솔루션 생성 (Vendor)
export const useCreateSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ICreateSolutionRequest) =>
      await fetchApi.post<IBaseResponse<ICreateSolutionResponse>>('/api/vendor/solutions', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/public/solutions/list'],
        refetchType: 'all',
      });
    },
  });
};

// 솔루션 수정 (Vendor)
export const useUpdateSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IUpdateSolutionRequest) =>
      await fetchApi.put<IBaseResponse<ICreateSolutionResponse>>('/api/vendor/solutions', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/public/solutions'],
        refetchType: 'all',
      });
    },
  });
};

// 솔루션 삭제 (Vendor)
export const useDeleteSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (solutionSeq: number) =>
      await fetchApi.delete<IBaseResponse<string>>(`/api/vendor/solutions?solutionSeq=${solutionSeq}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/public/solutions/list'],
        refetchType: 'all',
      });
    },
  });
};
