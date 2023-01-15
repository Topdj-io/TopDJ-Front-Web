import React, { useEffect, useState } from 'react'
import { useWalletModal, ConnectorNames } from '@kwswap/uikit'
import useAuth from 'hooks/useAuth'
import { makeStyles } from '@mui/styles'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import { Button } from '@mui/material'
import useToast from 'hooks/useToast'
import { useUnactiveAccount, useSignLogin } from 'state/userInfo/hooks'

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: '4px 16px',
    lineHeight: '24px',
  },
}))
const UnlockButton = (props) => {
  const { login, logout } = useAuth(true)
  const [hasWalletLogin, setHasWalletLogin] = useState(false)
  const classes = useStyles()
  const { library } = useWeb3Provider()
  const unActiveAccount = useUnactiveAccount()
  const { toastInfo } = useToast()
  const sign = useSignLogin()
  const handleLogin = async (connectorID: ConnectorNames) => {
    await login(connectorID)
    setHasWalletLogin(true)
  }
  const { onPresentConnectModal } = useWalletModal(handleLogin, logout)

  // 钱包登录后
  useEffect(() => {
    if (unActiveAccount && library.provider && hasWalletLogin) {
      setHasWalletLogin(false)
      sign()
    }
  }, [unActiveAccount, hasWalletLogin, library])

  return (
    <Button onClick={onPresentConnectModal} className={classes.btn} variant="contained" {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
