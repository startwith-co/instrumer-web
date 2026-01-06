'use client';

import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/controlled-input';
import { useModals } from '@/contexts/modal-provider';
import { ILoginFormValue } from '@/lib/auth';
import { X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const LOGIN_MODAL_ID = 'login-modal';

interface ILoginModalContentProps {
  onClose: () => void;
}

const LoginModalContent = ({ onClose }: ILoginModalContentProps) => {
  const router = useRouter();
  const form = useForm<ILoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    const result = await signIn('login-credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      form.setError('password', {
        type: 'manual',
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
      return;
    }

    handleClose();
    router.refresh();
  });

  return (
    <div className="relative w-[400px] rounded-xl bg-white p-8 shadow-lg">
      <button type="button" onClick={handleClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
        <X className="h-6 w-6" />
      </button>

      <h2 className="mb-8 text-center text-xl font-semibold text-gray-900">로그인</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <ControlledInput
          form={form}
          name="email"
          placeholder="이메일 입력"
          rules={{
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          }}
          className="h-12 rounded-lg border-gray-300 bg-gray-50 px-4"
        />

        <ControlledInput
          form={form}
          name="password"
          type="password"
          placeholder="비밀번호 입력"
          rules={{ required: '비밀번호를 입력해주세요.' }}
          className="h-12 rounded-lg border-gray-300 bg-gray-50 px-4"
        />

        <div className="text-left">
          <Link
            href="/forgot-password"
            onClick={handleClose}
            className="text-sm text-gray-500 underline hover:text-gray-700"
          >
            비밀번호를 잊어버리셨나요?
          </Link>
        </div>

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

export const useLoginModal = () => {
  const { openModal, closeModal } = useModals();

  const open = useCallback(() => {
    openModal({
      id: LOGIN_MODAL_ID,
      component: <LoginModalContent onClose={() => closeModal(LOGIN_MODAL_ID)} />,
    });
  }, [openModal, closeModal]);

  const close = useCallback(() => {
    closeModal(LOGIN_MODAL_ID);
  }, [closeModal]);

  return { open, close };
};

interface ILoginModalProps {
  trigger?: React.ReactNode;
}

const LoginModal = ({ trigger }: ILoginModalProps) => {
  const { open } = useLoginModal();

  return trigger ? (
    <div onClick={open} className="cursor-pointer">
      {trigger}
    </div>
  ) : (
    <button type="button" onClick={open} className="text-sm text-gray-700 hover:text-gray-900">
      로그인
    </button>
  );
};

export default LoginModal;
