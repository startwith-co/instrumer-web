import { IPageInfo } from './pageable';

// ============ Request Types ============

// 솔루션 리뷰 작성 요청
export interface ICreateSolutionReviewRequest extends Record<string, unknown> {
  solutionSeq: number;
  context: string;
  rate: number;
}

// 솔루션 리뷰 목록 조회 파라미터
export interface ISolutionReviewListParams extends Record<string, unknown> {
  page?: number;
  size?: number;
}

// ============ Response Types ============

// 솔루션 리뷰 작성 응답
export interface ICreateSolutionReviewResponse {
  solutionReviewSeq: number;
}

// 솔루션 리뷰 아이템
export interface IGetSolutionReviewResponse {
  solutionReviewSeq: number;
  profileImageUrl?: string;
  businessName: string;
  rate: number;
  context: string;
  createdAt: string;
}

// 솔루션 리뷰 목록 조회 응답
export interface IGetSolutionReviewPageResponse {
  content: IGetSolutionReviewResponse[];
  pageInfo: IPageInfo;
}
