'use client';

import { type PropsWithChildren, useEffect, useRef } from 'react';

interface PaginatorProps {
  loadNextPage: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
}

/**
 * 채팅 목록 페이지네이터 (무한 스크롤)
 * Stream Chat의 ChannelList Paginator로 사용
 */
const ChatPaginator = ({ children, loadNextPage, hasNextPage, isLoading }: PropsWithChildren<PaginatorProps>) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isLoading, loadNextPage]);

  return (
    <div className="flex flex-col gap-3 p-4">
      {children}
      {/* 무한 스크롤 트리거 */}
      <div ref={observerRef} className="h-1" />
      {isLoading && (
        <div className="flex justify-center py-2">
          <span className="text-sm text-muted-foreground">로딩중...</span>
        </div>
      )}
    </div>
  );
};

export default ChatPaginator;
