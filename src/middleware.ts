import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 보호된 라우트 prefix
const protectedPrefixes = ['/vendor', '/consumer'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 라우트인지 확인
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  // NextAuth JWT 토큰 확인
  const token = await getToken({ req: request });

  // 토큰이 없으면 홈으로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/vendor/:path*', '/consumer/:path*'],
};
