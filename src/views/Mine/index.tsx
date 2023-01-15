import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Tabs, Tab } from '@mui/material'
import Container from 'components/Layout/Container'
import { NftDetailType } from 'types/nft'
import { queryUserMembershipList } from 'services/membership'
import { MembershipDetailType } from 'types/membership'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useAccount, useUserPortrait, useUserInfo } from 'state/userInfo/hooks'
import { MineTabKey } from 'config/constants/pageTabKey'
import Empty from './components/Empty'
import Setting from './Setting'
import Collections from './components/Collections'
import PortraitDialog from './components/PortraitDialog'
import MembershipList from './components/MemberCardList'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  header: {
    background: 'url(/images/mine/headerBg.jpg) no-repeat center center',
    backgroundSize: 'cover',
    height: 66,
    position: 'absolute',
    top: 0,
    width: '100%',
    left: 0,
    zIndex: -1,
  },
  nickName: {
    color: theme.palette.text.primary,
    marginBottom: 6,
  },
  userInfo: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    paddingTop: 10,
    marginBottom: 30,
    color: theme.palette.text.secondary,
    '& img': {
      height: 108,
      width: 108,
      marginBottom: 10,
      border: '3px solid #fff',
      borderRadius: '50%',
      cursor: 'pointer',
    },
  },
  portrait: {
    height: 108,
    width: 108,
    marginBottom: 10,
    border: '3px solid #fff',
    borderRadius: '50%',
  },
  tabs: {
    '&.MuiTabs-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiButtonBase-root.Mui-selected': {
      color: theme.palette.text.third,
    },
    '& .MuiButtonBase-root': {
      fontWeight: 600,
    },
  },
}))
const Mine = () => {
  const { tabType } = useParsedQueryString()
  const [tabValue, setTabValue] = useState(tabType || MineTabKey.NFT)
  const classes = useStyles()
  const account = useAccount(true)
  const userInfo = useUserInfo()
  const accountEllipsis = useAccount(true)
  const userPortrait = useUserPortrait()
  const [membershipList, setMembershipList] = useState<MembershipDetailType[]>(undefined)
  const [portraitDialogVisible, setPortraitDialogVisible] = useState(false)
  
  const getUserMembershipList = async () => {
    const data = await queryUserMembershipList({ page: 1, size: 100 })
    setMembershipList(data.data||[])
  }
  useEffect(() => {
    if (account) {
      // getUserNftList()
      getUserMembershipList()
    } else {
      // setNftList([])
      setMembershipList([])
    }
  }, [account])

  useEffect(() => {
    setTabValue(tabType || MineTabKey.NFT)
  }, [tabType])
  return (
    <div className={classes.container}>
      <div className={classes.header} />
      <PortraitDialog
        open={portraitDialogVisible}
        onClose={() => {
          setPortraitDialogVisible(false)
        }}
      />
      <Container>
        <div className={classes.userInfo}>
          <img
            src={userPortrait}
            alt=""
            onClick={() => {
              setPortraitDialogVisible(true)
            }}
          />
          <div className={classes.nickName}>{userInfo.name}</div>
          <div>{accountEllipsis}</div>
        </div>
        <Tabs
          value={tabValue}
          className={classes.tabs}
          centered
          onChange={(e, newVal) => {
            setTabValue(newVal)
          }}
        >
          <Tab disableRipple value={MineTabKey.NFT} label="NFT collection" />
          {/* <Tab disableRipple value={MineTabKey.SET} label="Set" /> */}
          <Tab disableRipple value={MineTabKey.MEMBERSHIP} label="Membership" />
        </Tabs>
        {account?(<>
          <Collections  hidden={tabValue !== MineTabKey.NFT} />
        <Setting hidden={tabValue !== MineTabKey.SET} />
        <MembershipList data={membershipList} hidden={tabValue !== MineTabKey.MEMBERSHIP} />
        </>):(
          <Empty
            // actionText="Go and see"
            hintText="You don't login"
            // url={RoutePath.MYSTERY_BOX}
          />
        )}
        
        {/* <BoxList
          onRefresh={() => {
            // getBlindBoxList()
            getUserNftList()
          }}
          hidden={tabValue !== 1}
          data={blindBoxList}
        /> */}
      </Container>
    </div>
  )
}

export default Mine
