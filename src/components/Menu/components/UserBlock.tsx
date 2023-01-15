import React from 'react'
import { makeStyles } from '@mui/styles'
import { useDispatch } from 'react-redux'
import { useAccount, useUnactiveAccount, useToken, useSignLogin, useUserPortrait } from 'state/userInfo/hooks'
import { clearUserInfo } from 'state/actions'
import history from 'routerHistory'
import routePath from 'routes/routePath'
import EthIcon from 'components/Icons/EthIcon'
import { useUpdateEffect } from 'ahooks'
import UserMenuPop from './UserMenuPop'
import ConnectButton from './ConnectButton'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 34,
      width: 34,
      cursor: 'pointer',
      borderRadius: '50%',
      // border: '1px solid #fff',
    },
  },
  mainnet: {
    border: '1px solid rgba(255,255,255,.2)',
    padding: 5,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    marginRight: 20,
    fontSize: 12,
    height: 34,
    alignItems: 'center',
  },
  img: {
    marginLeft: 20,
  },
}))
const UserBlock = () => {
  const account = useAccount()
  const unActiveAccount = useUnactiveAccount()
  const token = useToken()
  const classes = useStyles()
  const sign = useSignLogin()
  const userPortrait = useUserPortrait()
  const dispatch = useDispatch()

  useUpdateEffect(() => {
    // 小狐狸钱包账号切换
    if (unActiveAccount !== account && token) {
      dispatch(clearUserInfo())
      sign()
    }
  }, [unActiveAccount, account, token])
  return (
    <div className={classes.container}>
      <div className={classes.mainnet}>
        <EthIcon />
        <span>&nbsp; ETH Mainnet &nbsp;</span>
      </div>
      <ConnectButton />
      {account && (
        <UserMenuPop>
          <img
            src={userPortrait}
            className={classes.img}
            alt=""
            onClick={() => {
              history.push(routePath.MINE)
            }}
          />
        </UserMenuPop>
      )}
    </div>
  )
}

export default UserBlock
