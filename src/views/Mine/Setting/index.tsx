import React, { useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { InputBase, Icon, InputAdornment, Grid, CircularProgress } from '@mui/material'
import { CopyToClipboard } from '@kwswap/uikit'
import { useAccount, useUserInfo } from 'state/userInfo/hooks'
import { setUserInfo, fetchUserInviteInfo } from 'state/actions'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import Container from 'components/Layout/Container'
import { updateUserInfo } from 'services/user'
import { useDebounceFn } from 'ahooks'
import useToast from 'hooks/useToast'
import { useInviteHarvest } from 'hooks/useHarvest'
import { REGEX_EMAIL, REGEX_LINK } from 'config/constants/regex'
import PartItem from './components/PartItem'
import InviteDialog from './components/InviteDialog'

const useStyles = makeStyles(({ palette, shape }) => ({
  pageContainer: {
    position: 'relative',
    marginTop: 30,
    '& .iconfont': {
      color: palette.text.secondary,
      height: 'auto',
      fontSize: 24,
    },
  },

  container: {
    color: palette.text.fourth,
    fontSize: 16,
    maxWidth: 900,
    '& .MuiInputBase-root': {
      width: '100%',
      border: '1px solid #808080',
      padding: 15,
      borderRadius: shape.borderRadius,
      lineHeight: '24px',
      '&:not(:last-child)': {
        marginBottom: 20,
      },
    },
    '& input': {
      padding: 0,
    },
  },

  saveBtn: {
    width: 340,
    maxWidth: '100%',
    margin: '40px auto 200px',
    display: 'flex',
    fontSize: 16,
  },
  rewardContainer: {
    textAlign: 'center',
    border: '1px solid #808080',
    borderRadius: shape.borderRadius,
    marginBottom: 60,
  },
  nums: {
    color: palette.text.primary,
    fontFamily: 'number',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 15,
    '& span': {
      fontSize: 12,
      verticalAlign: 'baseline',
      color: palette.text.fourth,
      marginLeft: 4,
    },
  },
  hintText: {},
  rewardItem: {
    padding: '50px 0 40px',
    position: 'relative',
    '&:not(:last-child)': {
      borderRight: '1px solid #808080',
    },
    '& .iconfont': {
      position: 'absolute',
      top: 15,
      right: 15,
      cursor: 'pointer',
    },
  },
}))
const Setting = ({ hidden }) => {
  const account = useAccount()
  const userInfo = useUserInfo()
  const dispatch = useDispatch()
  const { onReward } = useInviteHarvest()
  const [loading, setLoading] = useState(false)
  const { toastWarning, toastSuccess } = useToast()
  const [inviteDialogVisible, setInviteDialogVisible] = useState(false)
  const [formInfo, setFormInfo] = useState({ ...userInfo })
  const inviteLink = useMemo(() => {
    return userInfo.invite_code ? `${window.location.origin}?code=${userInfo.invite_code}` : window.location.origin
  }, [userInfo])
  const classes = useStyles()

  const handleSave = async () => {
    if (loading || !account) {
      return
    }
    if (!formInfo.name) {
      toastWarning('Please enter name')
      return
    }
    if (formInfo.email && !REGEX_EMAIL.test(formInfo.email)) {
      toastWarning('Email error')
      return
    }
    if (formInfo.twitter && !REGEX_LINK.test(formInfo.twitter)) {
      toastWarning('Twitter error')
      return
    }
    if (formInfo.facebook && !REGEX_LINK.test(formInfo.facebook)) {
      toastWarning('Facebook error')
      return
    }
    setLoading(true)
    const params = {
      name: formInfo.name,
      email: formInfo.email,
      twitter: formInfo.twitter,
      facebook: formInfo.facebook,
    }
    const res = await updateUserInfo(params)
    dispatch(setUserInfo({ ...userInfo, ...params }))
    setLoading(false)
    toastSuccess('Save success')
  }

  const handleFormChange = (e, key: string) => {
    setFormInfo({
      ...formInfo,
      [key]: e.target.value,
    })
  }
  const { run: handleWithdraw } = useDebounceFn(
    async () => {
      if (!userInfo.invite_reward) {
        return
      }
      await onReward()
      dispatch(setUserInfo({ ...userInfo, invite_reward: 0 }))
    },
    {
      wait: 1000,
      leading: true,
    },
  )

  useEffect(() => {
    // if (account) {
    //   dispatch(fetchUserInviteInfo(account))
    // }
  }, [account])
  useEffect(() => {
    if (account && userInfo && !formInfo.id) {
      setFormInfo({ ...userInfo })
    } else if (!account) {
      setFormInfo({})
    }
  }, [account, userInfo])
  return (
    <div hidden={hidden} className={classes.pageContainer}>
      <InviteDialog
        open={inviteDialogVisible}
        onClose={() => {
          setInviteDialogVisible(false)
        }}
      />
      <Container className={classes.container}>
        <div>
          <PartItem title="Reward">
            <Grid container className={classes.rewardContainer} alignItems="center" justifyContent="center">
              <Grid item xs={4} className={classes.rewardItem}>
                <div className={classes.nums}>{userInfo.scoring_account || 0}</div>
                <div className={classes.hintText}>SCORING ACCOUNT</div>
              </Grid>
              <Grid item xs={4} className={classes.rewardItem}>
                <Icon
                  baseClassName="iconfont dj-history"
                  onClick={() => {
                    setInviteDialogVisible(true)
                  }}
                />
                <div className={classes.nums}>{userInfo.invite_num || 0}</div>
                <div className={classes.hintText}>INVITE THE NUMBER</div>
              </Grid>
              <Grid item xs={4} className={classes.rewardItem}>
                <div className={classes.nums}>
                  <Icon baseClassName="iconfont dj-withdraw" onClick={handleWithdraw} />
                  {userInfo.invite_reward || 0}
                  <span>ETH</span>
                </div>
                <div className={classes.hintText}> INVITE REWARDS</div>
              </Grid>
            </Grid>
          </PartItem>
          <PartItem title="Username">
            <InputBase
              value={formInfo?.name || ''}
              rows={20}
              onChange={(e) => {
                const val = e.target.value
                if (val.length > 20) {
                  setFormInfo({
                    ...formInfo,
                    name: val.slice(0, 20),
                  })
                  return
                }
                handleFormChange(e, 'name')
              }}
              placeholder="Enter username"
            />
          </PartItem>
          <PartItem title="Invite link">
            <InputBase
              readOnly
              endAdornment={
                <InputAdornment position="start">
                  <CopyToClipboard toCopy={inviteLink} showIcon={false}>
                    <Icon baseClassName="iconfont dj-copy" />
                  </CopyToClipboard>
                </InputAdornment>
              }
              value={inviteLink}
            />
          </PartItem>
          <PartItem title="Links">
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <Icon baseClassName="iconfont dj-email" />
                </InputAdornment>
              }
              value={formInfo?.email || ''}
              onChange={(e) => {
                handleFormChange(e, 'email')
              }}
              placeholder="YourEmailHandle"
            />
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <Icon baseClassName="iconfont dj-twitter" />
                </InputAdornment>
              }
              value={formInfo?.twitter || ''}
              onChange={(e) => {
                handleFormChange(e, 'twitter')
              }}
              placeholder="YourTwitterHandle"
            />
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <Icon baseClassName="iconfont dj-facebook" />
                </InputAdornment>
              }
              value={formInfo.facebook || ''}
              onChange={(e) => {
                handleFormChange(e, 'facebook')
              }}
              placeholder="YourFacebookHandle"
            />
          </PartItem>
          <LoadingButton
            size="large"
            variant="contained"
            loading={loading}
            disabled={!account}
            className={classes.saveBtn}
            onClick={handleSave}
          >
            SAVE THE INFORMATION
          </LoadingButton>
        </div>
      </Container>
    </div>
  )
}

export default Setting
