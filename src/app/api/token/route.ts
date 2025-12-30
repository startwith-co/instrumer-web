import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET!
);

export async function POST(request: Request) {
  const { userId, userName } = await request.json();

  // 현재 사용자 등록/갱신
  if (userId) {
    await serverClient.upsertUser({ id: userId, name: userName || userId });
  }

  // 토큰 생성
  const token = serverClient.createToken(userId);

  return NextResponse.json({ token });
}