import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const useStyles = makeStyles((theme) => ({
  container: {},
}))
const PageBack = () => {
  const classes = useStyles()
  return <div className={classes.container}>1</div>
}

export default PageBack
