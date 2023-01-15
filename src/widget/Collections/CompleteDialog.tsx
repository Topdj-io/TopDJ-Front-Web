import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography, Button } from '@mui/material'
import Dialog, { DialogPropsType } from 'components/Dialog'
import history from 'routerHistory'
import Image from 'components/Image'
import RoutePath from 'routes/routePath'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 20,
  },
  imgContainer: {
    background: '#0F0F10',
    textAlign: 'center',
    padding: '60px 0',
  },
  successContent: {
    padding: '30px 0 10px',
    textAlign: 'center',
  },
  successText: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  boxImg: {
    height: 250,
    maxWidth: '90%',
  },
}))
interface CompleteDialogPropsType extends DialogPropsType {
  rewardImg?: string
}
const CompleteDialog = ({ rewardImg, ...rest }: CompleteDialogPropsType) => {
  const classes = useStyles()
  return (
    <Dialog {...rest} maxWidth="xs" fullWidth>
      <div className={classes.content}>
        <div className={classes.imgContainer}>
          <img src={rewardImg} className={classes.boxImg} alt="" />
        </div>

        <div className={classes.successContent}>
          <Typography className={classes.successText}>Cast complete to view</Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => {
              history.push(RoutePath.MINE)
            }}
          >
            TO VIEW
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default CompleteDialog
