'use client';

import AuthRequiredPage from '@/components/auth/auth-required-page';
import { UserType } from '@/types/auth';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, createContext } from 'react';

interface IAuthContext {
  initialized: boolean;
  session: Session;
}

export const AuthContext = createContext<IAuthContext | null>(null);

// userType별 접근 가능한 페이지 prefix 매핑
const protectedPageMap: Record<UserType, string[]> = {
  VENDOR: ['/vendor'],
  CONSUMER: ['/consumer'],
};

// 특정 페이지가 어떤 userType을 요구하는지 확인
const getRequiredUserType = (pathname: string): UserType | null => {
  for (const [userType, prefixes] of Object.entries(protectedPageMap)) {
    if (prefixes.some((prefix) => pathname.startsWith(prefix))) {
      return userType as UserType;
    }
  }
  return null;
};

// 인증이 필요한 페이지인지 확인
const isProtectedPage = (pathname: string): boolean => {
  return getRequiredUserType(pathname) !== null;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const needsAuth = isProtectedPage(pathname);
  const requiredUserType = getRequiredUserType(pathname);

  // 인증이 필요한 페이지에서만 로딩 표시
  if (needsAuth && status === 'loading') {
    return <div className="flex items-center justify-center w-full h-dvh">Loading...</div>;
  }

  // 인증이 필요한 페이지에서 미인증 시 로그인 필요 페이지 표시
  if (needsAuth && status === 'unauthenticated') {
    return <AuthRequiredPage />;
  }

  // 인증이 필요한 페이지에서 userType 검증
  if (needsAuth && session?.user) {
    const userType = session.user.userType;

    // userType이 없거나 요구되는 타입과 다른 경우 접근 거부
    if (requiredUserType && userType !== requiredUserType) {
      return <AuthRequiredPage message="접근 권한이 없습니다." />;
    }

    return <AuthContext.Provider value={{ initialized: true, session }}>{children}</AuthContext.Provider>;
  }

  // 나머지 페이지는 그냥 렌더링
  return <>{children}</>;
};

export default AuthProvider;
