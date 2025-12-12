'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface IErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: IErrorProps) => {
  const searchParams = useSearchParams();
  const initialSearchParams = useRef(searchParams.toString());

  useEffect(() => {
    console.error(error);
  }, [error]);

  // URL이 변경되면 자동으로 reset (최초 렌더링 제외)
  useEffect(() => {
    const currentParams = searchParams.toString();
    if (currentParams !== initialSearchParams.current) {
      reset();
    }
  }, [searchParams, reset]);

  return (
    <div className="flex size-full min-h-[calc(100vh-57px-80px)] items-center justify-center">
      <div className="flex flex-col gap-y-6 items-center">
        <div className="flex flex-col items-center text-ui-fg-subtle gap-y-3">
          <div className="text-center text-ui-fg-muted text-balance">
            {error.message ?? '오류가 발생했습니다.'}
          </div>
        </div>
        <div className="flex flex-col items-center text-ui-fg-subtle gap-y-3">
          에러 화면 들어갈 자리 디자인 필요
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm border-ui-border-base rounded-md transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};

export default Error;
