// 페이지 정보
export interface IPageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// 페이지네이션 파라미터
export interface IPageableParams {
  page?: number;
  size?: number;
}
