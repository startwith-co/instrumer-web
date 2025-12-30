import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Body = Record<string, unknown> | Record<string, unknown>[] | FormData;

interface IFetchApiArgs {
  method: string;
  url: string;
  body?: Body;
  external?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _fetchApi = async <T = object>({ method, url, body }: IFetchApiArgs): Promise<T> => {
  const session = await getSession();
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
    // Case. SSR
    if (typeof window === 'undefined') throw error;

    // Case CSR
    if (error?.status === 401 && window.location.pathname !== '/') {
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
