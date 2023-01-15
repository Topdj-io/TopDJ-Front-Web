import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { queryUserInfo } from 'services/user'
import { CACHE_TOKEN, CACHE_ACCOUNT, CACHE_USERIFNO } from 'config/constants/cacheKey'
import multicall from 'utils/multicall'
import inviteAbi from 'config/abi/invite.json'
import { getInviteAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { UserInfoState, UserInfo } from '../types'

const initialState: UserInfoState = {
  userInfo: {},
  member:{},
  token: localStorage.getItem(CACHE_TOKEN),
  account: localStorage.getItem(CACHE_ACCOUNT),
}

export const fetchUserInfo = createAsyncThunk<UserInfo, null>('userInfo/fetchUserInfo', async () => {
  const result = await queryUserInfo()
  return result
})

export const fetchUserInviteInfo = createAsyncThunk<number, string>('userInfo/fetchUserInviteInfo', async (account) => {
  const [canWithdrawReward] = await multicall(inviteAbi, [
    {
      address: getInviteAddress(),
      name: 'canGetRewardMap',
      params: [account],
    },
  ])
  return getBalanceNumber(canWithdrawReward)
})

export const userInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const info = action.payload
      
      state.userInfo = info
      state.account = info.address
      info.token && (state.token = info.token)
      if(info.token){
        localStorage.setItem(CACHE_TOKEN, info.token)
      }
      localStorage.setItem(CACHE_USERIFNO, JSON.stringify(info))
      localStorage.setItem(CACHE_ACCOUNT, info.address)
    },
    clearUserInfo: (state) => {
      state.userInfo = {}
      state.account = ''
      state.token = ''
      localStorage.removeItem(CACHE_TOKEN)
      localStorage.removeItem(CACHE_USERIFNO)
      localStorage.removeItem(CACHE_ACCOUNT)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload
        localStorage.setItem(CACHE_USERIFNO, JSON.stringify(state.userInfo))
      })
      .addCase(fetchUserInviteInfo.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, invite_reward: action.payload }
      })
  },
})

// Actions
export const { setUserInfo } = userInfoSlice.actions
export const { clearUserInfo } = userInfoSlice.actions
export default userInfoSlice.reducer
