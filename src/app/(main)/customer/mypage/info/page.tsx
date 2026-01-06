'use client';

import FileUploadBox from '@/components/common/file-upload-box';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ControlledInput } from '@/components/ui/controlled-input';
import { useDeleteUserMutation, useSuspenseUserInfo, useUpdateUserMutation } from '@/lib/user';
import { Camera } from '@medusajs/icons';
import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IMyInfoFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const MyInfoContent = () => {
  const { data: userData } = useSuspenseUserInfo();
  const user = userData?.data;

  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMutation();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const [profileImageUrl, setProfileImageUrl] = useState<string>(user?.profileImageUrl || '');

  const displayName = user?.businessName || user?.managerName || user?.email || '-';

  const form = useForm<IMyInfoFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const { handleSubmit, reset } = form;

  // 유저 데이터로 폼 초기화
  useEffect(() => {
    if (user) {
      reset({
        name: user.businessName || user.managerName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      setProfileImageUrl(user.profileImageUrl || '');
    }
  }, [user, reset]);

  const onSubmit = async (data: IMyInfoFormData) => {
    try {
      const updateData = {
        businessName: data.name,
        phone: data.phone,
        password: data.password,
        profileImageUrl: profileImageUrl,
      };

      await updateUser(updateData);
    } catch (error) {
      console.error('정보 수정 실패:', error);
    }
  };

  const handleWithdraw = async () => {
    const confirmed = window.confirm('정말 계정을 탈퇴하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다.');

    if (!confirmed) return;

    try {
      await deleteUser();
    } catch (error) {
      console.error('계정 탈퇴 실패:', error);
    }
  };

  const isLoading = isUpdating || isDeleting;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 프로필 이미지 섹션 */}
      <div className="mb-10">
        <div className="relative inline-block">
          <Avatar className="size-32 border-2 border-gray-100">
            <AvatarImage src={profileImageUrl} alt="프로필" />
            <AvatarFallback className="bg-gray-200 text-gray-500 text-3xl">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <FileUploadBox value={profileImageUrl} onChange={setProfileImageUrl} type="image">
            {({ open, uploading }) => (
              <button
                type="button"
                className="absolute bottom-1 right-1 p-2 bg-gray-500 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={open}
                disabled={isLoading || uploading}
              >
                {uploading ? (
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="text-white" />
                )}
              </button>
            )}
          </FileUploadBox>
        </div>
      </div>

      {/* 정보 필드 그리드 */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <ControlledInput
          form={form}
          name="name"
          label="사용자명(상호명)"
          variant="underline"
          placeholder="사용자명을 입력하세요"
          rules={{ required: '사용자명을 입력해주세요.' }}
          disabled={isLoading}
        />
        <ControlledInput
          form={form}
          name="email"
          label="사용자 이메일"
          variant="underline"
          type="email"
          placeholder="이메일을 입력하세요"
          disabled
        />
        <ControlledInput
          form={form}
          name="phone"
          label="사용자 연락처(전화번호)"
          variant="underline"
          type="tel"
          placeholder="연락처를 입력하세요"
          rules={{ required: '연락처를 입력해주세요.' }}
          disabled={isLoading}
        />
        <ControlledInput
          form={form}
          name="password"
          label="비밀번호"
          variant="underline"
          type="password"
          placeholder="비밀번호를 입력하세요"
          disabled={isLoading}
        />
      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-center gap-4 mt-12">
        <Button
          type="button"
          variant="outline"
          className="w-60 h-12 text-gray-500 bg-gray-100 border-gray-200 hover:bg-gray-200"
          onClick={handleWithdraw}
          disabled={isLoading}
        >
          {isDeleting ? '처리중...' : '계정 탈퇴하기'}
        </Button>
        <Button type="submit" className="w-60 h-12" disabled={isLoading}>
          {isUpdating ? '저장중...' : '수정하기'}
        </Button>
      </div>
    </form>
  );
};

const MyInfoSkeleton = () => (
  <div className="animate-pulse">
    <div className="mb-10">
      <div className="size-32 rounded-full bg-gray-200" />
    </div>
    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-9 w-full bg-gray-200 rounded" />
        </div>
      ))}
    </div>
    <div className="flex justify-center gap-4 mt-12">
      <div className="w-60 h-12 bg-gray-200 rounded" />
      <div className="w-60 h-12 bg-gray-200 rounded" />
    </div>
  </div>
);

const MyInfoPage = () => {
  return (
    <Suspense fallback={<MyInfoSkeleton />}>
      <MyInfoContent />
    </Suspense>
  );
};

export default MyInfoPage;
