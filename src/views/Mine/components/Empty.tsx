import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import history from 'routerHistory'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '160px 0 0',
    textAlign: 'center',
  },
  textContainer: {
    width: 350,
    maxWidth: '80%',
    fontSize: 18,
    margin: '0 auto 30px',
    lineHeight: 1.5,
  },
  button: {
    color: theme.palette.text.primary,
    border: `1px solid #fff`,
    width: 210,

    '&:hover': {
      borderColor: theme.palette.divider,
      background: 'transparent',
    },
  },
}))

interface EmptyProps {
  hintText: string
  actionText?: string
  url?: string
}
const Empty = ({ hintText, actionText, url }: EmptyProps) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>{hintText}</div>
      {actionText && (
        <Button
          variant="outlined"
          onClick={() => {
            history.push(url)
          }}
          className={classes.button}
        >
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default Empty
