'use client';

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useSearchParams } from '@/hooks/use-search-params';
import { ILoginFormValue } from '@/lib/auth';
import { X } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const router = useRouter();
  const { searchParams } = useSearchParams();
  const {
    handleSubmit: formHandleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = formHandleSubmit(async (data) => {
    const result = await signIn('login-credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    router.push(searchParams['callbackUrl'] ?? '/');
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="relative w-full max-w-[400px] rounded-xl bg-white p-8 shadow-lg">
      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-6 w-6" />
      </button>

      {/* 제목 */}
      <h2 className="mb-8 text-center text-xl font-semibold text-gray-900">로그인</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이메일 입력 */}
        <div>
          <Input
            type="email"
            placeholder="이메일 입력"
            {...register('email', { required: '이메일을 입력해주세요.' })}
            className="h-12 rounded-lg border-gray-300 bg-gray-50 px-4"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
            className="h-12 rounded-lg border-gray-300 bg-gray-50 px-4"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* 비밀번호 찾기 */}
        <div className="text-left">
          <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700">
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-lg bg-primary text-base font-medium text-white hover:bg-primary/90"
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
