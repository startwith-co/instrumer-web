'use client';

import { useLoginModal } from './login-modal';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthRequiredPageProps {
  message?: string;
}

const AuthRequiredPage = ({ message }: AuthRequiredPageProps) => {
  const { open: openLoginModal } = useLoginModal();
  const router = useRouter();
  const isAccessDenied = message === '접근 권한이 없습니다.';

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6">
      <LockKeyhole className="w-10 h-10 text-gray-400" />
      <h1 className="text-2xl font-semibold text-gray-900">{message ?? '로그인이 필요합니다'}</h1>
      <p className="text-gray-600">
        {isAccessDenied ? '해당 페이지에 접근할 수 없습니다.' : '이 페이지에 접근하려면 로그인이 필요합니다.'}
      </p>
      {!isAccessDenied ? (
        <Button
          onClick={openLoginModal}
          className="h-12 rounded-lg bg-primary px-8 text-base font-medium text-white hover:bg-primary/90"
        >
          로그인
        </Button>
      ) : (
        <Button onClick={() => router.push('/')}>홈으로</Button>
      )}
    </div>
  );
};

export default AuthRequiredPage;
