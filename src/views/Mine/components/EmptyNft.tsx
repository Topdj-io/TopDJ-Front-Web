import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    border: `2px solid ${theme.palette.divider}`,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    minHeight: 382,
    '& img': {
      width: 100,
      marginBottom: 100,
    },
  },
  '@keyframes animatedgradient': {
    '0%': {
      backgroundPosition: '0 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0 50%',
    },
  },
  text: {
    width: '100%',
    top: 300,
    fontSize: 24,
    color: 'transparent',
    fontFamily: 'title',
    '-webkit-background-clip': 'text',
    backgroundSize: '300% 300%',
    textAlign: 'center',
    background: 'linear-gradient(143deg,#fab36a,#c5c2e7 33%,#de93ed 50%,#77fadf 67%,#f8ffb0 100%,#fe74f1)',
    animation: '$animatedgradient 5s ease infinite alternate',
    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },
  },
}))
const EmptyNft = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <img src="/images/mine/emptyNft.png" alt="" />
      <div className={classes.text}>topdj.io</div>
    </div>
  )
}

export default EmptyNft
