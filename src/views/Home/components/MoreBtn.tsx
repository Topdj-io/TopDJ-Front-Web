import React from 'react'
import { makeStyles } from '@mui/styles'
import history from 'routerHistory'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    marginTop: 60,
    textDecoration: 'underline',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 16,
  },
}))

interface MoreBtnPropsType {
  url: string
  className?: string
}
const MoreBtn: React.FC<MoreBtnPropsType> = ({ children, url, className }) => {
  const classes = useStyles()
  return (
    <div
      className={clsx(classes.container, 'animate__animated', className)}
      onClick={() => {
        history.push(url)
      }}
    >
      {children}
    </div>
  )
}

export default MoreBtn
