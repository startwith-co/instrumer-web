// ============ Enums ============

export type UserType = 'VENDOR' | 'CONSUMER';

// ============ JWT Payload ============

export interface IJwtPayload {
  sub: string;
  userType: UserType;
  type: 'ACCESS' | 'REFRESH';
  exp: number;
  iat: number;
  userSeq: number;
  jti: string;
}

// ============ Request Types ============

// 로그인 요청
export interface ILoginUserRequest extends Record<string, unknown> {
  email: string;
  password: string;
}

// 벤더 회원가입 요청
export interface IRegisterVendorRequest extends Record<string, unknown> {
  businessName: string;
  managerName: string;
  phone: string;
  email: string;
  password: string;
  businessImageUrl: string;
}

// 수요기업 회원가입 요청
export interface IRegisterConsumerRequest extends Record<string, unknown> {
  businessName: string;
  managerName: string;
  phone: string;
  email: string;
  password: string;
}

// 이메일 인증 확인 요청
export interface IVerifyEmailAuthKeyRequest extends Record<string, unknown> {
  email: string;
  authCode: string;
}

// 토큰 재발급 요청
export interface IReissueTokenRequest extends Record<string, unknown> {
  refreshToken: string;
}

// ============ Response Types ============

// 로그인 응답
export interface ILoginUserResponse {
  accessToken: string;
  refreshToken: string;
}

// 토큰 재발급 응답
export interface IReIssueTokenResponse {
  accessToken: string;
  refreshToken: string;
}
