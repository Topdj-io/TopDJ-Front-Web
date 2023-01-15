import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Countdown, { zeroPad } from 'react-countdown'
import dayjs from 'dayjs'

const useStyles = makeStyles((theme) => ({
  hintText: {
    fontSize: 16,
    marginBottom: 10,
  },
  countdown: {
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      background: theme.palette.background.default,
      borderRadius: 2,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: '50px',
      height: '50px',
      width: '50px',
      fontWeight: 'bold',
      marginRight: 6,
      fontFamily: 'number',
    },
  },
  timeText: {
    display: 'flex',
    alignItem: 'center',
    '& span': {
      width: '50px',
      marginRight: 6,
      textAlign: 'center',
      fontSize: 12,
      marginTop: 6,
    },
  },
}))
interface CountDownProps {
  title?: string
  time?: number | string
}
const CountDown: React.FC<CountDownProps> = ({ title, time }) => {
  const classes = useStyles()
  const newTime = useMemo(() => {
    return time ? dayjs(time).valueOf() : 1
  }, [time])

  const renderChildren = ({ days, hours, minutes, seconds }) => {
    return (
      <div className={classes.countdown}>
        <span>{zeroPad(days) || '00'}</span>
        <span>{zeroPad(hours) || '00'}</span>
        <span>{zeroPad(minutes) || '00'}</span>
        <span>{zeroPad(seconds) || '00'}</span>
      </div>
    )
  }
  return (
    <div>
      {title && <div className={classes.hintText}>{title}</div>}
      <Countdown key={newTime} renderer={renderChildren} date={newTime} />
      <div className={classes.timeText}>
        <span>days</span>
        <span>hours</span>
        <span>minutes</span>
        <span>seconds</span>
      </div>
    </div>
  )
}

export default CountDown
