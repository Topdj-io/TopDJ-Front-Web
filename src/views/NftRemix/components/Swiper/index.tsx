import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import SwiperControllerProps from 'swiper/types/swiper-class.d'
import { Swiper as ReactSwiper, SwiperSlide, SwiperProps } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  swiperContainer: ({ padding }: { padding: number }) => ({
    position: 'relative',
    
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
  swiperSlide:{
    margin:'0 auto!important',
    width:'420px!important',
    '&:nth-child(1)':{
        marginLeft:'0!important',
    },
    '&:nth-child(3)':{
        marginRight:'0!important',
    },
  }
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
      
      <ReactSwiper
        onSwiper={(e) => {
          setControlledSwiper(e)
          onSwiper?.(e)
        }}
        {...rest}
      >
        {data.map((item) => (
          <SwiperSlide className={classes.swiperSlide}>{item.children}</SwiperSlide>
        ))}
      </ReactSwiper>
    </div>
  )
}

export default Swiper
