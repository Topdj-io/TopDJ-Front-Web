import React from 'react'
import { makeStyles } from '@mui/styles'
import { MENU_HEIGHT } from 'config/constants/style'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: `calc(100vh - ${MENU_HEIGHT}px)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: 300,
    },
  },
}))
const PageLoading = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <img src="/images/common/loading.gif" alt="" />
    </div>
  )
}

export default PageLoading
