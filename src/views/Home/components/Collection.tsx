import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { queryCollectionList } from 'services/collection'
import { CollectionDetailType } from 'types/collections'
import CurrentCollection from 'widget/Collections/CurrentCollection'
import FutureCollection from 'widget/Collections/FutureCollection'
import RoutePath from 'routes/routePath'
import Title from './Title'
import PartContainer from './PartContainer'
import MoreBtn from './MoreBtn'

const useStyles = makeStyles((theme) => ({
  container: {},
}))
const Home = () => {
  const classes = useStyles()
  const [collectionList, setCollectionList] = useState<CollectionDetailType[]>([{}])
  const boole = true;
  const getCollectionList = async () => {
    const data = await queryCollectionList({ page: 1, size: 1 })
    console.log(data)
    const list = data.data.list?data.data.list.filter((item,index) => {
          return index<1;
    }):[];
    setCollectionList(list||[])
  }
  useEffect(() => {
    getCollectionList()
  }, [])
  return (
    <PartContainer>
      <Title>Challenge a new achievement</Title>
        {collectionList.map((item) => (
          <div key={item?.collect?.id}>
            <CurrentCollection goskip={boole} data={item} />
          </div>
        ))}
      <MoreBtn url={RoutePath.COLLECTIONS} className="animate__delay-1s">
        To collect
      </MoreBtn>
    </PartContainer>
  )
}

export default Home
