import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@mui/styles'
import clsx from 'clsx'
import { CACHE_INVITE_CODE } from 'config/constants/cacheKey'
import Container from 'components/Layout/Container'
import useParsedQueryString from 'hooks/useParsedQueryString'
import 'animate.css'
import RoutePath from 'routes/routePath'
import SwiperControllerProps from 'swiper/types/swiper-class.d'
import history from 'routerHistory'
import { HOME_BG_URL } from 'config/constants/preloadResource'
import { MENU_HEIGHT } from 'config/constants/style'
import SwiperCore, { Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import PageLoading from 'components/Pageloading'
import { usePreload } from 'hooks/usePreload'
import './index.scss'
import Particles from './components/Particles'
import NftWorks from './components/NftWorks'
import Gallery from './components/Gallery'
import MysteryBox from './components/MysteryBox'
import VideoPart from './components/VideoPart'
import Collection from './components/Collection'
import Partner from './components/Partner'
import Footer from './components/Footer'
import SwiperDot from './components/SwiperDot'

SwiperCore.use([Mousewheel])

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  videoContainer: {
    minHeight: 500,
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    left: 0,
    height: '100%',
    zIndex: 0,
    '& video': {
      width: '100%',
    },
    [theme.breakpoints.down('lg')]: {
      height: 600,
      '& video': {
        width: '130%',
      },
    },
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  logo: {
    height: 266,
    [theme.breakpoints.down('md')]: {
      height: 43,
    },
  },
  textContainer: {
    fontSize: 32,
    lineHeight: 1.5,
    width: 736,
    maxWidth: '80%',
    margin: '40px auto 0',
    textDecoration: 'underline',
    fontFamily: 'text-bold',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      margin: '15px auto 0',
    },
  },

  swiperContainer: {
    height: `calc(100vh - ${MENU_HEIGHT}px)`,
    transition: 'background 5s',
    '& .swiper-wrapper': {
      transitionDelay: '0.5s',
      // transitionTimingFunction: 'linear',
    },
  },

  swiperSlide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&>div': {
      width: '100%',
    },
  },
  slideBg: {
    background: 'url(/images/home/partBg.png) no-repeat center center',
    backgroundSize: 'cover',
  },
}))
const swiperList = [
  { component: <NftWorks /> },
  { component: <Gallery /> },
  { component: <MysteryBox /> },
  { component: <VideoPart /> },
  { component: <Collection /> },
  { component: <Partner /> },
  { component: <Footer /> },
]
const Home = () => {
  const classes = useStyles()
  const [controlledSwiper, setControlledSwiper] = useState<SwiperControllerProps>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading] = usePreload([HOME_BG_URL])
  const { code } = useParsedQueryString()

  useEffect(() => {
    if (code) {
      sessionStorage.setItem(CACHE_INVITE_CODE, code as string)
    }
  }, [])

  return loading ? (
    <PageLoading />
  ) : (
    <div className={clsx(classes.container, 'homePage')}>
      <Particles />
      <Swiper
        direction="vertical"
        style={{ width: document.body.offsetWidth }}
        className={classes.swiperContainer}
        mousewheel
        simulateTouch={false}
        speed={500}
        onSwiper={(e) => {
          setControlledSwiper(e)
        }}
        onTransitionStart={(e) => {
          setActiveIndex(e.activeIndex)
          const activeElement = e.slides[e.activeIndex]
          const prevElement = e.slides[e.previousIndex]
          let hideClass = 'animate__fadeOutUp'
          let showClass = 'animate__fadeInUp'
          if (e.activeIndex < e.previousIndex) {
            hideClass = 'animate__fadeOutDown'
            showClass = 'animate__fadeInDown'
          }
          $(activeElement)
            .find('.animate__animated')
            .removeClass(`animate__fadeInUp  animate__fadeOutUp animate__fadeInDown animate__fadeOutDown`)
            .addClass('opacity0')
          if (e.activeIndex < e.previousIndex) {
            $(prevElement).find('.animate__animated:not(.part-title)').addClass(hideClass)
          } else {
            $(prevElement).find('.animate__animated').addClass(hideClass)
          }
          setTimeout(() => {
            $(activeElement).find('.animate__animated').addClass(showClass)
          }, 700)
        }}
      >
        <SwiperDot
          length={7}
          value={activeIndex}
          onChange={(e) => {
            setActiveIndex(e)
            controlledSwiper.slideTo(e)
          }}
        />
        <SwiperSlide className={classes.swiperSlide}>
          <div className={classes.videoContainer}>
            <video autoPlay loop preload="auto" muted src={HOME_BG_URL} />
            <div className={clsx(classes.banner)}>
              <img
                src="/images/home/slogan.png"
                className={clsx(classes.logo, 'animate__animated animate__fadeInUp')}
                alt=""
              />
              <div
                className={clsx(classes.textContainer, 'animate__animated animate__fadeInUp animate__delay-1s')}
                onClick={() => {
                  history.push(RoutePath.MYSTERY_BOX)
                }}
              >
                Get your collection
              </div>
            </div>
          </div>
        </SwiperSlide>
        {swiperList.map((item, index) => (
          <SwiperSlide
            key={index}
            className={clsx(classes.swiperSlide, {
              [classes.slideBg]: index > 0 && index % 2 > 0,
            })}
          >
            <Container>{item.component}</Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Home
