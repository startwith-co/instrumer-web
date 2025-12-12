'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren, createContext, useEffect } from 'react';

interface IAuthContext {
  initialized: boolean;
  session: Session;
}

export const AuthContext = createContext<IAuthContext | null>(null);

// 인증이 필요한 페이지 목록
const protectedPageList = ['/vendor'];

const isProtectedPage = (pathname: string) => {
  return protectedPageList.some((page) => pathname.startsWith(page));
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const needsAuth = isProtectedPage(pathname);

  useEffect(() => {
    // 인증이 필요한 페이지에서 미인증 시 로그인으로 리다이렉트
    if (needsAuth && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [router, needsAuth, status]);

  // 인증이 필요한 페이지에서만 로딩 표시
  if (needsAuth && status === 'loading') {
    return <div className="flex items-center justify-center w-full h-dvh">Loading...</div>;
  }

  // 인증이 필요한 페이지에서 세션 제공
  if (needsAuth && session?.user) {
    return <AuthContext.Provider value={{ initialized: true, session }}>{children}</AuthContext.Provider>;
  }

  // 나머지 페이지는 그냥 렌더링
  return <>{children}</>;
};

export default React.memo(AuthProvider);
