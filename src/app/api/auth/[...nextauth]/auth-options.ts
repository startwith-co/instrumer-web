import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider, { CredentialsConfig } from 'next-auth/providers/credentials';

const credentialsProviderOption: CredentialsConfig = {
  type: 'credentials',
  id: 'login-credentials',
  name: 'login-credentials',
  credentials: {
    login: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials: Record<string, unknown> | undefined) {
    try {
      // const user = await login({
      //   login: credentials?.login as string,
      //   password: credentials?.password as string,
      // });

      // 테스트용 임의 ID 로그인 (password가 'test'인 경우)
      if (credentials?.password === 'test' && credentials?.login) {
        return {
          id: credentials.login as string,
          name: credentials.login as string,
          role: 'customer',
          accessToken: '',
          refreshToken: '',
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
  pages: {
    signIn: '/login',
  },
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
        // 테스트용 빈 토큰인 경우 jwtDecode 스킵
        const accessToken = user.accessToken as string;
        let exp: number | undefined;

        if (accessToken) {
          try {
            exp = jwtDecode(accessToken).exp as number;
          } catch {
            // 유효하지 않은 JWT인 경우 무시
          }
        }

        return {
          user,
          accessToken,
          refreshToken: user.refreshToken,
          exp,
        };
      }

      // // [2] 로그인 이후 토큰 만료 전
      // if (dayjs().isBefore(dayjs((token.exp as number) * 1000))) {
      //   return token;
      // }

      // // [3] 로그인 이후 토큰 만료 후
      // const { accessToken, refreshToken } = await tokenRefresh(token.refreshToken as string);

      // token.accessToken = accessToken;
      // token.refreshToken = refreshToken;
      // token.exp = jwtDecode(accessToken).exp as number;

      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },
};
