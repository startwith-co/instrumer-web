/**
 * Stream Chat 유틸리티 함수
 * userId: userSeq (숫자)
 * userName: businessName
 */

/**
 * userSeq를 Stream Chat ID로 변환
 */
export const toStreamChatId = (userSeq: number): string => {
  return `user-${userSeq}`;
};

/**
 * 채널 ID 생성 (두 사용자 간 DM용)
 */
export const getChannelId = (userSeq1: number, userSeq2: number): string => {
  const members = [userSeq1, userSeq2].sort((a, b) => a - b);
  return `dm-${members.join('-')}`;
};

interface ICreateDMChannelParams {
  userSeq1: number;
  userSeq2: number;
}

interface ICreateDMChannelResult {
  success: boolean;
  channelId?: string;
  cid?: string;
  error?: string;
}

/**
 * 1:1 DM 채널 생성/조회 API 호출
 * 서버에서 userSeq로 사용자 정보 조회 후 채널 생성
 */
export const createOrGetDMChannel = async ({
  userSeq1,
  userSeq2,
}: ICreateDMChannelParams): Promise<ICreateDMChannelResult> => {
  try {
    const res = await fetch('/api/chat/channel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userSeq1, userSeq2 }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error };
    }

    const data = await res.json();
    return { success: true, channelId: data.channelId, cid: data.cid };
  } catch (error) {
    console.error('채널 생성 실패:', error);
    return { success: false, error: '채널 생성에 실패했습니다.' };
  }
};
