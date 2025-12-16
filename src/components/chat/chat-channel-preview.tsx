'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { ChannelPreviewUIComponentProps } from 'stream-chat-react';

dayjs.extend(relativeTime);
dayjs.locale('ko');

/** 날짜 포맷 (상대 시간: 1분 전, 2시간 전 등) */
const formatDate = (date?: Date) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

/** 이름의 첫 글자 추출 */
const getInitials = (name?: string) => {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
};

interface ChatChannelPreviewProps extends ChannelPreviewUIComponentProps {
  /** 현재 사용자 ID (상대방 이름 표시용) */
  currentUserId?: string;
}

/**
 * 채팅방 목록 아이템 컴포넌트
 * Stream Chat의 ChannelList Preview로 사용
 */
const ChatChannelPreview = ({
  channel,
  setActiveChannel,
  active,
  displayTitle,
  displayImage,
  lastMessage,
  unread,
}: ChatChannelPreviewProps) => {
  const handleClick = () => {
    setActiveChannel?.(channel);
  };

  const lastMessageText = lastMessage?.text || '새로운 대화를 시작하세요';
  const lastMessageAt = lastMessage?.created_at ? new Date(lastMessage.created_at) : undefined;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'relative flex w-full items-center gap-3 p-4 text-left transition-colors rounded-md bg-[#F5F5F5]',
        'hover:bg-muted/50',
        active && 'bg-white'
      )}
    >
      {/* 선택 표시 바 */}
      {active && <div className="absolute left-0 top-0 h-full w-1 bg-primary" />}

      {/* 읽지 않은 메시지 레드닷 */}
      {unread && unread > 0 ? (
        <div className="absolute right-2 top-2 size-2 rounded-full bg-red-500 animate-pulse" />
      ) : null}

      {/* 아바타 */}
      <Avatar className="size-[60px] shrink-0">
        <AvatarImage src={displayImage} alt={displayTitle} />
        <AvatarFallback className="bg-[#D9D9D9] text-muted-foreground">{getInitials(displayTitle)}</AvatarFallback>
      </Avatar>

      {/* 내용 */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {/* 이름 + 날짜 */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-foreground font-semibold text-lg">{displayTitle}</span>
          <span className="shrink-0 text-sm text-[#7A7A7A]">{formatDate(lastMessageAt)}</span>
        </div>

        {/* 마지막 메시지 */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-muted-foreground">{lastMessageText}</span>
        </div>
      </div>
    </button>
  );
};

export default ChatChannelPreview;
