import React, { useMemo, useEffect, useRef } from 'react'
import { makeStyles } from '@mui/styles'
import dayjs from 'dayjs'
import FlipClock from 'flipclock'
import clsx from 'clsx'
import './index.css'

const useStyles = makeStyles(() => ({
  container: {
    fontSize: 8,
  },
  hintText: {
    fontSize: 16,
    marginBottom: 10,
  },
}))
interface CountDownProps {
  title?: string
  time?: number | string
  className?: string
  style?: Record<string, unknown>
  onStop?: () => void
}
const CountDown: React.FC<CountDownProps> = ({ title, time, className, style, onStop }) => {
  const clockRef = useRef()
  const classes = useStyles()
  const clockContructor = useRef(null)
  const newTime = useMemo(() => {
    return time ? dayjs(time).toDate() : dayjs().toDate()
  }, [time])

  useEffect(() => {
    clockContructor.current = new FlipClock(clockRef.current, new Date(), {
      face: 'DayCounter',
      countdown: true,
      autoStart: false,
      stopAt: new Date(),
    })
    clockContructor.current.on('stop', () => {
      onStop?.()
    })
    return () => {
      clockContructor.current.timer?.isRunning && clockContructor.current.stop()
    }
  }, [])

  useEffect(() => {
    const diffTime = dayjs(newTime).diff(dayjs(), 'second')
    if (clockContructor.current && diffTime > 0) {
      clockContructor.current.originalValue = newTime
      clockContructor.current.reset()
      clockContructor.current.$face.$stopAt = new Date()
      diffTime > 0 && clockContructor.current.start()
    }
  }, [newTime])
  return (
    <div className={clsx(classes.container, className)} style={style}>
      {title && <div className={classes.hintText}>{title}</div>}
      <div ref={clockRef} />
    </div>
  )
}

export default CountDown
