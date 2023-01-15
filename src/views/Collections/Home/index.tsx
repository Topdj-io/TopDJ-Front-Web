import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import Container from 'components/Layout/Container'
import PageLoading from 'components/Pageloading'
import PartHeader from 'components/PartHeader'
import { queryCollectionList } from 'services/collection'
import { CollectionDetailType } from 'types/collections'
import { useAccount } from 'state/userInfo/hooks'
import CurrentCollection from 'widget/Collections/CurrentCollection'
import Percent from 'widget/Collections/Percent'
import FutureCollection from 'widget/Collections/FutureCollection'
import CardList from './components/CardList'
import FutureCardList from './components/FutureCardList'

const useStyles = makeStyles((theme) => ({
  container: {
    // paddingBottom: 160,
  },
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '80px 0',
  },
}))
const Home = () => {
  const classes = useStyles()
  const account = useAccount()
  const [collectionList, setCollectionList] = useState<CollectionDetailType[]>([{}])
  const [btnActive, setBtnActive] = useState<number[]>([1])
  const boole = true
  const getCollectionList = async () => {
    const data = await queryCollectionList({ page: 1, size: 100})
    setCollectionList(data?.data.list||[])
  }
  useEffect(() => {
    getCollectionList()
  }, [account])
  return collectionList[0]?.collect?.id?(
    <div className={classes.container}>
      <Container>
        <div className={classes.pageTitle}>Challenge a new achievement</div>
        {collectionList.map((item) => (
          <div key={item?.collect?.id}>
            <CurrentCollection showAction={boole} data={item} />
            <Percent value={item?.collect?.completed} />
            <CardList data={item?.require_list} id={item?.collect?.id}  />
          </div>
        ))}
      </Container>
    </div>
  ):(<PageLoading />)
}

export default Home
