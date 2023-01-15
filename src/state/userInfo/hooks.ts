import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { queryLoginHash, login as userLogin } from 'services/login'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import { signMessage } from 'utils/web3React'
import { setUserInfo } from 'state/actions'
import { CACHE_INVITE_CODE } from 'config/constants/cacheKey'
import useToast from 'hooks/useToast'
import { State } from '../types'

export const useAccount = (ellipsis?: boolean) => {
  const account = useSelector((state: State) => state.userInfo.account)
  if (ellipsis) {
    return account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  }
  return account
}

// 钱包登录 但是未签名获取到token
export const useUnactiveAccount = () => {
  const { account } = useWeb3React()
  return account
}
// export const useBlindBoxContract = () => {
  
//   return useSelector((state: State) => state.userInfo.blindBoxContract)
// }

export const useToken = () => {
  return useSelector((state: State) => state.userInfo.token)
}
export const useUserInfo = () => {
  return useSelector((state: State) => state.userInfo.userInfo)
}

export const useUserPortrait = () => {
  const userInfo = useSelector((state: State) => state.userInfo.userInfo)
  return userInfo?.avatar_url || '/images/common/portrait.png'
}
// 签名登录
export const useSignLogin = () => {
  const unActiveAccount = useUnactiveAccount()
  const { library } = useWeb3Provider()
  const dispatch = useDispatch()
  const { toastError } = useToast()
  const signLogin = async () => {
    try {
      const data = await queryLoginHash({ address: unActiveAccount })
      const signHash = await signMessage(library, unActiveAccount, data.data)
      const inviteCode = sessionStorage.getItem(CACHE_INVITE_CODE)
      const userInfo = await userLogin({
        hash: data.data,
        signature: signHash,
        invite_code: inviteCode,
      })
      dispatch(setUserInfo({ ...userInfo.data.member, token: userInfo.data.token }))
    } catch (e) {
      console.log(e)
      // e.message&&toastError(e)
    }
  }
  return signLogin
}
