import React, { useState, useEffect } from 'react'
import { styled,makeStyles } from '@mui/styles'
import Container from 'components/Layout/Container'
import PageBack from 'components/PageBack'
import { queryWorkDetail, queryRecommendWorkList } from 'services/work'
import { detail } from 'services/markNft'
import { WorkDetailType } from 'types/marknft'
import PageLoading from 'components/Pageloading'
import useParsedQueryString from 'hooks/useParsedQueryString'
import BoxContent from './components/BoxContent'
import PalaceCard from '../Marketplace/components/PalaceCard'

const PageContainer = styled('div')({})
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize:14,
    fontFamily:'600',
    lineHeight:'40px',
    marginBottom:30,
  },
}))
const MysteryBox = () => {
  const classes = useStyles()
  const { id } = useParsedQueryString();
  const { type } = useParsedQueryString();
  const [detailData, setDetailData] = useState<WorkDetailType>({})
  const [recommandWorkList, setRecommandWorkList] = useState<WorkDetailType[]>([])
  const getWorkDetail = async () => {
    const data = await detail({ id })
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
    // getRecommendWorkList()
  }, [id])
  return detailData?.id?(
    <PageContainer>
      <Container>
        <PageBack />
        <BoxContent typeS={type} data={detailData} />
        <div className={classes.title}>HOT MOMENTS</div>
        <PalaceCard />
      </Container>
    </PageContainer>
  ): (
    <PageLoading />
  )
}

export default MysteryBox
