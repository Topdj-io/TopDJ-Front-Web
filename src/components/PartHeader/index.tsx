import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'linear-gradient(90deg, #161616 0%, rgba(0, 0, 0, 0) 100%)',
    padding: '24px 30px',
    marginBottom: '40px',
  },
  noStyle: {
    padding: 0,
    background: 'transparent',
  },
  titleText: {
    fontFamily: 'text-bold',
    fontSize: 32,
  },
}))
interface PropsType {
  title: string
  noStyle?: boolean
}
const TitleBar: React.FC<PropsType> = ({ title, children, noStyle }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      className={clsx(classes.container, { [classes.noStyle]: true })}
      alignItems="center"
      justifyContent="space-between"
    >
      <div className={classes.titleText}>{title}</div>
      <div>{children}</div>
    </Grid>
  )
}

export default TitleBar
