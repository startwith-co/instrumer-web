'use client';

import { createOrGetDMChannel, toStreamChatId } from '@/lib/stream-chat';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Channel, StreamChat } from 'stream-chat';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_KEY;

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_STREAM_KEY is not defined');
}

/** 토큰 발급 */
const fetchToken = async (userSeq: number, userName: string): Promise<string> => {
  const res = await fetch('/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userSeq, userName }),
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
const connectChat = async (userSeq: number, userName: string) => {
  const client = StreamChat.getInstance(API_KEY);
  const streamChatId = toStreamChatId(userSeq);

  // 같은 유저면 스킵
  if (client.userID === streamChatId) return;

  // 연결 진행 중이면 해당 Promise 대기
  if (connectingPromise) {
    await connectingPromise;
    return;
  }

  connectingPromise = (async () => {
    try {
      // 다른 유저로 연결된 상태면 먼저 끊기
      if (client.userID) await client.disconnectUser();

      const token = await fetchToken(userSeq, userName);
      await client.connectUser({ id: streamChatId, name: userName }, token);
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

    const userSeq = session?.user?.userSeq;
    const userName = session?.user?.name ?? '사용자';

    if (!userSeq) {
      setError(new Error('사용자 정보가 없습니다.'));
      return;
    }

    setError(null);

    const connect = async () => {
      try {
        await connectChat(userSeq, userName);
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

  /** 1:1 DM 채널 생성/조회 (서버에서 userSeq로 사용자 조회 후 채널 생성) */
  const createOrGetChannel = useCallback(
    async (userSeq1: number, userSeq2: number): Promise<Channel | null> => {
      if (!client) return null;

      // 서버에서 userSeq로 사용자 정보 조회 후 채널 생성
      const result = await createOrGetDMChannel({
        userSeq1,
        userSeq2,
      });

      if (!result.success || !result.channelId) {
        console.error('채널 생성 실패:', result.error);
        return null;
      }

      // 생성된 채널 watch
      const channel = client.channel('messaging', result.channelId);
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
