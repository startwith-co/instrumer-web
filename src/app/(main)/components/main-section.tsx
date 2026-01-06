import MainSectionInput from './main-section-input';
import { CATEGORY_OPTIONS } from '@/constants/solution-constants';
import Link from 'next/link';
import { IoChevronDown } from 'react-icons/io5';

const MainSection = () => {
  return (
    <div className="flex w-full min-h-[calc(100vh-60px)] flex-col items-center justify-center px-16 gap-10 relative">
      <div className="flex flex-col items-center gap-8 w-fit">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center text-5xl font-semibold tracking-tighter" id="top">
            <span className="text-primary font-bold block md:inline">가장 쉬운</span>
            <span className="block md:inline"> 비즈니스</span>
            <span className="block md:inline"> 문제 해결 플랫폼</span>
          </h1>
          <p className="text-center text-lg font-medium tracking-tight">
            비즈니스 문제 해결을 위한 온라인 솔루션을 <span className="text-primary font-bold">인스트루머</span>에서
            지금 바로 확인해보세요.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <MainSectionInput />
          <div className="flex gap-2 w-full overflow-x-auto scrollbar-hide">
            {CATEGORY_OPTIONS.slice(0, 3).map((button) => (
              <Link
                key={button.value}
                type="button"
                className="shrink-0 rounded-full text-sm whitespace-pre-line shadow-md bg-black text-white flex items-center justify-center px-6 py-3"
                href={`/solutions?category=${button.value}`}
              >
                {button.label as React.ReactNode}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 pt-24 absolute bottom-12">
        <p className="text-center font-medium text-sm">비즈니스 문제 해결하기</p>
        <a
          href="#solution"
          className="flex size-8 items-center justify-center rounded-full bg-black text-white shadow-xl transition hover:scale-110 animate-bounce"
        >
          <IoChevronDown size={16} />
        </a>
      </div>
    </div>
  );
};

export default MainSection;
