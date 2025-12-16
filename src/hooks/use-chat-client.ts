'use client';

import { useCallback, useEffect, useState } from 'react';
import { StreamChat, Channel } from 'stream-chat';
import { useSession } from 'next-auth/react';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_KEY;

/**
 * 채널 ID 생성 (두 사용자 간 DM용)
 */
export const getChannelId = (userId1: string, userId2: string): string => {
  const members = [userId1, userId2].sort();
  return `dm-${members.join('-')}`;
};

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_STREAM_KEY is not defined');
}

/** 토큰 발급 */
const fetchToken = async (userId: string, userName: string): Promise<string> => {
  const res = await fetch('/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, userName }),
  });

  if (!res.ok) {
    throw new Error('토큰 발급에 실패했습니다.');
  }

  const { token } = await res.json();
  return token;
};

// 연결 진행 중인 Promise (중복 연결 방지)
let connectingPromise: Promise<void> | null = null;

/** Stream Chat 연결 */
const connectChat = async (userId: string, userName: string) => {
  const client = StreamChat.getInstance(API_KEY);

  // 같은 유저면 스킵
  if (client.userID === userId) return;

  // 연결 진행 중이면 해당 Promise 대기
  if (connectingPromise) {
    await connectingPromise;
    return;
  }

  connectingPromise = (async () => {
    try {
      // 다른 유저로 연결된 상태면 먼저 끊기
      if (client.userID) await client.disconnectUser();

      const token = await fetchToken(userId, userName);
      await client.connectUser({ id: userId, name: userName }, token);
    } finally {
      connectingPromise = null;
    }
  })();

  await connectingPromise;
};

/**
 * Stream Chat 클라이언트 연결 관리 훅
 * NextAuth 세션 기반으로 자동 연결
 */
const useChatClient = () => {
  const { data: session, status } = useSession();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (status === 'loading') {
      setIsReady(false);
      return;
    }

    const userId = session?.user?.id;
    const userName = session?.user?.name ?? '사용자';

    if(!userId || !userName) {
      setError(new Error('사용자 정보가 없습니다.'));
      return;
    } 

    setError(null);

    const connect = async () => {
      try {
        await connectChat(userId, userName);
        setIsReady(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('연결에 실패했습니다.'));
      }
    };

    connect();
  }, [status, session]);

  const client = isReady ? StreamChat.getInstance(API_KEY) : null;

  /** 채널 ID로 채널 조회 */
  const getChannel = useCallback(
    async (channelId: string): Promise<Channel | null> => {
      if (!client) return null;
      const channel = client.channel('messaging', channelId);
      await channel.watch();
      return channel;
    },
    [client]
  );

  /** 1:1 DM 채널 생성/조회 */
  const createOrGetChannel = useCallback(
    async (userId1: string, userId2: string): Promise<Channel | null> => {
      if (!client) return null;
      const channelId = getChannelId(userId1, userId2);
      const channel = client.channel('messaging', channelId, {
        members: [userId1, userId2],
      });
      await channel.watch();
      return channel;
    },
    [client]
  );

  return {
    client,
    isConnecting: status === 'loading',
    isConnected: isReady,
    error,
    getChannel,
    createOrGetChannel,
  };
};

export default useChatClient;
