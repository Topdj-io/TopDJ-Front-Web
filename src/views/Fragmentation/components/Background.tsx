import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    zIndex: -1,
    height: '100%',
    width: '100%',
  },
  circle: {
    height: 150,
    width: 150,
    filter: 'blur(40px)',
    borderRadius: '50%',
    position: 'absolute',
    opacity: 0.5,
  },
  bottomCircle: {
    background: '#8AFA0F',
    bottom: 0,
  },
  topCircle: {
    background: '#9723D1',
    top: 0,
    right: 0,
  },
}))
const Background = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={clsx(classes.bottomCircle, classes.circle)} />
      <div className={clsx(classes.topCircle, classes.circle)} />
    </div>
  )
}

export default Background
