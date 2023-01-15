import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  dotContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
    transform: 'translate(50%,-50%) rotate(90deg) ',
    right: 50,
    transformOrigin: 'center center',
    top: '50%',
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
  dot: {
    height: 22,
    width: 14,
    transform: 'skew(-20deg)',
    background: '#fff',
    opacity: 0.3,
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: 10,
    },
    '&.active': {
      opacity: 1,
    },
  },
}))

interface SwiperDotPropsType {
  value: number
  length: number
  onChange: (val: number) => void
}
const SwiperDot: React.FC<SwiperDotPropsType> = ({ length, value, onChange }) => {
  const classes = useStyles()
  return (
    <div className={classes.dotContainer}>
      {new Array(length).fill('').map((item, index) => (
        <div
          key={index}
          className={clsx(classes.dot, { active: index === value })}
          onClick={() => {
            onChange(index)
          }}
        />
      ))}
    </div>
  )
}

export default SwiperDot
