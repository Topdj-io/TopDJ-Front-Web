import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import SwiperControllerProps from 'swiper/types/swiper-class.d'
import { Swiper as ReactSwiper, SwiperSlide, SwiperProps } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  swiperContainer: ({ padding }: { padding: number }) => ({
    position: 'relative',
    '& .swiper': {
      margin: -padding,
      padding,
    },
  }),
  navigation: {},
  navigationPrev: {
    left: -40,
  },
  navigationNext: {
    right: -40,
  },
  navigationIcon: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: '50%',
    marginTop: -12,
    zIndex: 1,
    cursor: 'pointer',
    '&:active': {
      opacity: 0.5,
    },
  },
}))

interface SwiperPropsType extends SwiperProps {
  data: {
    children: React.ReactNode
    [key: string]: any
  }[]
  padding?: number
}
const Swiper = ({ onSwiper, data, padding = 0, ...rest }: SwiperPropsType) => {
  const classes = useStyles({ padding })
  const [controlledSwiper, setControlledSwiper] = useState<SwiperControllerProps>(null)
  return (
    <div className={classes.swiperContainer}>
      <div className={classes.navigation}>
        <img
          src="/images/icon/swiperPrev.svg"
          onClick={() => {
            controlledSwiper?.slidePrev()
          }}
          className={clsx(classes.navigationPrev, classes.navigationIcon)}
          alt=""
        />
        <img
          onClick={() => {
            controlledSwiper?.slideNext()
          }}
          src="/images/icon/swiperNext.svg"
          className={clsx(classes.navigationNext, classes.navigationIcon)}
          alt=""
        />
      </div>
      <ReactSwiper
        onSwiper={(e) => {
          setControlledSwiper(e)
          onSwiper?.(e)
        }}
        {...rest}
      >
        {data.map((item) => (
          <SwiperSlide>{item.children}</SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  )
}

export default Swiper
