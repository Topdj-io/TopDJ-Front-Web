import React, { useMemo, useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import useRefresh from 'hooks/useRefresh'
import { Grid, Icon } from '@mui/material'
import FlipCountDown from 'components/FlipCountDown'
import { BlindBoxDetailTypeTop } from 'types/blindBoxTop'
import Skeleton from 'components/Skeleton'
import { queryBlindBoxExchange,queryNftListByTx } from 'services/nft'
import EthIcon from 'components/Icons/EthIcon'
import { BLINDBOX_LOADING_URL } from 'config/constants/preloadResource'
import dayjs from 'dayjs'
import clsx from 'clsx'
import Actions from './Actions'
import ExchangeButton from './ExchangeButton'

const useStyles: any = makeStyles((theme) => ({
  container: {
    margin: '80px 0',
  },
  imgContainer: {
    flex: '0 0 780px',
    maxWidth: '100%',
    height: 620,
  },
  imgBg: {
    position: 'relative',
    height: '100%',
    '&:after': {
      content: '""',
      width: '100%',
      height: 50,
      bottom: -50,
      left: 0,
      position: 'absolute',
      background: 'url(/images/blindBox/boxBg.png) no-repeat center bottom',
      backgroundSize: 'cover',
      zIndex: -1,
    },
  },
  selloutBg: {
    position: 'absolute',
    zIndex: 1,
    width: '80%',
    transform: 'translate(-50%,-50%)',
    left: '50%',
    top: '50%',
  },
  imgBgCover: {
    width: '100%',
    height: '100%',
  },
  imgBgLoading: {
    position: 'absolute',
    zIndex: 1,
  },
  partTitle: {
    fontFamily: 'text-bold',
    fontSize: 40,
    fontWeight: 600,
    lineHeight: '58px',
    color: theme.palette.text.third,
    marginBottom: 6,
  },
  description: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  price: {
    fontFamily: 'number',
    fontWeight: 600,
    fontSize: 32,
    color: theme.palette.primary.main,
    margin: '30px 0 15px',
  },
  ethIcon: {
    marginRight: 5,
  },
  priceUnit: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    verticalAlign: 'super',
    marginLeft: 4,
  },
  remaining: {
    marginBottom: 10,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
  },
  remainingCount: { fontFamily: 'text-bold' },
  remainingSellout: {
    color: '#FE126A',
    fontFamily: 'text-bold',
  },
  opacity6: {
    opacity: 0.6,
  },
  leftBox:{
    display:'inline-block',
    width:'60%',
    paddingBottom:50,
    '& p':{
        fontSize:16,
        color:'#fff',
        fontWeight:'bold', 
    },
    '& span':{
        fontSize:58,
        color:'#888888',
        fontWeight:'bold',
        lineHeight:1.1,
        '& b':{
            fontSize:64,
            fontFamily: 'D-DINExp-Bold, D-DINExp',
        }
    }
  },
  leftColor:{
    color: '#8AFA0F!important',
  }
}))

interface BuyBoxPropsType {
  data?: BlindBoxDetailTypeTop
}
const Authentication = ({ data }: BuyBoxPropsType) => {
  const classes = useStyles()
  const [cardQuantity, setCardQuantity] = useState(0)
  const { fastRefresh } = useRefresh()
  
  
  const handleBlindBoxExchange = async () => {
    if(localStorage.getItem('token')){
      const res = await queryBlindBoxExchange();
      setCardQuantity(res.data)
    }
 }
 
 
  const isSellOut = useMemo(() => {
    const diffTime = dayjs(data?.box?.end_at).diff(dayjs(), 'second')
    if (data?.box?.remaining === 0 || diffTime < 0) {
      return true
    } else {
      return false
    }
  }, [data])
  useEffect(() => {
    handleBlindBoxExchange()
    
    
  }, [fastRefresh])
  return (
    <div className={classes.container}>
      
      <Grid spacing={6} container>
        <Grid item md={12} xl lg xs={12} sm={12} className={classes.imgContainer}>
          {data?.box?.id ? (
            <div className={classes.imgBg}>
              <img src={data.box.cover} className={classes.imgBgLoading} alt="" />
              <img src={data.box.background} className={classes.imgBgCover} alt="" />
              {isSellOut && <img src="/images/blindBox/sellout.png" className={classes.selloutBg} alt="" />}
            </div>
          ) : (
            <Skeleton height="100%" variant="rectangular" />
          )}
        </Grid>
        {data?.box?.id ? (
          <Grid item xs container flexDirection="column" flexWrap="initial">
            <Grid item xs>
              <div className={classes.partTitle}>{data.box.title}</div>
              <div className={classes.description}>{data.box.sub_title}</div>
              
            </Grid>
            <Grid item>
            <div className={classes.leftBox}>
                <p>Your current account can receive</p>
                <span className={cardQuantity>0?classes.leftColor:''}><b>{cardQuantity}</b> indivual</span>
            </div>
              <FlipCountDown
                title="Biding Ends In:"
                time={data?.box?.end_at}
                className={isSellOut ? classes.opacity6 : ''}
              />
              <ExchangeButton cardQuantitys={cardQuantity} backgroundImg={data?.box?.background} id={data?.box?.id} disabled={cardQuantity===0} />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs container flexDirection="column" flexWrap="initial">
            <Grid item xs>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Grid>
            <Grid item>
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

export default Authentication
