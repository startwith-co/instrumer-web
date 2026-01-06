import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Body = Record<string, unknown> | Record<string, unknown>[] | FormData;

interface IFetchApiArgs {
  method: string;
  url: string;
  body?: Body;
  external?: boolean;
}

// 세션 가져오기 (SSR/CSR 분기)
const getAuthSession = async () => {
  if (typeof window === 'undefined') {
    // SSR: getServerSession 사용 (jwt 콜백 실행 → 토큰 리프레시 동작)
    return await getServerSession(authOptions);
  }
  // CSR: getSession 사용
  return await getSession();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _fetchApi = async <T = object>({ method, url, body }: IFetchApiArgs): Promise<T> => {
  const session = await getAuthSession();
  const baseUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000' : '';

  const response = await axios({
    method,
    url: `${baseUrl}${url}`,
    data: method !== 'GET' ? body : undefined,
    params: method === 'GET' ? body : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(session?.user?.accessToken && { Authorization: `Bearer ${session.user.accessToken}` }),
    },
    withCredentials: true,
  }).catch(async (error) => {
    const isUnauthorized = error?.response?.status === 401;

    // Case. SSR - 401 시 로그인 페이지로 리다이렉트
    if (typeof window === 'undefined') {
      if (isUnauthorized) {
        redirect('/');
      }
      throw error;
    }

    // Case CSR - 401 시 로그아웃 후 리다이렉트
    if (isUnauthorized && window.location.pathname !== '/') {
      await signOut({ redirect: false });
      redirect('/');
    }

    throw error;
  });

  return response?.data;
};

type FetchApi = {
  post: <T = object>(url: string, body?: Body) => Promise<T>;
  get: <T = object>(url: string, params?: Record<string, unknown>) => Promise<T>;
  patch: <T = object>(url: string, body?: Body) => Promise<T>;
  put: <T = object>(url: string, body?: Body) => Promise<T>;
  delete: <T = object>(url: string) => Promise<T>;
};

export const fetchApi: FetchApi = {
  post: (url, body) =>
    _fetchApi({
      method: 'POST',
      url,
      body,
    }),
  get: (url, params) =>
    _fetchApi({
      method: 'GET',
      url,
      body: params,
    }),
  patch: (url, body) =>
    _fetchApi({
      method: 'PATCH',
      url,
      body,
    }),
  put: (url, body) =>
    _fetchApi({
      method: 'PUT',
      url,
      body,
    }),
  delete: (url) =>
    _fetchApi({
      method: 'DELETE',
      url,
    }),
};

export const externalFetchApi: FetchApi = {
  post: (url, body) =>
    _fetchApi({
      method: 'POST',
      url,
      body,
      external: true,
    }),
  get: (url, params) =>
    _fetchApi({
      method: 'GET',
      url,
      body: params,
      external: true,
    }),
  patch: (url, body) =>
    _fetchApi({
      method: 'PATCH',
      url,
      body,
      external: true,
    }),
  put: (url, body) =>
    _fetchApi({
      method: 'PUT',
      url,
      body,
      external: true,
    }),
  delete: (url) =>
    _fetchApi({
      method: 'DELETE',
      url,
      external: true,
    }),
};
