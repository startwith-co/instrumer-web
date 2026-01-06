'use client';

import ChatChannelPreview from '@/components/chat/chat-channel-preview';
import ChatChannelSearch from '@/components/chat/chat-channel-search';
import ChatEmptyStateIndicator from '@/components/chat/chat-empty-state-indicator';
import ChatError from '@/components/chat/chat-error';
import ChatHeader from '@/components/chat/chat-header';
import ChatLoading from '@/components/chat/chat-loading';
import ChatPaginator from '@/components/chat/chat-paginator';
import useChatClient from '@/hooks/use-chat-client';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ChannelFilters, ChannelOptions, ChannelSort, Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList, Chat, MessageInput, MessageList, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const ChatPageContent = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const channelId = searchParams.get('channel');
  const vendorSeq = searchParams.get('vendorSeq');
  const { client, isConnecting, error, getChannel, createOrGetChannel } = useChatClient();
  const [activeChannel, setActiveChannel] = useState<ChannelType | undefined>();

  // vendorSeq가 있으면 1:1 DM 채널 생성/조회
  useEffect(() => {
    if (!client || !vendorSeq) return;

    const initVendorChannel = async () => {
      const currentUserSeq = session?.user?.userSeq;
      if (!currentUserSeq) return;

      // 서버에서 userSeq로 사용자 정보 조회 후 채널 생성
      const channel = await createOrGetChannel(currentUserSeq, Number(vendorSeq));
      if (channel) {
        setActiveChannel(channel);
      }
    };

    initVendorChannel();
  }, [client, vendorSeq, session, createOrGetChannel]);

  // URL에서 채널 ID가 있으면 해당 채널 활성화
  useEffect(() => {
    if (!client || !channelId || vendorSeq) return;

    const initChannel = async () => {
      const channel = await getChannel(channelId);
      if (channel) {
        setActiveChannel(channel);
      }
    };

    initChannel();
  }, [client, channelId, vendorSeq, getChannel]);

  // 로딩 중
  if (isConnecting || !client) {
    return <ChatLoading />;
  }

  // 에러
  if (error) {
    return <ChatError message={error.message} />;
  }

  const filters: ChannelFilters = {
    type: 'messaging',
    members: { $in: [client.userID!] },
  };

  const sort: ChannelSort = { last_message_at: -1 };

  const options: ChannelOptions = { limit: 6 };

  return (
    <Chat client={client}>
      <div className="flex flex-row gap-12 h-[calc(100vh-60px)] bg-[#F8F9FB] px-24 py-12">
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

export default ChatPageContent;
