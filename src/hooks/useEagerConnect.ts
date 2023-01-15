import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from '@kwswap/uikit'
import Cookies from 'js-cookie'
import { useAccount } from 'state/userInfo/hooks'
import useAuth from 'hooks/useAuth'
import { useDispatch } from 'react-redux'
import { clearUserInfo } from 'state/actions'

const useEagerConnect = () => {
  const { login } = useAuth()
  const dispatch = useDispatch()
  const account = useAccount()
  useEffect(() => {
    const connectorId = Cookies.get(connectorLocalStorageKey) as ConnectorNames
    if (connectorId) {
      login(connectorId)
    } else {
      //  要清掉用户信息
      dispatch(clearUserInfo())
    }
  }, [login, dispatch])
}

export default useEagerConnect
