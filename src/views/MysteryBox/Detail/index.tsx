import React, { useEffect, useState } from 'react'
import { styled } from '@mui/styles'
import { BlindBoxDetailTypeTop } from 'types/blindBoxTop'
import { queryBlindBoxDetailInfo,queryBlindBoxDetailInfoCount  } from 'services/blindBox'
import Container from 'components/Layout/Container'
import useRefresh from 'hooks/useRefresh'
import useParsedQueryString from 'hooks/useParsedQueryString'
import BuyBox from '../components/BuyBox'
import BoxList from './components/BoxList'
import Introduction from '../Home/components/Introduction'
import MysteryBoxContext from '../context'

const PageContainer = styled('div')({})
const MysteryBoxDetail = () => {
  const { id } = useParsedQueryString()
  const [detailData, setDetailData] = useState<BlindBoxDetailTypeTop>({})
  const { fastRefresh } = useRefresh()
  const getBoxDetail = async () => {
    const data = await queryBlindBoxDetailInfo({ id, num: 20 })
    setDetailData(data?.data)
  }
  const getBoxDetailCont = async () => {
    const data = await queryBlindBoxDetailInfoCount({ id})
    const parme = detailData;
    parme.box = {...detailData.box,...data?.data}
    setDetailData(parme)
  }
  useEffect(() => {
    getBoxDetail()
  }, [])
  useEffect(() => {
    if(detailData?.box?.id){
      getBoxDetailCont()
    }
  }, [fastRefresh])
  return (
    <PageContainer>
      <MysteryBoxContext.Provider value={{ onSuccess: getBoxDetail }}>
        <Container>
          <BuyBox data={detailData} />
          <BoxList data={detailData.works} />
        </Container>
      </MysteryBoxContext.Provider>
    </PageContainer>
  )
}

export default MysteryBoxDetail
