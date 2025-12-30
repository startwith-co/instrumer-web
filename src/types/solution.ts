import { IPageInfo } from './pageable';

// ============ Union Types (UI용) ============

export type Budget =
  | '전체'
  | '500,000원 미만'
  | '500,000원~1,000,000원 미만'
  | '1,000,000원~3,000,000원 미만'
  | '3,000,000원~5,000,000원 미만'
  | '5,000,000원~10,000,000원 미만'
  | '10,000,000원 이상';

export type Category =
  | 'ADVERTISING_AUTOMATION'
  | 'MARKETING_ANALYSIS_AUTOMATION'
  | 'INFLUENCER_CREATOR_COLLABORATION'
  | 'CRM'
  | 'CUSTOMER_SERVICE'
  | 'ACCOUNTING_FINANCE'
  | 'INVENTORY_LOGISTICS'
  | 'PAYMENT_SUBSCRIPTION'
  | 'CONTENT_CREATION_DESIGN';

export type FilterKey = 'category' | 'minPrice' | 'maxPrice';

export interface IFilterConfig {
  paramName: string;
  multiple: boolean;
  defaultValue?: string;
}

// ============ Common Types ============

// 솔루션 이미지
export interface ISolutionImage {
  imageUrl: string;
  imageType: string;
}

// 솔루션 플랜 상세
export interface ISolutionPlanDetail {
  name: string;
  context: string;
}

// 솔루션 플랜
export interface ISolutionPlan {
  name: string;
  subName?: string;
  price: number;
  planType: string;
  details?: ISolutionPlanDetail[];
}

// ============ Request Types ============

// 솔루션 생성 요청
export interface ICreateSolutionRequest extends Record<string, unknown> {
  name: string;
  explanation: string;
  category: string;
  price: number;
  images?: ISolutionImage[];
  plans?: ISolutionPlan[];
  keywords?: string[];
}

// 솔루션 수정 요청
export interface IUpdateSolutionRequest extends Record<string, unknown> {
  solutionSeq: number;
  name: string;
  explanation: string;
  category: string;
  price: number;
  images?: ISolutionImage[];
  plans?: ISolutionPlan[];
  keywords?: string[];
}

// 솔루션 목록 조회 파라미터
export interface ISolutionListParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}

// ============ Response Types ============

// 솔루션 생성 응답
export interface ICreateSolutionResponse {
  solutionSeq: number;
}

// 솔루션 상세 조회 응답
export interface IGetSolutionResponse {
  solutionSeq: number;
  name: string;
  explanation: string;
  category: string;
  price: number;
  images?: ISolutionImage[];
  plans?: ISolutionPlan[];
  reviewCnt: number;
  reviewAverage: number;
  vendorSeq: number;
  vendorBusinessName: string;
}

// 솔루션 목록 아이템
export interface IGetSolutionListItem {
  solutionSeq: number;
  image?: string;
  name: string;
  price: number;
  cnt: number;
  average: number;
  businessName: string;
}

// 솔루션 목록 조회 응답
export interface IGetSolutionListResponse {
  content: IGetSolutionListItem[];
  page: IPageInfo;
}
