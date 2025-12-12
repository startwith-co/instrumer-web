'use client';

import { useState, useEffect } from 'react';
import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
import { 
  Chat, Channel, ChannelList, Window, 
  MessageList, MessageInput, Thread, 
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css'; // 기본 스타일

// 1. 테스트용 Mock 유저 데이터
// 범준, 종훈, 윤주, 승택
const MOCK_USERS = [
  { id: 'user_bamjun', name: '범준' },
  { id: 'user_jonghun', name: '종훈' },
  { id: 'user_yoonju', name: '윤주' },
  { id: 'user_seungtack', name: '승택' },
];

const API_KEY = process.env.NEXT_PUBLIC_STREAM_KEY!;

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [client, setClient] = useState<StreamChat | null>(null);

  // 2. 유저 선택 시 토큰 받아오기 & 클라이언트 연결
  useEffect(() => {
    if (!selectedUser) return;

    const initChat = async () => {
      const chatClient = StreamChat.getInstance(API_KEY);

      // 내 서버에 토큰 요청 (인증 셔틀)
      const res = await fetch('/api/token', {
        method: 'POST',
        body: JSON.stringify({ userId: selectedUser.id, userName: selectedUser.name }),
      });
      const { token } = await res.json();

      // Stream 연결
      await chatClient.connectUser(
        { id: selectedUser.id, name: selectedUser.name },
        token
      );
      
      setClient(chatClient);
    };

    initChat();

    // 정리(Cleanup)
    return () => {
      if (client) client.disconnectUser();
      setClient(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]); // 유저가 바뀌면 재연결

  // 3. 테스트용 방 만들기 함수 (버튼 클릭 시 실행)
  const createTestChannel = async (partnerId: string) => {
    if (!client || !selectedUser) return;
    
    const channel = client.channel('messaging', {
      members: [selectedUser.id, partnerId],
    });
    
    await channel.watch(); // 방 생성 및 입장
    alert('방이 생성되었습니다! 목록을 확인하세요.');
  };

  // ---------------------------------------------------------
  // UI 렌더링
  // ---------------------------------------------------------

  // A. 로그인 화면 (유저 선택)
  if (!selectedUser || !client) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">누구로 로그인 하시겠습니까?</h1>
        <div className="flex gap-4">
          {MOCK_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // B. 채팅 화면 (Stream Chat UI)
  const filters: ChannelFilters = { members: { $in: [selectedUser.id] }, type: 'messaging' };
  const sort: ChannelSort = { last_message_at: -1 };

  return (
    <div className="h-screen flex flex-col">
      {/* 상단 헤더 & 테스트 버튼 */}
      <div className="p-4 bg-gray-100 border-b flex justify-between items-center">
        <h2 className="font-bold">현재 로그인: {selectedUser.name}</h2>
        <div className="space-x-2">
          {MOCK_USERS.filter(u => u.id !== selectedUser.id).map(u => (
             <button 
               key={u.id}
               onClick={() => createTestChannel(u.id)}
               className="text-sm bg-green-500 text-white px-3 py-1 rounded"
             >
               {u.name}와 대화하기
             </button>
          ))}
          <button onClick={() => setSelectedUser(null)} className="text-sm bg-red-500 text-white px-3 py-1 rounded">
            로그아웃
          </button>
        </div>
      </div>

      {/* Stream Chat 컴포넌트 */}
      <Chat client={client}>
        <div className="flex h-full">
          {/* 왼쪽: 채팅 목록 */}
          <div className="w-1/3 border-r">
            <ChannelList 
              filters={filters} 
              sort={sort}
              showChannelSearch
            />
          </div>
          
          {/* 오른쪽: 채팅방 상세 */}
          <div className="w-2/3">
            <Channel>
              <Window>
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}   