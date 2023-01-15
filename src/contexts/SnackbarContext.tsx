import React, { useState } from 'react'
import { SnackbarProvider } from 'notistack'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles(({ palette, shape }) => ({
  snackbarRoot: {
    maxWidth: 400,
    wordBreak: 'break-all',
  },
  closeIcon: {
    cursor: 'pointer',
  },
}))
const SnackbarContextProvider = ({ children }) => {
  const notistackRef: any = React.createRef()
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  const classes = useStyles()

  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      preventDuplicate
      //   iconVariant
      autoHideDuration={5000}
      classes={{ root: classes.snackbarRoot }}
      disableWindowBlurListener
      action={(key) => <CloseIcon className={classes.closeIcon} onClick={onClickDismiss(key)} />}
    >
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarContextProvider
