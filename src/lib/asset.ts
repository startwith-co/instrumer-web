import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';

// ============ Request Types ============

export interface IPresignedURLRequest {
  fileName: string;
  expiration?: number;
}

// ============ Response Types ============

export interface IPresignedURLResponse {
  url: string;
}

// S3 Presigned URL 생성
export const getPresignedUrl = ({ fileName, expiration }: IPresignedURLRequest) => {
  return fetchApi.post<IBaseResponse<IPresignedURLResponse>>('/api/public/presigned-url', {
    fileName,
    expiration: expiration ?? 60,
  });
};
