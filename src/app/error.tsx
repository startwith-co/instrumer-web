'use client';

import { useEffect } from 'react';

interface IErrorProps {
  error: Error & { digest?: string };
}

const Error = ({ error }: IErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full min-h-[calc(100vh-57px-24px)] items-center justify-center">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col items-center text-ui-fg-subtle gap-y-3">
          <div className="flex flex-col items-center justify-center gap-y-1">
            <div className="text-center text-ui-fg-muted text-balance">{error.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
