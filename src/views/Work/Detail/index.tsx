import React, { useState, useEffect } from 'react'
import { styled } from '@mui/styles'
import Container from 'components/Layout/Container'
import PageBack from 'components/PageBack'
import { queryWorkDetail, queryRecommendWorkList } from 'services/work'
import { nftDetails } from 'services/markNft'
import { WorkDetailType,newWorkDetailType } from 'types/work'
import PageLoading from 'components/Pageloading'
import useParsedQueryString from 'hooks/useParsedQueryString'
import HolderList from './components/HolderList'
import BoxContent from './components/BoxContent'
import BoxList from './components/BoxList'
import Introduction from './components/Introduction'

const PageContainer = styled('div')({})
const MysteryBox = () => {
  const { id } = useParsedQueryString();
  const { type } = useParsedQueryString();
  const [detailData, setDetailData] = useState<newWorkDetailType>({})
  const [recommandWorkList, setRecommandWorkList] = useState<newWorkDetailType[]>([])
  const getWorkDetail = async () => {
    const data = await nftDetails({ id })
    setDetailData(data?.data)
  }
  const getRecommendWorkList = async () => {
    const data = await queryRecommendWorkList({ num: 4 })
    setRecommandWorkList(data?.data||[])
  }
  useEffect(() => {
    setDetailData({})
    setRecommandWorkList([])
    getWorkDetail()
    getRecommendWorkList()
  }, [id])
  return detailData?.nft?.token_id?(
    <PageContainer>
      <Container>
        <PageBack />
        <BoxContent typeS={type} data={detailData} />
        {/* {type!=='1'&&(<Introduction introduction={detailData.introduction} />)} */}
        {type!=='1'&&(<HolderList />)}
        {type!=='1'&&(<BoxList data={recommandWorkList} />)}
      </Container>
    </PageContainer>
  ): (
    <PageLoading />
  )
}

export default MysteryBox
