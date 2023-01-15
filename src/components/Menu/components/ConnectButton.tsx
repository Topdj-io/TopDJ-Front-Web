import React, { useEffect, useState } from 'react'
import { useWalletModal, ConnectorNames } from '@kwswap/uikit'
import useAuth from 'hooks/useAuth'
import { makeStyles } from '@mui/styles'
import { useDispatch } from 'react-redux'
import useWeb3Provider from 'hooks/useActiveWeb3React'
import { Button, Icon } from '@mui/material'
import useToast from 'hooks/useToast'
import { useUnactiveAccount, useSignLogin, useAccount } from 'state/userInfo/hooks'
import { clearUserInfo } from 'state/actions'
import { queryLoginOut, login as userLogin } from 'services/login'

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: '4px 16px',
    lineHeight: '24px',
    borderRadius: '50px',
    background: '#fff',
    color: '#171719',
    fontFamily: 'text-bold',
    '&:hover': {
      background: '#fff',
    },
    '& .MuiButton-startIcon': {
      marginTop: -3,
      marginRight: 4,
    },
  },
}))
const ConnectButton = (props) => {
  const { login, logout } = useAuth(true)
  const [hasWalletLogin, setHasWalletLogin] = useState(false)
  const classes = useStyles()
  const account = useAccount()
  const dispatch = useDispatch()
  const { library } = useWeb3Provider()
  const unActiveAccount = useUnactiveAccount()
  const accountEllipsis = useAccount(true)
  const sign = useSignLogin()
  const handleLogin = async (connectorID: ConnectorNames) => {
    await login(connectorID)
    setHasWalletLogin(true)
  }
  const handleLogout = () => {
    // queryLoginOut().then(()=>{
      
    // })
    dispatch(clearUserInfo())
    logout()
    
  }
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(handleLogin, handleLogout, account)

  // 钱包登录后
  useEffect(() => {
    if (unActiveAccount && library.provider && hasWalletLogin) {
      setHasWalletLogin(false)
      sign()
    }
  }, [unActiveAccount, hasWalletLogin, library])

  const handleClick = () => {
    if (accountEllipsis) {
      onPresentAccountModal()
    } else {
      onPresentConnectModal()
    }
  }
  return (
    <Button onClick={handleClick} className={classes.btn} startIcon={<Icon baseClassName="iconfont dj-wallet" />}>
      {accountEllipsis || 'Connect'}
    </Button>
  )
}

export default ConnectButton
