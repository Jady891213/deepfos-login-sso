
export enum LoginState {
  PERSONAL = 'PERSONAL',           // Initial View: Personal Login (Account/Password/SMS)
  SOCIAL_QR = 'SOCIAL_QR',         // Social Login QR (WeChat/Feishu)
  ENT_CODE = 'ENT_CODE',           // Enterprise View: Default Branch (Code)
  ENT_ACCOUNT = 'ENT_ACCOUNT',     // Enterprise View: Alternate Branch (Identify by Account)
  SSO_REDIRECT = 'SSO_REDIRECT',   // Result: Enterprise SSO Guide
  CORP_AUTH = 'CORP_AUTH',         // Result: Specialized Enterprise Auth
  SUCCESS = 'SUCCESS',             // Success/Welcome View
}

export type SocialProvider = 'WECHAT' | 'FEISHU';

export interface AuthPolicy {
  type: 'PASSWORD' | 'SSO' | 'VERIFY_CODE';
  ssoUrl?: string;
  enterpriseName?: string;
  logo?: string;
}
