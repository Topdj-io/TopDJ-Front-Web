export interface UserInfo {
  id?: number
  avatar_url?: string
  name?: string
  address?: string
  description?: string
  invite_num?: string
  invite_link?: string
  email?: string
  twitter?: string
  facebook?: string
  invite_code?: string
  scoring_account?: number
  invite_reward?: number
  inviter_address?: string
}
export interface UserInfoState {
  userInfo: UserInfo
  member:UserInfo
  token?: string
  account?: string
}

export interface State {
  userInfo: UserInfoState
}
