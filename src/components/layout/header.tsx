'use client';

import { Dropdown } from '@/components/ui/dropdown';
import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import { ChevronDown } from '@medusajs/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full backdrop-blur-[2000px] shadow-[0px_5px_10px_0px_#0000001A] sticky top-0 z-10">
      <div className="flex items-center justify-between h-[90px] px-[100px]">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src="/images/logo.svg" alt="logo" width={154} height={42} />
          </Link>

          <Dropdown.Root>
            <Dropdown.Trigger className="flex items-center gap-2 text-lg text-gray-700 hover:text-gray-900 ">
              온라인 솔루션 탐색
              <ChevronDown className="w-4 h-4" />
            </Dropdown.Trigger>
            <Dropdown.Content align="start" sideOffset={8}>
              {CATEGORY_OPTIONS.map((category) => (
                <Dropdown.Item
                  key={category.value}
                  className="text-start whitespace-nowrap px-6 py-2 text-lg"
                  onSelect={() => router.push(`/solutions?category=${category.value}`)}
                >
                  {category.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[18px] text-gray-700 hover:text-gray-900">
            로그인
          </Link>
          <Link href="/signup" className="text-[18px] text-gray-700 hover:text-gray-900">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
