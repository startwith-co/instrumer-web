'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSuspenseUserInfo } from '@/lib/user';
import { cn } from '@/lib/utils';
import { Star, User } from '@medusajs/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

const MYPAGE_MENU = [
  { label: '내 정보', href: '/customer/mypage/info', icon: User },
  { label: '결제 이력', href: '/customer/mypage/history', icon: Star },
];

const SidebarContent = () => {
  const pathname = usePathname();
  const { data: userData } = useSuspenseUserInfo();
  const user = userData?.data;

  const displayName = user?.businessName || user?.managerName || user?.email || '-';

  return (
    <div className="flex flex-col items-center py-8 w-full gap-4">
      {/* 프로필 섹션 */}
      <Avatar className="size-24">
        <AvatarImage src={user?.profileImageUrl} alt="프로필" />
        <AvatarFallback className="bg-gray-200 text-gray-500 text-2xl">
          {displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{displayName}</h2>

      {/* 메뉴 네비게이션 */}
      <nav className="px-4 w-full">
        {MYPAGE_MENU.map((menu) => {
          const isActive = pathname === menu.href;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                isActive ? 'text-primary border-l-2 border-primary' : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="size-5" />
              <span>{menu.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const SidebarSkeleton = () => (
  <>
    <div className="flex flex-col items-center py-8 animate-pulse">
      <div className="size-24 rounded-full bg-gray-200" />
      <div className="mt-4 h-5 w-24 bg-gray-200 rounded" />
    </div>
    <nav className="px-4 space-y-2">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="size-5 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      ))}
    </nav>
  </>
);

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-16 py-8">
        <div className="flex gap-8">
          {/* 사이드바 */}
          <aside className="w-[280px] shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 sticky top-24">
              <Suspense fallback={<SidebarSkeleton />}>
                <SidebarContent />
              </Suspense>
            </div>
          </aside>

          {/* 메인 컨텐츠 */}
          <main className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MypageLayout;
