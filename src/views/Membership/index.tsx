import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { makeStyles } from '@mui/styles'
import BigNumber from 'bignumber.js'
import { Grid } from '@mui/material'
import Container from 'components/Layout/Container'
import { usePreSaleMembershipTransaction, usePublicSaleMembershipTransaction } from 'hooks/useTransaction'
import useToast from 'hooks/useToast'
import useRefresh from 'hooks/useRefresh'
import { useAccount } from 'state/userInfo/hooks'
import dayjs from 'dayjs'
import FlipCountDown from 'components/FlipCountDown'
import PageLoading from 'components/Pageloading'
import {
  MembershipDetailType,
  MembershipActivityType,
  MembershipActivityStage,
  MembershipStatus,
} from 'types/membership'
import { MEMBERSHIP_CARD_LIST } from 'config/constants/membershipList'
import SwiperControllerProps from 'swiper/types/swiper-class.d'
import { Swiper as ReactSwiper, SwiperSlide, SwiperProps } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import CardItem from './components/CardItem'
import InterestsItem from './components/InterestsItem'
import MemberState from './components/MemberState'
import RightPart from './components/RightPart'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: -100,
  },
  cardPartContainer: {
    background: 'url(/images/membership/bg.jpg) no-repeat top center',
    backgroundSize: 'cover',
    paddingBottom: 80,
  },
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '80px 0 14px',
  },
  description: {
    fontSize: 16,
    lineHeight: '24px',
    textAlign: 'center',
    marginBottom: 60,
  },
  secondTitle: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    fontSize: 24,
    fontFamily: 'title',
    marginBottom: 20,
    height: 24,
  },
  countDown: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    transform: 'scale(1.5)',
  },
  countDownFlip: {
    width: 'auto',
  },
  contentInterestsItem:{
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1320px',
  },
  leftIco:{
    display:'inline-block',
    width:32,
    height:32,
    background: 'url(/images/membership/left_icon_un_selected.svg) no-repeat center center',
    backgroundSize:'100% 100%',
    '&:hover':{
      background: 'url(/images/membership/left_icon_pitch_on.svg) no-repeat center center',
      backgroundSize:'100% 100%',
    }
  },
  rightIco:{
    display:'inline-block',
    width:32,
    height:32,
    background: 'url(/images/membership/right_icon_un_selected.svg) no-repeat center center',
    backgroundSize:'100% 100%',
    '&:hover':{
      background: 'url(/images/membership/right_icon_pitch_on.svg) no-repeat center center',
      backgroundSize:'100% 100%',
    }
  },
  iconBox:{
    display:'flex',
    fontSize:0,
    position: 'absolute',
    right:30,
    bottom:60,
    zIndex:10,
    '& span':{
      display:'inline-block',
      width:50,
      height:50,
      backgroundColor:'#28282B',
      padding:9,
      cursor: 'pointer',
    }
  },
  ml30:{
    marginLeft:30,
  }
}))
const ACTIVITY_ID = 1
const Membership = () => {
  const classes = useStyles()
  const { toastSuccess } = useToast()
  const [loading, setLoading] = useState(false)
  const account = useAccount()
  const { toastError } = useToast()
  const [txId, setTxId] = useState()
  const [cardList, setCardList] = useState(MEMBERSHIP_CARD_LIST)
  const [activeCardId, setActiveCardId] = useState()
  const sendPreSaleMembershipTransaction = usePreSaleMembershipTransaction()
  const sendPublicSaleMembershipTransaction = usePublicSaleMembershipTransaction()
  const [membershipActivityDetail, setMembershipActivityDetail] = useState<MembershipActivityType>({})

  const { fastRefresh } = useRefresh()
  const getMembershipList = async () => {
    // const res = await queryMembershipList({ activity_id: ACTIVITY_ID })
    // setMembershipActivityDetail(res)
    const newCardList = { ...cardList }
    const res = [
      {
        "id": 1,
        "description": "Diamond Genesis Membership",
        "name": "Diamond Genesis Membership",
        "type": 1,
        "icon_resource": {
          "path": "/member/1639059864.jpg",
          "url": "https://topdj0430.s3-accelerate.amazonaws.com/mp4/member/1639059864.jpg"
        },
        "cover_resource": {
          "path": "/member/card1.gif",
          "url": "https://topdj0430.s3-accelerate.amazonaws.com/mp4/member/card1.gif"
        },
        "remain_num": 446,
        "num": 499,
        "price": 1000,
        "status": 2
      },
      {
        "id": 2,
        "description": "Gold Genesis Membership",
        "name": "Gold Genesis Membership",
        "type": 2,
        "icon_resource": {
          "path": "/member/1639059864.jpg",
          "url": "https://topdj0430.s3-accelerate.amazonaws.com/mp4/member/1639059864.jpg"
        },
        "cover_resource": {
          "path": "/member/card2.gif",
          "url": "https://topdj0430.s3-accelerate.amazonaws.com/mp4/member/card2.gif"
        },
        "remain_num": 983,
        "num": 1000,
        "price": 1000,
        "status": 2
      },
      {
        "id": 3,
        "description": "Elite Genesis Membership",
        "name": "Elite Genesis Membership",
        "type": 3,
        "icon_resource": {
          "path": "/member/1639059864.jpg",
          "url": "https://topdj0430.s3-accelerate.amazonaws.com/mp4/member/1639059864.jpg"
        },
        "cover_resource": {
          "path": "/member/card3.gif",
          "url": "https://topdj0430.s3-accelerate.amazonaws.com/mp4/member/card3.gif"
        },
        "remain_num": 1435,
        "num": 1500,
        "price": 1000,
        "status": 2
      }
    ]
    res.forEach((item) => {
      newCardList[item.type] = {
        ...newCardList[item.type],
        num: item.num,
        remain_num: item.remain_num,
        status: item.status,
      }
    })
    setCardList(newCardList)
  }
  const saleTime = Date.now();


  useEffect(() => {
    getMembershipList()
  }, [account, fastRefresh])
  useEffect(() => {
    !loading && setActiveCardId(undefined)
  }, [loading])
  const countDownTime = useMemo(() => {
    if (membershipActivityDetail.cur_stage === MembershipActivityStage.VIP_SALE) {
      if (dayjs().valueOf() - dayjs(membershipActivityDetail.pre_sale_start_time_on).valueOf() > 0) {
        return membershipActivityDetail.pre_sale_end_time_on
      } else {
        return membershipActivityDetail.pre_sale_start_time_on
      }
    } else if (membershipActivityDetail.cur_stage === MembershipActivityStage.PRE_SALE) {
      if (dayjs().valueOf() - dayjs(membershipActivityDetail.pre_sale_start_time).valueOf() > 0) {
        return membershipActivityDetail.pre_sale_end_time
      } else {
        return membershipActivityDetail.pre_sale_start_time
      }
    } else if (membershipActivityDetail.cur_stage === MembershipActivityStage.PUBLIC_SALE) {
      if (dayjs().valueOf() - dayjs(membershipActivityDetail.sale_start_time).valueOf() > 0) {
        return membershipActivityDetail.sale_end_time
      } else {
        return 0
      }
    } else {
      return 0
    }
  }, [membershipActivityDetail])
  const stageText = useMemo(() => {
    if (membershipActivityDetail.cur_stage === MembershipActivityStage.VIP_SALE) {
      if (dayjs().valueOf() - dayjs(membershipActivityDetail.pre_sale_start_time_on).valueOf() < 0) {
        return 'Vip sale Counting Down'
      }
    } else if (membershipActivityDetail.cur_stage === MembershipActivityStage.PRE_SALE) {
      if (dayjs().valueOf() - dayjs(membershipActivityDetail.pre_sale_start_time).valueOf() < 0) {
        return 'Pre sale Counting Down'
      }
    }
    switch (membershipActivityDetail.cur_stage) {
      case MembershipActivityStage.VIP_SALE:
        return 'Vip Sale'
      case MembershipActivityStage.PRE_SALE:
        return 'Pre Sale'
      case MembershipActivityStage.PUBLIC_SALE:
        return 'Public Sale'
      default:
        return ''
    }
  }, [membershipActivityDetail])
  const getBtnStatus = useCallback((status, item) => {
    if( item.cur_stage === MembershipActivityStage.PUBLIC_SALE &&item.sale_end_time< saleTime){
      return 'sold out'
    }
    switch (status) {
      case MembershipStatus.MINT:
        return 'mint'
      case MembershipStatus.NO_WHITE_LIST:
        return 'not whitelisted'
      case MembershipStatus.NO_QUALIFICATIONS:
        return 'mint limit reached'
      case MembershipStatus.SOLD_OUT:
        return 'sold out'
      case MembershipStatus.DISABLED:
        return 'pending'
      default:
        return 'mint'
    }
  }, [])
  const [controlledSwiper, setControlledSwiper] = useState<SwiperControllerProps>(null)
  const imgArr = [
    {
      url:'/images/interests/interests_icon_1.svg',
      classN:'imgleft',
      sty:'100px auto 0 0'
    },
    {
      url:'/images/interests/interests_icon_2.svg',
      classN:'img',
      sty:'100px auto 0 auto'
    },
    {
      url:'/images/interests/interests_icon_3.svg',
      classN:'imgright',
      sty:'100px 0 0 auto'
    },
    {
      url:'/images/interests/interests_icon_4.svg',
      classN:'imgleft',
      sty:'100px auto 0 0'
    },
    {
      url:'/images/interests/interests_icon_5.svg',
      classN:'img',
      sty:'100px auto 0 auto'
    },
    {
      url:'/images/interests/interests_icon_6.svg',
      classN:'imgright',
      sty:'100px 0 0 auto'
    },
  ]
  const loop = true;
  return  (
    <div className={classes.container}>
      <div className={classes.cardPartContainer}>
        <Container>
          <div className={classes.pageTitle}>membership cards</div>
          <div className={classes.description}>
            Stay tuned for more membership card activities
          </div>
          <ReactSwiper
        className="swiper-container"
        navigation
        loop={loop}
        onSwiper={(e) => {
          setControlledSwiper(e)
        }}
        
                    >
        {Object.values(cardList).map((item, index) => (
          <SwiperSlide className="swiper-slide">
              <CardItem
                  data={item}
                  key={item.id}
                  loading={loading && activeCardId === item.id}
                  disabled={false}
                  text={getBtnStatus(item.status, membershipActivityDetail)}
                  onConfirm={() => {
                    // setActiveCardId(item.id)
                    // if (membershipActivityDetail.cur_stage === MembershipActivityStage.PUBLIC_SALE) {
                    //   handlePublicBuy(item.price, item.id)
                    // } else {
                    // }
                  }}
                />
           </SwiperSlide>
        ))}
        <div className={classes.iconBox}>
          <span><i className={classes.leftIco} onClick={() => {
            controlledSwiper?.slidePrev()
          }}> </i></span>
          <span className={classes.ml30}><i className={classes.rightIco} onClick={() => {
            controlledSwiper?.slideNext()
          }}> </i></span>
        </div>
        </ReactSwiper>
        {/* <MemberState /> */}
        </Container>
        <div className={classes.contentInterestsItem}>
          <InterestsItem imgArr={imgArr} />
        </div>
      </div>
      {/* <RightPart /> */}
    </div>
  ) 
}

export default Membership
