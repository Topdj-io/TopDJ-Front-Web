import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'italics-title',
    fontSize: 52,
    lineHeight: 1.5,
    textAlign: 'center',
    margin: '0 auto 60px',
    textTransform: 'uppercase',
  },
}))
interface TitlePropsType {
  width?: number
  className?: string
  top?: number
}
const Title: React.FC<TitlePropsType> = ({ className, children, width, top }) => {
  const classes = useStyles()
  return (
    <div
      className={clsx(classes.title, className, 'animate__animated animate__fadeInUp part-title')}
      style={{ width, marginTop: top }}
    >
      {children}
    </div>
  )
}

export default Title
