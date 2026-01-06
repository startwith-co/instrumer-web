import { getChannelId, toStreamChatId } from '@/lib/stream-chat';
import { fetchUserInfoByUserSeq } from '@/lib/user';
import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!, process.env.STREAM_SECRET!);

/**
 * 1:1 DM 채널 생성/조회 API
 * userSeq로 사용자 정보 조회 후 채널 생성
 */
export async function POST(request: Request) {
  try {
    const { userSeq1, userSeq2 } = await request.json();

    if (!userSeq1 || !userSeq2) {
      return NextResponse.json({ error: 'userSeq1 and userSeq2 are required' }, { status: 400 });
    }

    // 두 사용자 정보 조회
    const [user1, user2] = await Promise.all([fetchUserInfoByUserSeq(userSeq1), fetchUserInfoByUserSeq(userSeq2)]);

    if (!user1 || !user2) {
      return NextResponse.json({ error: '사용자 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    const streamChatId1 = toStreamChatId(userSeq1);
    const streamChatId2 = toStreamChatId(userSeq2);

    // 두 사용자 모두 upsert (없으면 생성, 있으면 업데이트)
    await serverClient.upsertUsers([
      { id: streamChatId1, name: user1.businessName },
      { id: streamChatId2, name: user2.businessName },
    ]);

    // 채널 ID 생성
    const channelId = getChannelId(userSeq1, userSeq2);

    // 채널 생성/조회
    const channel = serverClient.channel('messaging', channelId, {
      members: [streamChatId1, streamChatId2],
      created_by_id: streamChatId1,
    });

    await channel.create();

    return NextResponse.json({
      success: true,
      channelId,
      cid: channel.cid,
    });
  } catch (error) {
    console.error('채널 생성 실패:', error);
    return NextResponse.json({ error: '채널 생성에 실패했습니다.' }, { status: 500 });
  }
}
