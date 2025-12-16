'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useChatContext, useChannelStateContext } from 'stream-chat-react';

/**
 * 채팅방 헤더 컴포넌트
 * 상대방 아바타와 이름 표시
 */
const ChatHeader = () => {
  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

  // 현재 로그인한 사용자를 제외한 상대방 찾기
  const members = Object.values(channel?.state?.members || {});
  const otherMember = members.find((member) => member.user?.id !== client.userID);

  const displayTitle = otherMember?.user?.name || otherMember?.user?.id || '채팅방';
  const displayImage = otherMember?.user?.image as string | undefined;

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-[#E6E6E6]">
      <Avatar className="size-[60px]">
        <AvatarImage src={displayImage} alt={displayTitle} />
        <AvatarFallback className="bg-[#D9D9D9] text-muted-foreground text-xl">
          {getInitials(displayTitle)}
        </AvatarFallback>
      </Avatar>
      <span className="text-xl font-semibold">{displayTitle}</span>
    </div>
  );
};

export default ChatHeader;
