import React from 'react'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles(({ palette }) => ({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: palette.text.primary,
  },
}))
const PartItem = ({ title, children, className = '', ...rest }) => {
  const classes = useStyles()
  return (
    <div {...rest} className={clsx(className, classes.container)}>
      <div className={classes.title}>{title}</div>
      <div>{children}</div>
    </div>
  )
}

export default PartItem
