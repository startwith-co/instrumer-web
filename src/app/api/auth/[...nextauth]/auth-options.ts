import { login, tokenRefresh } from '@/lib/auth';
import { IJwtPayload } from '@/types/auth';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';

const credentialsProviderOption: CredentialsConfig = {
  type: 'credentials',
  id: 'login-credentials',
  name: 'login-credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials: Record<string, unknown> | undefined) {
    try {
      const response = await login({
        email: credentials?.email as string,
        password: credentials?.password as string,
      });

      if (response) {
        return {
          id: credentials?.email as string,
          name: credentials?.email as string,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
      }

      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider(credentialsProviderOption)],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update') {
        token.user = session.user;
        return token;
      }

      // token: default jwt object
      // user: 최초 로그인 시 사용자 정보가 들어있고 이후에는 null
      // account: 최초 로그인 시 provider 정보가 들어있고 이후에는 null

      // [1] 최초 로그인 시
      if (account && user) {
        const accessToken = user.accessToken as string;
        let exp: number | undefined;
        let userType: IJwtPayload['userType'] | undefined;
        let userSeq: number | undefined;

        if (accessToken) {
          try {
            const decoded = jwtDecode<IJwtPayload>(accessToken);
            exp = decoded.exp;
            userType = decoded.userType;
            userSeq = decoded.userSeq;
          } catch {
            // 유효하지 않은 JWT인 경우 무시
          }
        }

        return {
          user: { ...user, userType, userSeq },
          accessToken,
          refreshToken: user.refreshToken,
          exp,
        };
      }

      // [2] 로그인 이후 토큰 만료 전
      if (token.exp && dayjs().isBefore(dayjs((token.exp as number) * 1000))) {
        return token;
      }

      // [3] 로그인 이후 토큰 만료 후 - 리프레시
      if (token.refreshToken) {
        try {
          const { accessToken, refreshToken } = await tokenRefresh(token.refreshToken as string);
          const decoded = jwtDecode<IJwtPayload>(accessToken);

          return {
            ...token,
            user: {
              ...(token.user as User),
              userType: decoded.userType,
              userSeq: decoded.userSeq,
            },
            accessToken,
            refreshToken,
            exp: decoded.exp,
          };
        } catch (error) {
          console.error('Token refresh failed:', error);
          // 리프레시 실패 시 토큰 무효화
          return {
            ...token,
            user: {
              ...(token.user as User),
              accessToken: null,
              refreshToken: null,
            },
            accessToken: null,
            refreshToken: null,
            exp: null,
            error: 'RefreshTokenError',
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      if (token.error) {
        session.error = token.error as string;
      }
      return session;
    },
  },
};
