import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';
import { ILoginUserResponse, IReIssueTokenResponse } from '@/types/auth';

export interface ILoginFormValue extends Record<string, unknown> {
  email: string;
  password: string;
}

export const login = async (value: ILoginFormValue): Promise<ILoginUserResponse> => {
  const response = await fetchApi.post<IBaseResponse<ILoginUserResponse>>('/api/public/login', value);
  return response.data;
};

export const tokenRefresh = async (refreshToken: string): Promise<IReIssueTokenResponse> => {
  const response = await fetchApi.post<IBaseResponse<IReIssueTokenResponse>>('/api/public/reissue-token', { refreshToken });
  return response.data;
};
