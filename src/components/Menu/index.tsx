import React, { useEffect } from 'react'
import { Menu as UikitMenu } from '@kwswap/uikit'
import { useLocation } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import useTranslation from 'hooks/useTranslation'
import useTheme from 'hooks/useTheme'
import { makeStyles } from '@mui/styles'
import { Grid, Tabs, Tab, useMediaQuery, useTheme as useMuiTheme } from '@mui/material'
import { languageList } from 'config/localization/languages'
import history from 'routerHistory'
import clsx from 'clsx'
import RoutePath from 'routes/routePath'
import { MENU_HEIGHT } from 'config/constants/style'
import UserBlock from './components/UserBlock'
import useConfig from './config'

const useStyles = makeStyles((theme) => ({
  container: {},
  navBar: {
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: ' 0 42px',
    height: MENU_HEIGHT,
    zIndex: 20,
  },
  logo: {
    height: 36,
    marginRight: 36,
    cursor: 'pointer',
  },
  tabs: {
    minHeight: 40,
  },
  navItem: {
    minWidth: 'auto',
    color: theme.palette.text.primary,
    fontSize: 14,
    fontFamily: 'text-bold',
    padding: 0,
    margin: '0 12px',
    minHeight: 40,
    '&.active': {
      background: 'url(/images/common/navMembership.gif) no-repeat center center',
      backgroundSize: 'cover',
    },
  },
  children: {
    marginTop: MENU_HEIGHT,
    display: 'flex',
  },
  inner: {
    flexGrow: 1,
  },
}))
const Menu: React.FC = (props) => {
  const { children } = props
  const { account } = useWeb3React()
  const theme = useMuiTheme()
  const { pathname } = useLocation()
  const showMobileMenu = useMediaQuery(theme.breakpoints.down('lg'))
  const classes = useStyles()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()
  const links = useConfig()
  const [navValue, setNavValue] = React.useState(pathname)

  const handleNavChange = (event: React.SyntheticEvent, newValue: string) => {
    setNavValue(newValue)
    setTimeout(() => {
      history.push(newValue)
    }, 200)
  }
  useEffect(() => {
    setNavValue(pathname)
  }, [pathname])
  return showMobileMenu ? (
    <UikitMenu
      account={account}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={currentLanguage.code}
      langs={languageList}
      // @ts-ignore
      setLang={setLanguage}
      links={links}
      renderLoginButton={() => <UserBlock />}
      {...props}
    />
  ) : (
    <div className={classes.container}>
      <div className={classes.navBar}>
        <Grid container xs alignItems="center">
          <Grid item>
            <img
              className={classes.logo}
              src="/images/logo.svg"
              alt=""
              onClick={() => {
                history.push('/')
              }}
            />
          </Grid>
          <Grid item>
            <Tabs value={navValue} className={classes.tabs} onChange={handleNavChange}>
              {links.map((item, index) => (
                <Tab
                  disableRipple
                  className={clsx(classes.navItem, { active: item.href === RoutePath.NFTREMIX })}
                  label={item.label}
                  value={item.href}
                  key={item.href}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        <UserBlock />
      </div>
      <div className={classes.children}>
        <div className={classes.inner}>{children}</div>
      </div>
    </div>
  )
}

export default Menu
