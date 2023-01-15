import React, { useEffect, useState,useCallback } from 'react'
import { makeStyles } from '@mui/styles'
import { Tabs, Tab } from '@mui/material'
import { useAccount } from 'state/userInfo/hooks'
import { BlindBoxDetailTypeTop,MysteryBoxType } from 'types/blindBoxTop'
import { queryHomeBlindBoxInfo, queryBlindBoxDetailInfo ,queryBlindBoxDetailInfoCount} from 'services/blindBox'
import Container from 'components/Layout/Container'
import PageLoading from 'components/Pageloading'
import { MYSTERY_BOX_ID } from 'config/constants'
import LoadedImage from 'components/Image/loadedImage'
import useRefresh from 'hooks/useRefresh'
import BuyBox from '../components/BuyBox'
import Authentication from '../components/Authentication'
import BoxList from './components/BoxList'
import Introduction from './components/Introduction'
import MysteryBoxContext from '../context'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 50,
    '& img': {
      marginBottom: 50,
    },
  },
  tabs: {
    
    // paddingBottom:30,
    '&.MuiTabs-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiButtonBase-root.Mui-selected': {
      color: theme.palette.text.third,
      fontWeight: 600,
    },
    '& .MuiButtonBase-root': {
        color: '#888888',
        textTransform: 'uppercase',
    },
  },
}))
const MysteryBox = () => {
  const classes = useStyles()
  const [detailData, setDetailData] = useState<BlindBoxDetailTypeTop>({})
  const { fastRefresh } = useRefresh()
  const account = useAccount()
  const [btnActive, setBtnActive] = useState<number>(1)
  const getBoxDetail = async () => {
    const data = await queryHomeBlindBoxInfo({ num: 4 })
    setDetailData(data?.data||{})
  }
  const getBoxDetailCont = async () => {
    const data = await queryBlindBoxDetailInfoCount({ num: 4 })
    const parme = detailData;
    parme.box = {...detailData.box,...data.data}
    setDetailData(parme)
  }
  const getBtnStatus = useCallback((type) => {
    switch (type) {
      case MysteryBoxType.VIP:
        return 'Vip Sale'
      case MysteryBoxType.PRESELL:
        return 'Pre Sale'
      case MysteryBoxType.PUBLIC_AUCTION:
        return 'Public Sale'
      default:
        return ''
    }
  }, [])
  // 刷新数量
  useEffect(() => {
    if(detailData?.box?.id){
      getBoxDetailCont()
    }
  }, [fastRefresh])
  useEffect(() => {
    getBoxDetail()
  }, [account])
  return detailData?.box?.id?(
    <div>
      <MysteryBoxContext.Provider value={{ onSuccess: getBoxDetail }}>
        <Container className={classes.container}>
        <Tabs
          value={btnActive}
          className={classes.tabs}
          centered
          onChange={(e, newVal) => {
            setBtnActive(newVal)
          }}
        >
          <Tab disableRipple value={1} label={detailData?getBtnStatus(detailData?.box?.type):'BUY NFT'} />
          <Tab disableRipple value={2} label="FREE NFT" />
        </Tabs>
        {btnActive===1?(<BuyBox onStop={getBoxDetail} data={detailData} />):(<Authentication data={detailData} />)}
        
          <BoxList data={detailData} />
          {detailData?.box?.introduction?(<Introduction introduction={detailData?.box?.introduction} />):''}
        </Container>
      </MysteryBoxContext.Provider>
    </div>
  ) : (
    <PageLoading />
  )
    // (
  //   <MysteryBoxContext.Provider value={{ onSuccess: getBoxDetail }}>
  //       <Container className={classes.container}>
  //         <LoadedImage src="/images/overview/blindboxPart.png" alt="" />
  //         <LoadedImage src="/images/overview/nftList.png" alt="" />
  //         <LoadedImage src="/images/overview/blindboxText.png" alt="" />
  //       </Container>
  //     </MysteryBoxContext.Provider>
  // )
}

export default MysteryBox
