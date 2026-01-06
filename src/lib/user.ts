import { IBaseResponse } from '@/types/api';
import { UserType } from '@/types/auth';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export interface IUserResponse {
  userSeq: number;
  email: string;
  userType: UserType;
  profileImageUrl?: string;
  businessName: string;
  managerName: string;
  phone: string;
  bank?: string;
  account?: string;
}

// 유저 정보 조회 (세션 없이 직접 호출 - authorize 콜백용)
export const fetchUserInfo = async (accessToken: string): Promise<IUserResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    const response = await axios.get<IBaseResponse<IUserResponse>>(`${baseUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return null;
  }
};

// 현재 로그인한 사용자 정보 조회
export const useUser = () => {
  const { data: session } = useSession();

  return useQuery<IBaseResponse<IUserResponse>>({
    queryKey: ['/api/users'],
    enabled: !!session?.user?.accessToken,
  });
};

// 현재 로그인한 사용자 정보 조회 (Suspense)
export const useSuspenseUserInfo = () => {
  return useSuspenseQuery<IBaseResponse<IUserResponse>>({
    queryKey: ['/api/users'],
  });
};

// 특정 유저 정보 조회
export const fetchUserInfoByUserSeq = async (userSeq: number): Promise<IUserResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';
    const response = await axios.get<IBaseResponse<IUserResponse>>(`${baseUrl}/api/public/${userSeq}`);
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    return null;
  }
};
