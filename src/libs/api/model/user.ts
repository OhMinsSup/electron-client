export interface TokensResponse {
  ok: boolean;
  error: any;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserModel {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type: number;
  role_name: string;
  pmi: number;
  use_pmi: boolean;
  personal_meeting_url: string;
  timezone: string;
  verified: number;
  dept: string;
  created_at: Date;
  last_login_time: Date;
  last_client_version: string;
  host_key: string;
  cms_user_id: string;
  jid: string;
  group_ids: any[];
  im_group_ids: any[];
  account_id: string;
  language: string;
  phone_country: string;
  phone_number: string;
  status: string;
  job_title: string;
  location: string;
  login_types: number[];
  role_id: string;
}

export interface UserResponse {
  ok: boolean;
  error: any;
  user: UserModel | null;
}
