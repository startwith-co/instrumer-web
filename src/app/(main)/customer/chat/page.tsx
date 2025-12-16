'use client';

import ChatChannelPreview from '@/components/chat/chat-channel-preview';
import ChatChannelSearch from '@/components/chat/chat-channel-search';
import ChatEmptyStateIndicator from '@/components/chat/chat-empty-state-indicator';
import ChatHeader from '@/components/chat/chat-header';
import ChatPaginator from '@/components/chat/chat-paginator';
import useChatClient from '@/hooks/use-chat-client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ChannelFilters, ChannelOptions, ChannelSort, Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList, Chat, MessageInput, MessageList, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const ChatPage = () => {
  const searchParams = useSearchParams();
  const channelId = searchParams.get('channel');
  const { client, isConnecting, error, getChannel } = useChatClient();
  const [activeChannel, setActiveChannel] = useState<ChannelType | undefined>();

  // URL에서 채널 ID가 있으면 해당 채널 활성화
  useEffect(() => {
    if (!client || !channelId) return;

    const initChannel = async () => {
      const channel = await getChannel(channelId);
      if (channel) {
        setActiveChannel(channel);
      }
    };

    initChannel();
  }, [client, channelId, getChannel]);

  // 로딩 중
  if (isConnecting || !client) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-muted-foreground">채팅 연결 중...</p>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }

  const filters: ChannelFilters = {
    type: 'messaging',
    members: { $in: [client.userID!] },
  };

  const sort: ChannelSort = { last_message_at: -1 };

  const options: ChannelOptions = { limit: 6 };

  return (
    <Chat client={client}>
      <div className="flex flex-row gap-12 h-[calc(100vh-90px)] bg-[#F8F9FB] px-24 py-12">
        {/* 사이드바: 채팅 목록 */}
        <aside className="w-[400px] shrink-0 shadow-[0px_0px_10px_0px_#0000001A] rounded-[10px] overflow-hidden ">
          <ChannelList
            filters={filters}
            sort={sort}
            showChannelSearch
            options={options}
            setActiveChannelOnMount={!channelId}
            customActiveChannel={activeChannel?.cid}
            Preview={ChatChannelPreview}
            ChannelSearch={ChatChannelSearch}
            EmptyStateIndicator={ChatEmptyStateIndicator}
            Paginator={ChatPaginator}
          />
        </aside>

        {/* 메인: 채팅방 */}
        <main className="flex-1 shrink-0 shadow-[0px_0px_10px_0px_#0000001A] rounded-[10px] overflow-hidden ">
          <Channel channel={activeChannel}>
            <Window>
              <ChatHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </main>
      </div>
    </Chat>
  );
};

export default ChatPage;
