import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!,
  process.env.STREAM_SECRET!
);

// 프론트엔드와 동일한 Mock 데이터
const MOCK_USERS = [
  { id: 'user_bamjun', name: '범준' },
  { id: 'user_jonghun', name: '종훈' },
  { id: 'user_yoonju', name: '윤주' },
  { id: 'user_seungtack', name: '승택' },
];

export async function POST(request: Request) {
  const { userId } = await request.json();

  // 수정된 부분: 누가 로그인하든, 테스트용 유저 3명을 한방에 다 등록/갱신해버림
  // 이렇게 하면 '범준'이 로그인을 안 했어도 '종훈'이 말을 걸 수 있음
  await serverClient.upsertUsers(MOCK_USERS);

  // 토큰 생성은 로그인한 당사자 것만
  const token = serverClient.createToken(userId);

  return NextResponse.json({ token });
}