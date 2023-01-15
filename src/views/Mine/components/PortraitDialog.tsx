import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button, Avatar, Badge, Dialog } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAccount, useUserPortrait, useUserInfo } from 'state/userInfo/hooks'
import { queryUserAvatarList, updateUserAvater } from 'services/user'
import { ProtraitDetailType } from 'types/user'
import { setUserInfo } from 'state/actions'

const useStyles = makeStyles(({ palette }) => ({
  dialog: {
    '& .MuiPaper-root': {
      overflow: 'visible',
      padding: '30px 20px',
      maxWidth: '80%',
    },
  },
  container: {
    width: 520,
    textAlign: 'center',
    '& img': {
      height: 72,
      width: 72,
      border: '1px solid #fff',
      borderRadius: '50%',
      cursor: 'pointer',
    },
  },
  userInfo: {
    marginTop: -66,
    fontSize: 16,
    marginBottom: 50,
    '& img': {
      marginBottom: 10,
    },
  },
  title: {
    fontSize: 24,
    lineHeight: 1.5,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  imgList: {
    marginBottom: 60,
    '& .MuiSvgIcon-root': {
      background: '#fff',
      borderRadius: '50%',
    },
  },
}))

const PortraitDialog = (props) => {
  const classes = useStyles()
  const userPortrait = useUserPortrait()
  const dispatch = useDispatch()
  const account = useAccount()
  const [loading, setLoading] = useState(false)
  const userInfo = useUserInfo()
  const [portraitList, setPortraitList] = useState([])
  const [selectedPortrait, setSelectedPortrait] = useState(userInfo.avatar_url)
  const { onClose } = props

  const getPortraitList = async () => {
    const data = await queryUserAvatarList();
    setPortraitList(data?.data)
  }
  const handleUpdatePortrait = async () => {
    setLoading(true)
    await updateUserAvater({ avatar_id: portraitList.find((item) => item.path === selectedPortrait)?.id })
    
    dispatch(setUserInfo({ ...userInfo, avatar_url: selectedPortrait }))
    onClose()
    setLoading(false)
  }
  useEffect(() => {
    account && getPortraitList()
  }, [account])
  useEffect(() => {
    setSelectedPortrait(userInfo.avatar_url)
  }, [userInfo])
  return (
    <Dialog {...props} className={classes.dialog}>
      <div className={classes.container}>
        <div className={classes.userInfo}>
          <img src={userPortrait} alt="" />
          <div>{userInfo.name}</div>
        </div>
        <div className={classes.title}>Choose one as your avatar</div>
        <Grid className={classes.imgList} container spacing={3.6} alignItems="center" justifyContent="center">
          {portraitList.map((item) => (
            <Grid item key={item.id}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={selectedPortrait === item.path ? <CheckCircleIcon color="primary" /> : <></>}
              >
                <img
                  onClick={() => {
                    setSelectedPortrait(item.path)
                  }}
                  src={item.path}
                  alt=""
                />
              </Badge>
            </Grid>
          ))}
        </Grid>
        <LoadingButton onClick={handleUpdatePortrait} loading={loading} variant="contained" size="large" fullWidth>
          SAVE
        </LoadingButton>
      </div>
    </Dialog>
  )
}

export default PortraitDialog
