import React from 'react'
import { makeStyles } from '@mui/styles'
import { Icon } from '@mui/material'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 0 60px',
    color: theme.palette.text.third,
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}))
const PageBack = ({ className = '' }) => {
  const classes = useStyles()
  return (
    <div
      className={clsx(classes.container, className)}
      onClick={() => {
        window.history.back()
      }}
    >
      <Icon baseClassName="iconfont dj-back" />
      &nbsp;Back
    </div>
  )
}

export default PageBack
