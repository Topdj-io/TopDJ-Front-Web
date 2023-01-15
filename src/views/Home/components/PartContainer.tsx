import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    // position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    transform: 'translate(-50%,-50%) rotate(90deg) ',
    left: 50,
    top: '50%',
    fontSize: 24,
    transformOrigin: 'center center',
    '& img': {
      transform: 'rotate(-90deg)',
      width: 6,
      marginLeft: 50,
    },
    [theme.breakpoints.down('xl')]: {
      display: 'none',
    },
  },
}))

interface PartContainerPropsType {
  title?: string
}
const PartContainer: React.FC<PartContainerPropsType> = ({ children, title }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      {title && (
        <div className={classes.title}>
          <span>{title}</span>
          <img src="/images/home/titleArrow.png" alt="" />
        </div>
      )}
      {children}
    </div>
  )
}

export default PartContainer
