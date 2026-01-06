'use client';

import { SessionProvider as NextAuthSessionProvider, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const SessionErrorHandler = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      signOut({ redirect: false });
      router.push('/');
    }
  }, [session?.error, router]);

  return <>{children}</>;
};

const SessionProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextAuthSessionProvider>
      <SessionErrorHandler>{children}</SessionErrorHandler>
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
