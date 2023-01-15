import React, { useEffect, lazy, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter, Redirect, Route, Switch, Router } from 'react-router-dom'
import { ResetCSS } from '@kwswap/uikit'
import BigNumber from 'bignumber.js'
import ScrollToTop from 'react-router-scroll-top'
import useEagerConnect from 'hooks/useEagerConnect'
import styled from 'styled-components'
import Footer from 'components/Footer'
import { makeStyles } from '@mui/styles'
import useConfig from 'components/Menu/config'
import RoutePath from 'routes/routePath'
import useToast from 'hooks/useToast'
import { fetchUserInfo } from 'state/actions'
import { useAccount } from 'state/userInfo/hooks'
import { initAxios } from 'utils/request'
import PageLoading from 'components/Pageloading'
import PreloadContextProvider from 'contexts/PreloadContext'
import { FOOTER_HEIGHT } from 'config/constants/style'
import GlobalStyle from './style/Global'
import history from './routerHistory'
import Menu from './components/Menu'

import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import EasterEgg from './components/EasterEgg'

const useStyles = makeStyles(({ palette }) => ({
  container: {
    minHeight: `calc(100vh - ${FOOTER_HEIGHT + 100}px)`,
    margin: '0 auto',
  },
}))
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page

const NotFound = lazy(() => import('./views/NotFound'))
const Home = lazy(() => import('./views/Home'))
const MysteryBoxTest = lazy(() => import('./views/MysteryBoxTest'))
const MysteryBoxDetail = lazy(() => import('./views/MysteryBox/Detail'))
const MysteryBox = lazy(() => import('./views/MysteryBox/Home'))
const WorkDetail = lazy(() => import('./views/Work/Detail'))
const ComingSoon = lazy(() => import('./views/ComingSoon'))
const Mine = lazy(() => import('./views/Mine'))
const Collections = lazy(() => import('./views/Collections/Home'))
const CollectionsDetail = lazy(() => import('./views/Collections/Detail'))
const AuthorDetail = lazy(() => import('./views/Author/Detail'))
const Bridge = lazy(() => import('./views/Bridge'))
const Fragmentation = lazy(() => import('./views/Fragmentation'))
const Gallery = lazy(() => import('./views/Gallery'))
const Marketplace = lazy(() => import('./views/Marketplace'))
const Membership = lazy(() => import('./views/Membership'))
const Roadmap = lazy(() => import('./views/Roadmap'))
const Vr = lazy(() => import('./views/Vr'))
const NftRemix = lazy(() => import('./views/NftRemix'))
const MarkDetail = lazy(() => import('./views/MarkDetail'))
// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [pathname, setPathname] = useState(history.location.pathname)
  const menuList = useConfig()
  const account = useAccount()
  const toast = useToast()
  initAxios(dispatch, toast)
  useEagerConnect()
  useEffect(() => {
    account && dispatch(fetchUserInfo())
  }, [account])
  useEffect(() => {
    history.listen((e) => {
      setPathname(e.pathname)
    })
  }, [])
  return (
    <Router history={history}>
      <ScrollToTop>
        <PreloadContextProvider
          onComplete={() => {
            setLoading(false)
          }}
        >
          <div className={classes.container}>
            <ResetCSS />
            <GlobalStyle />
            {loading ? (
              <PageLoading />
            ) : (
              <Menu>
                <SuspenseWithChunkError fallback={<PageLoading />}>
                  <Switch>
                    {/* Redirect */}
                    {/* <Route path="/" exact>
                <MysteryBox />
              </Route> */}
                    <Route path="/" exact component={Home} />
                    <Route path={RoutePath.MYSTERY_BOX} exact component={MysteryBox} />
                    <Route path={RoutePath.MINE} exact component={Mine} />
                    <Route path={RoutePath.MYSTERY_BOX_DETAIL} exact component={MysteryBoxDetail} />
                    <Route path={RoutePath.WORK_DETAIL} exact component={WorkDetail} />
                    <Route path={RoutePath.COLLECTIONS} exact component={Collections} />
                    <Route path={RoutePath.COLLECTIONS_DETAIL} exact component={CollectionsDetail} />
                    <Route path={RoutePath.AUTHOR_DETAIL} exact component={AuthorDetail} />
                    {/* <Route path={RoutePath.BRIDGE} exact component={Bridge} /> */}
                    <Route path={RoutePath.GALLERY} exact component={Gallery} />
                    <Route path={RoutePath.FRAGMENTATION} exact component={Fragmentation} />
                    <Route path={RoutePath.MEMBERSHIP} exact component={Membership} />
                    <Route path={RoutePath.ROADMAP} exact component={Roadmap} />
                    <Route path={RoutePath.VR} exact component={Vr} />
                    <Route path={RoutePath.NFTREMIX} exact component={NftRemix} />
                    <Route path={RoutePath.MARK_DETAIL} exact component={MarkDetail} />
                    
                    <Route path={RoutePath.MARKETPLACE} exact component={Marketplace} />
                    {menuList.map((item) => {
                      return (
                        <Route
                          path={item.href}
                          exact
                          key={item.href}
                          component={item.finish ? MysteryBoxTest : ComingSoon}
                        />
                      )
                    })}
                    <Route path="*">
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </SuspenseWithChunkError>
              </Menu>
            )}
            <EasterEgg iterations={2} />
            {/* <ToastListener /> */}
          </div>
          {!loading && pathname !== '/' && <Footer />}
        </PreloadContextProvider>
      </ScrollToTop>
    </Router>
  )
}

export default React.memo(App)
