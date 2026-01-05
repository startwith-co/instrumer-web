'use client';

import FileUploadBox from '@/components/common/file-upload-box';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/controlled-input';
import { REGEX } from '@/constants/regex-constants';
import useTimer from '@/hooks/use-timer';
import { useRegisterVendorMutation, useSendEmailMutation, useVerifyEmailAuthKeyMutation } from '@/lib/b2b-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IVendorFormData {
  businessName: string;
  managerName: string;
  phone: string;
  email: string;
  authCode: string;
  password: string;
  passwordConfirm: string;
}

const VendorRegisterForm = () => {
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean | null>(null);
  const [businessImageUrl, setBusinessImageUrl] = useState<string>('');
  const { isRunning, start: startTimer, formattedTime } = useTimer({ initialSeconds: 60 });

  const { mutateAsync: sendEmail, isPending: isSendingEmail } = useSendEmailMutation();
  const { mutateAsync: verifyEmail, isPending: isVerifyingEmail } = useVerifyEmailAuthKeyMutation();
  const { mutateAsync: registerVendor, isPending: isRegistering } = useRegisterVendorMutation();

  const form = useForm<IVendorFormData>({
    defaultValues: {
      businessName: '',
      managerName: '',
      phone: '',
      email: '',
      authCode: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const watchEmail = form.watch('email');
  const watchPassword = form.watch('password');
  const watchPasswordConfirm = form.watch('passwordConfirm');

  // 인증코드 전송
  const handleSendAuthCode = async () => {
    const isValid = await form.trigger('email');
    if (!isValid) return;

    try {
      await sendEmail(watchEmail);
      setIsEmailSent(true);
      startTimer(60);
      form.clearErrors('email');
    } catch (error) {
      console.error('인증코드 전송 실패:', error);
      form.setError('email', { message: '인증코드 전송에 실패했습니다.' });
    }
  };

  // 인증코드 확인
  const handleVerifyAuthCode = async () => {
    const authCode = form.getValues('authCode');

    if (!authCode) {
      form.setError('authCode', { message: '인증코드를 입력해주세요.' });
      return;
    }

    try {
      await verifyEmail({ email: watchEmail, authCode });
      setIsEmailVerified(true);
      form.clearErrors('authCode');
    } catch (error) {
      console.error('인증코드 확인 실패:', error);
      form.setError('authCode', { message: '인증코드가 일치하지 않습니다.' });
    }
  };

  // 비밀번호 확인
  const handleCheckPassword = () => {
    const password = form.getValues('password');
    const passwordConfirm = form.getValues('passwordConfirm');

    if (!password) {
      form.setError('password', { message: '비밀번호를 입력해주세요.' });
      return;
    }

    if (!passwordConfirm) {
      form.setError('passwordConfirm', { message: '비밀번호 확인을 입력해주세요.' });
      return;
    }

    if (password === passwordConfirm) {
      setIsPasswordMatched(true);
      form.clearErrors('passwordConfirm');
    } else {
      setIsPasswordMatched(false);
      form.setError('passwordConfirm', { message: '비밀번호가 일치하지 않습니다.' });
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: IVendorFormData) => {
    if (!isEmailVerified) {
      form.setError('authCode', { message: '이메일 인증을 완료해주세요.' });
      return;
    }

    if (!isPasswordMatched) {
      form.setError('passwordConfirm', { message: '비밀번호 확인을 완료해주세요.' });
      return;
    }

    if (!businessImageUrl) {
      form.setError('root', { message: '사업자 등록증을 첨부해주세요.' });
      return;
    }

    try {
      await registerVendor({
        businessName: data.businessName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        businessImageUrl,
      });
      router.push('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      form.setError('root', { message: '회원가입에 실패했습니다.' });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-8">
        {/* 왼쪽: 입력 폼 */}
        <div className="flex-1 space-y-6">
          {/* 기업명 */}
          <ControlledInput
            form={form}
            name="businessName"
            label="기업명(상호명)"
            variant="underline"
            placeholder="기업명 입력"
            rules={{
              required: '기업명을 입력해주세요.',
              minLength: { value: 2, message: '기업명은 2자 이상 입력해주세요.' },
            }}
          />

          {/* 담당자 성함 */}
          <ControlledInput
            form={form}
            name="managerName"
            label="담당자 성함"
            variant="underline"
            placeholder="담당자 성함 입력"
            rules={{
              required: '담당자 성함을 입력해주세요.',
              minLength: { value: 2, message: '성함은 2자 이상 입력해주세요.' },
            }}
          />

          {/* 연락처 */}
          <ControlledInput
            form={form}
            name="phone"
            label="담당자 연락처(전화번호)"
            variant="underline"
            placeholder="담당자 연락처 입력"
            rules={{
              required: '연락처를 입력해주세요.',
              pattern: {
                value: REGEX.PHONE,
                message: '올바른 전화번호 형식을 입력해주세요.',
              },
            }}
          />

          {/* 이메일 */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">담당자 이메일</label>
            <div className="flex items-center gap-4">
              <ControlledInput
                form={form}
                name="email"
                variant="underline"
                placeholder="담당자 이메일 입력"
                disabled={isEmailVerified}
                className="flex-1"
                rules={{
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: REGEX.EMAIL,
                    message: '올바른 이메일 형식을 입력해주세요.',
                  },
                }}
              />
              <Button
                type="button"
                onClick={handleSendAuthCode}
                disabled={isSendingEmail || isEmailVerified || isRunning}
                className="h-auto shrink-0 rounded-full bg-primary px-9 py-3 text-base font-semibold leading-none"
              >
                {isSendingEmail ? '전송 중...' : isRunning ? `재전송 (${formattedTime})` : isEmailSent ? '인증코드 재전송' : '인증코드 전송'}
              </Button>
            </div>
          </div>

          {/* 인증코드 */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">인증코드 입력</label>
            <div className="flex items-center gap-4">
              <ControlledInput
                form={form}
                name="authCode"
                variant="underline"
                placeholder="인증코드 입력"
                disabled={!isEmailSent || isEmailVerified}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleVerifyAuthCode}
                disabled={!isEmailSent || isVerifyingEmail || isEmailVerified}
                className="h-auto shrink-0 rounded-full bg-primary px-9 py-3 text-base font-semibold leading-none"
              >
                {isVerifyingEmail ? '확인 중...' : isEmailVerified ? '인증완료' : '인증코드 확인'}
              </Button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              비밀번호 입력 <span className="text-xs text-gray-400">*8~16자리 입력, 특수기호(!@#$) 1개 포함</span>
            </label>
            <ControlledInput
              form={form}
              name="password"
              type="password"
              variant="underline"
              placeholder="비밀번호 입력"
              rules={{
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: REGEX.PASSWORD,
                  message: '8~16자리, 특수기호(!@#$) 1개 이상 포함해야 합니다.',
                },
              }}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="mb-2 block text-sm text-gray-600">비밀번호 확인</label>
            <div className="flex items-center gap-4">
              <ControlledInput
                form={form}
                name="passwordConfirm"
                type="password"
                variant="underline"
                placeholder="비밀번호 재입력"
                className="flex-1"
                rules={{
                  required: '비밀번호 확인을 입력해주세요.',
                  validate: (value) => value === watchPassword || '비밀번호가 일치하지 않습니다.',
                }}
              />
              <Button
                type="button"
                onClick={handleCheckPassword}
                disabled={!watchPassword || !watchPasswordConfirm}
                className="h-auto shrink-0 rounded-full bg-primary px-9 py-3 text-base font-semibold leading-none"
              >
                비밀번호 확인
              </Button>
            </div>
            {isPasswordMatched === true && <p className="mt-1 text-sm text-green-500">비밀번호가 일치합니다.</p>}
          </div>
        </div>

        {/* 오른쪽: 사업자 등록증 업로드 */}
        <div className="w-[200px] shrink-0">
          <FileUploadBox
            value={businessImageUrl}
            onChange={setBusinessImageUrl}
            type="image"
            label="사업자 등록증 첨부"
            height={220}
            className="w-full"
          />
        </div>
      </div>

      {/* 에러 메시지 */}
      {form.formState.errors.root && (
        <p className="text-center text-sm text-red-500">{form.formState.errors.root.message}</p>
      )}

      {/* 제출 버튼 */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isRegistering || !isEmailVerified || !isPasswordMatched || !businessImageUrl}
          className="h-auto w-full rounded-md bg-primary px-[132px] py-5 text-xl font-medium leading-none text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          {isRegistering ? '가입 중...' : '벤더로 회원가입 하기'}
        </Button>
      </div>
    </form>
  );
};

export default VendorRegisterForm;
