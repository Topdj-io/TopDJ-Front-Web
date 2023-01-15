import React from 'react'
import { makeStyles, useTheme } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
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
  container: {
    position: 'absolute',
    width: '100%',
    top: ({ top }: { top: number }) => top,
    fontSize: 50,
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
interface ComingSoonTextProps {
  top?: number
  className?: string
  hidden?: boolean
}
const ComingSoonText = (props: ComingSoonTextProps) => {
  const { className, top = 200 } = props
  const classes = useStyles({ top })
  return (
    <div {...props} className={clsx(className, classes.container)}>
      COMING SOON
    </div>
  )
}

export default ComingSoonText
