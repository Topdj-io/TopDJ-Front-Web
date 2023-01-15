import React, { useState, useMemo,useRef,useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button,CircularProgress } from '@mui/material'
import { queryUserNftInfo } from 'services/nft'
import clsx from 'clsx'
import WorkItem from 'widget/Work/WorkItem'
import { useAccount } from 'state/userInfo/hooks'
import { NftDetailType } from 'types/nft'
import { WorkType } from 'types/work'
import dayjs from 'dayjs'
import PageLoading from 'components/Pageloading'
import RoutePath from 'routes/routePath'
import LazyLoad from 'react-lazyload'
import Empty from './Empty'
import EmptyNft from './EmptyNft'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px 0 150px',
  },
  button: {
    color: theme.palette.text.third,
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: 30,
    '&.active': {
      borderColor: theme.palette.text.primary,
    },
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
  },
  lazyContent: {
    height: '100%',
    
  },
  loadContainer: {
    textAlign: 'center',
    marginTop:30,
  },
  loadText: {
    cursor: 'pointer',
  },
  noMore: {
  }
}))
const buttonList = [
  {
    label: 'All',
    type:0,
    key: '',
  },
  {
    label: 'Video',
    type:4,
    key: WorkType.VIDEO,
  },
  // {
  //   label: 'Ticket',
  //   type:9,
  //   key: WorkType.TICKETS,
  // },
 
  // {
  //   label: 'Seed',
  //   type:8,
  //   key: WorkType.NOTE,
  // },
  
]
interface PropsType {
  hidden?: boolean
}
const Collections: React.FC<PropsType> = ({ hidden }) => {
  const [selectedValue, setSelectedValue] = useState<number>(0)
  const classes = useStyles()
  const account = useAccount(true)
  const [nftList, setNftList] = useState<NftDetailType[]>([])
  const [bftPage, setBftPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingTab, setLoadingTab] = useState(false)
  const nftSize = 10;
  const getUserNftList = async (page:number,type:number) => {
    if(page===1){
      setLoadingTab(true)
      setNftList([])
    }
    const data = await queryUserNftInfo({ page, size: nftSize,type })
    console.log(page,data)
    if (page === 1) {
      setNftList(data?.data.list||[])
    } else {
      setNftList([...nftList, ...data.data.list])
    }
    setLoading(false)
    setLoadingTab(false)
  }
  const isCanLoadMore =(data)=>{
    return data.length%nftSize === 0
  }
  const handleLoadMore =(page)=>{
    const num = page +1;
    setBftPage(num)
    setLoading(true)
    getUserNftList(num,selectedValue)
  }
  const filterData = useMemo<NftDetailType[]>(() => {
    if(nftList && selectedValue){
      return nftList.filter((item) => item.type === selectedValue)
    }else{
      return nftList
    }
  }, [selectedValue, nftList])
  useEffect(() => {
    if (account) {
      getUserNftList(1,selectedValue)
    } else {
      setNftList([])
    }
  }, [account])
  return !loadingTab?(
    <div hidden={hidden} className={classes.container}>
      <Grid container spacing={1}>
        {buttonList.map((item) => (
          <Grid item key={item.label}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setSelectedValue(item.type)
                setBftPage(1)
                getUserNftList(1,item.type)
              }}
              className={clsx(classes.button, { active: selectedValue === item.key })}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      {nftList && nftList.length === 0 ? (
        <Empty
          // actionText="Go and see"
          hintText="You don't have any NFT"
          // url={RoutePath.MYSTERY_BOX}
        />
      ) : (
          <div>
            <Grid container spacing={2}>
              {nftList.map((item, index) => {
                return (
                  <Grid item xs={6} md={3} key={index}>
                    {!item?.id ? (
                        <EmptyNft />
                      ) : (
                        <WorkItem type="2" data={{ ...item}} showRarityTag />
                      )}
                  </Grid>
                )
              })}
            </Grid>
            <div className={classes.loadContainer} >
              {loading && <CircularProgress size={30} color="inherit" />}
              {!loading&&isCanLoadMore(nftList) && <span onClick={() => {
                handleLoadMore(bftPage)
              }} className={classes.loadText}>LoadMore</span>}
              {!loading&&!isCanLoadMore(nftList) && <span className={classes.noMore}>NoMore</span>}
            </div>
          </div>
      )}
    </div>
  ): (
    <PageLoading />
  )
}

export default Collections
