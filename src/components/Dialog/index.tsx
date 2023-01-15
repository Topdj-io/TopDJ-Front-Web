import React from 'react'
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Icon } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'

const useStyles = makeStyles(({ palette }) => ({
  dialog: {
    '& .MuiPaper-root': {
      borderRadius: 10,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: '25px 15px',
    position: 'relative',
    borderBottom: '1px solid #0F0F10',
    '& .dj-close': {
      position: 'absolute',
      top: 17,
      right: 24,
      fontSize: 20,
      cursor: 'pointer',
    },
  },
}))
export interface DialogPropsType extends MuiDialogProps {
  title?: string
  maskClosable?: boolean
}
const Dialog = ({ className, title, maskClosable = true, onClose, children, ...rest }: DialogPropsType) => {
  const classes = useStyles()
  return (
    <MuiDialog {...rest} onClose={maskClosable && onClose} className={clsx(classes.dialog, className)}>
      {title && (
        <div className={classes.title}>
          {title}
          <Icon
            baseClassName="iconfont dj-close"
            onClick={(e) => {
              onClose && onClose(e, 'backdropClick')
            }}
          />
        </div>
      )}
      <div className="dialog-content">{children}</div>
    </MuiDialog>
  )
}

export default Dialog
