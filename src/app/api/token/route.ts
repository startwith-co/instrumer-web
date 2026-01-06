import { toStreamChatId } from '@/lib/stream-chat';
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!, process.env.STREAM_SECRET!);

export async function POST(request: Request) {
  const { userSeq, userName } = await request.json();

  // userSeq 검증
  if (!userSeq) {
    return NextResponse.json({ error: 'userSeq is required' }, { status: 400 });
  }

  // Stream Chat ID 생성 (user-{userSeq} 형식)
  const streamChatId = toStreamChatId(userSeq);

  // 현재 사용자 등록/갱신
  await serverClient.upsertUser({ id: streamChatId, name: userName || `사용자${userSeq}` });

  // 토큰 생성
  const token = serverClient.createToken(streamChatId);

  return NextResponse.json({ token });
}
