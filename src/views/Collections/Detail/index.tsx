import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import Container from 'components/Layout/Container'
import PageBack from 'components/PageBack'
import { queryCollectionDetail } from 'services/collection'
import { CollectionDetailType } from 'types/collections'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { useAccount } from 'state/userInfo/hooks'
import CurrentCollection from 'widget/Collections/CurrentCollection'
import Percent from 'widget/Collections/Percent'
import CardList from './components/CardList'

const useStyles = makeStyles((theme) => ({
  container: {},
  pageTitle: {
    textAlign: 'center',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '20px 0 80px',
  },
}))
const CollectionsDetail = () => {
  const classes = useStyles()
  const { id } = useParsedQueryString()
  const [detailData, setDetailData] = useState<CollectionDetailType>({})
  const account = useAccount()
  const boole = true;
  const getCollectionDetail = async () => {
    const data = await queryCollectionDetail({ id })
    setDetailData(data?.data)
  }
  useEffect(() => {
    getCollectionDetail()
  }, [account])
  return (
    <div className={classes.container}>
      <Container>
        <PageBack />
        <div className={classes.pageTitle}>Collect your collections</div>
        <CurrentCollection showAction={boole} data={detailData} />
        <Percent value={detailData?.collect?.completed} />
        <CardList data={detailData?.require_list} />
      </Container>
    </div>
  )
}

export default CollectionsDetail
