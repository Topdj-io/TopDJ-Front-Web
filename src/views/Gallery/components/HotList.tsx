import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import AuthorItem from 'widget/Gallery/AuthorItem'
import PageLoading from 'components/Pageloading'
import { queryAuthorHotList } from 'services/author'
import { AuthorDetailType } from 'types/author'
import Swiper from 'components/Swiper'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 60,
  },
  title: {
    fontSize: 14,
    fontFamily: 'text-bold',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
}))
const HotList = () => {
  const [data, setData] = useState<AuthorDetailType[]>(new Array(5).fill(''))
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  
  const getAuthorList = async () => {
    const res = await queryAuthorHotList({ num: 10000 })
    setData(res.data)
    setLoading(false)
  }
  useEffect(() => {
    getAuthorList()
  }, [])
  return !loading?(
    <div className={classes.container}>
      <div className={classes.title}>Hot Author</div>
      <Swiper
        padding={18}
        // loop
        autoplay
        centerInsufficientSlides
        spaceBetween={20}
        navigation
        slidesPerView={5}
        data={data.map((item) => ({ ...item, children: <AuthorItem animate data={item} border /> }))}
      />
    </div>
  ): (
    <PageLoading />
  )
}

export default HotList
