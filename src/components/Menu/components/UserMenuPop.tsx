import React from 'react'
import { makeStyles } from '@mui/styles'
import { Tooltip } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import history from 'routerHistory'
import { clearUserInfo } from 'state/actions'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import useAuth from 'hooks/useAuth'
import { MineTabKey } from 'config/constants/pageTabKey'
import RoutePath from 'routes/routePath'
import { queryLoginOut, login as userLogin } from 'services/login'

const useStyles = makeStyles(({ palette }) => ({
  toolTip: {
    width: 330,
    padding: 0,
    background: palette.background.default,
    borderRadius: 10,
    '& .MuiTooltip-arrow': {
      color: palette.background.default,
    },
  },
  container: {},
  title: {
    fontFamily: 'text-bold',
    padding: 20,
  },
  list: {
    fontSize: 14,
    padding: '0 20px 30px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    color: palette.text.secondary,
    cursor: 'pointer',
    borderRadius: 10,
    transition: 'background 0.2s linear',
    '&:last-child:hover': {
      background: palette.primary.main,
      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.5)',
      color: '#000',
      fontFamily: 'text-bold',
    },
    '& img': {
      height: 30,
      width: 30,
      marginRight: 8,
    },
  },
  listItemText: {
    flex: 1,
  },
  listItemDisabled: {
    // opacity: 0.5,
  },
}))
const menuList = [
  {
    title: 'NFTs',
    icon: '/images/icon/nft.svg',
    url: `${RoutePath.MINE}?tabType=${MineTabKey.NFT}`,
  },
  // {
  //   title: 'Profile',
  //   icon: '/images/icon/profile.svg',
  //   url: `${RoutePath.MINE}?tabType=${MineTabKey.SET}`,
  // },
]
const UserMenuPop = ({ children }: { children: React.ReactElement<any, any> }) => {
  const classes = useStyles()
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const handleLogout = () => {
    // queryLoginOut().then(()=>{
      
    // })
    dispatch(clearUserInfo())
    logout()
  }
  return (
    <Tooltip
      componentsProps={{ tooltip: { className: classes.toolTip } }}
      arrow
      title={
        <div className={classes.container}>
          <div className={classes.title}>THE MENU</div>
          <div className={classes.list}>
            {menuList.map((item) => (
              <div
                key={item.title}
                onClick={() => {
                  history.push(item.url)
                }}
                className={clsx(classes.listItem, classes.listItemDisabled)}
              >
                <img src={item.icon} alt="" />
                <div className={classes.listItemText}>{item.title}</div>
                <ChevronRightIcon />
              </div>
            ))}
            <div className={classes.listItem} onClick={handleLogout}>
              <img src="/images/icon/logout.svg" alt="" />
              <div className={classes.listItemText}>Log out</div>
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Tooltip>
  )
}

export default UserMenuPop
