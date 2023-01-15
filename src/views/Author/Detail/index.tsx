import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, Icon } from '@mui/material'
import Container from 'components/Layout/Container'
import { AuthorDetailType } from 'types/author'
import { WorkDetailType } from 'types/work'
import PageLoading from 'components/Pageloading'
import { queryAuthorDetail } from 'services/author'
import { queryWorkList } from 'services/work'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { getBalanceNumber } from 'utils/formatBalance'
import WorkList from './components/WorkList'

const useStyles = makeStyles((theme) => ({
  container: {},
  header: {
    // background: 'url(/images/auther/headerBg.jpg) no-repeat center center',
    backgroundSize: 'cover',
    backgroundColor: '#171717',
    width: '100%',
    height: 216,
    overflow: 'hidden',
    position: 'relative',
    zIndex: -1,
    opacity: '0.5',
    '& video': {
      width: '100%',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  userInfo: {
    textAlign: 'center',
    marginTop: -54,
    marginBottom: 30,
    '& .iconfont': {
      color: theme.palette.text.primary,
      cursor: 'pointer',
    },
  },
  portrait: {
    height: 108,
    width: 108,
    margin: '0 auto 10px',
    borderRadius: '50%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 600,
  },
  follower: {
    fontSize: 14,
    color: theme.palette.text.third,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  userDescription: {
    fontSize: 14,
    width: 480,
    maxWidth: '100%',
    color: theme.palette.text.third,
    margin: '0 auto 10px',
    lineHeight: 1.5,
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

const AuthorDetail = () => {
  const [tabValue, setTabValue] = useState(0)
  const classes = useStyles()
  const { id = 4 } = useParsedQueryString()
  const [detailData, setDetailData] = useState<AuthorDetailType>({})
  const [workList, setworkList] = useState<WorkDetailType[]>([])
  const getAuthorDetail = async () => {
    const data = await queryAuthorDetail({ id })
    setDetailData(data?.data)
  }
  const getWorkList = async () => {
    const data = await queryWorkList({ page: 1, size: 100,author_id:id,type:0})
    setworkList(data?.data?.list||[])
    console.log(workList,123,data,detailData)
  }
  useEffect(() => {
    getAuthorDetail()
    getWorkList()
  }, [])
  return detailData?.id?(
    <div className={classes.container}>
      <div className={classes.header}>
        <video loop preload="auto" muted src={detailData?.background_inner} autoPlay />
      </div>
      <Container>
        <div className={classes.userInfo}>
          <Avatar className={classes.portrait} src={detailData.avatar} variant="rounded" />
          <div className={classes.userName}>{`${detailData?.first_name || ''} ${detailData?.last_name || ''}`}</div>
          <div className={classes.follower}>follower/{getBalanceNumber(detailData.follower / 1000, 0)}k</div>
          <div className={classes.userDescription}>{detailData.description}</div>
          <Icon
            baseClassName="iconfont dj-twitter"
            onClick={() => {
              window.open(detailData.twitter)
            }}
          />
        </div>
        {/* <Tabs
          value={tabValue}
          className={classes.tabs}
          centered
          onChange={(e, newVal) => {
            setTabValue(newVal)
          }}
        >
          <Tab disableRipple label="NFT collection" />
          <Tab disableRipple label="Blind box" />
        </Tabs> */}
        <WorkList data={workList} hidden={tabValue !== 0} />
        {/* <BoxList hidden={tabValue !== 1} /> */}
      </Container>
    </div>
  ): (
    <PageLoading />
  )
}

export default AuthorDetail
