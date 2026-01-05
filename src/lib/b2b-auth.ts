import { fetchApi } from './base';
import { useMutation } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import {
  ILoginUserRequest,
  ILoginUserResponse,
  IRegisterVendorRequest,
  IRegisterConsumerRequest,
  IVerifyEmailAuthKeyRequest,
  IReissueTokenRequest,
  IReIssueTokenResponse,
} from '@/types/auth';

// 로그인
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: ILoginUserRequest) =>
      await fetchApi.post<IBaseResponse<ILoginUserResponse>>('/api/public/login', data),
  });
};

// 벤더 회원가입
export const useRegisterVendorMutation = () => {
  return useMutation({
    mutationFn: async (data: IRegisterVendorRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/public/register/vendor', data),
  });
};

// 수요기업 회원가입
export const useRegisterConsumerMutation = () => {
  return useMutation({
    mutationFn: async (data: IRegisterConsumerRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/public/register/consumer', data),
  });
};

// 이메일 전송 (인증코드 발송)
export const useSendEmailMutation = () => {
  return useMutation({
    mutationFn: async (email: string) =>
      await fetchApi.get<IBaseResponse<string>>(`/api/public/send-email/${email}`),
  });
};

// 이메일 인증 확인
export const useVerifyEmailAuthKeyMutation = () => {
  return useMutation({
    mutationFn: async (data: IVerifyEmailAuthKeyRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/public/auth-code', data),
  });
};

// 토큰 재발급
export const useReissueTokenMutation = () => {
  return useMutation({
    mutationFn: async (data: IReissueTokenRequest) =>
      await fetchApi.post<IBaseResponse<IReIssueTokenResponse>>('/api/public/reissue-token', data),
  });
};
