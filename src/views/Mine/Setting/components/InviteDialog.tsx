import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button, Avatar, Badge } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Dialog from 'components/Dialog'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAccount, useUserPortrait, useUserInfo } from 'state/userInfo/hooks'
import { queryUserInviteList } from 'services/user'
import { InviteDetailType } from 'types/user'

const useStyles = makeStyles(({ palette }) => ({
  dialog: {},
  container: {},
  myInfo: {
    padding: 30,
    borderBottom: '1px solid #0F0F10',
    '& $amount': {
      fontSize: 24,
    },
  },
  hintTitle: {
    color: palette.text.fourth,
    fontSize: 16,
    marginBottom: 30,
  },
  amount: {
    color: palette.primary.main,
    fontWeight: 600,
  },
  inviteList: {
    padding: 30,
  },
  inviteListItem: {
    '&:not(:last-child)': {
      marginBottom: 25,
    },
    '&:not(:nth-child(-n+4))': {
      '& $amount': {
        color: palette.text.primary,
      },
    },
  },
}))

const InviteDialog = (props) => {
  const classes = useStyles()
  const userPortrait = useUserPortrait()
  const account = useAccount()
  const userInfo = useUserInfo()
  const [inviteList, setInviteList] = useState<InviteDetailType[]>([])

  const getInviteList = async () => {
    const data = await queryUserInviteList()
    setInviteList(data?.data||[])
  }
  useEffect(() => {
    if (account) {
      getInviteList()
    } else {
      setInviteList([])
    }
  }, [account])
  return (
    <Dialog {...props} maxWidth="sm" title="My invitation and ranking" fullWidth className={classes.dialog}>
      <div>
        <div className={classes.myInfo}>
          <div className={classes.hintTitle}>My invitation</div>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar src={userPortrait} variant="rounded" sx={{ width: 44, height: 44 }} />
            </Grid>
            <Grid xs item>
              {userInfo.name}
            </Grid>
            <Grid item className={classes.amount}>
              {userInfo.invite_num}
            </Grid>
          </Grid>
        </div>
        <div className={classes.inviteList}>
          <div className={classes.hintTitle}>The invitation list (Show only the top 10)</div>
          {inviteList.map((item, index) => (
            <Grid container alignItems="center" key={item.id} className={classes.inviteListItem} spacing={2}>
              <Grid item width={50}>
                #{index + 1}
              </Grid>
              <Grid item>
                <Avatar src={item.avatar} variant="rounded" sx={{ width: 28, height: 28 }} />
              </Grid>
              <Grid xs item>
                {item.name}
              </Grid>
              <Grid item className={classes.amount}>
                {item.invite_num}
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </Dialog>
  )
}

export default InviteDialog
