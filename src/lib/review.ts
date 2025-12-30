import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';
import {
  ICreateSolutionReviewRequest,
  ICreateSolutionReviewResponse,
  IGetSolutionReviewPageResponse,
  ISolutionReviewListParams,
} from '@/types/review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 솔루션별 리뷰 목록 조회 (Public)
export const useSolutionReviews = (solutionSeq?: number, params?: ISolutionReviewListParams) => {
  return useQuery<IBaseResponse<IGetSolutionReviewPageResponse>>({
    queryKey: [`/api/public/solutions/${solutionSeq}/reviews`, params],
    enabled: !!solutionSeq,
  });
};

// 리뷰 작성 (Consumer)
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ solutionSeq, ...data }: ICreateSolutionReviewRequest) =>
      await fetchApi.post<IBaseResponse<ICreateSolutionReviewResponse>>(
        `/api/consumer/solutions/${solutionSeq}/reviews`,
        data
      ),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [`/api/public/solutions/${variables.solutionSeq}/reviews`],
        refetchType: 'all',
      });
    },
  });
};
