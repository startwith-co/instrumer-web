/* @see https://authjs.dev/getting-started/typescript#extend-default-interface-properties */

/**
 * name, email, image 외에 추가 속성을 정의
 */
import { DefaultSession } from 'next-auth';
import type { UserRole } from './user';

declare module 'next-auth' {
  interface User {
    id?: string;
    name?: string;
    image?: string;
    role?: UserRole;
    brandId?: string;
    accessToken: string;
    refreshToken: string;
  }
  interface Session extends DefaultSession {
    user: User;
  }
}
