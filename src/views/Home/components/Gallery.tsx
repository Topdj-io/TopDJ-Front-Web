import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import AuthorItem from 'widget/Gallery/AuthorItem'
import { queryAuthorHotList } from 'services/author'
import { AuthorDetailType } from 'types/author'
import Swiper from 'components/Swiper'
import clsx from 'clsx'
import RoutePath from 'routes/routePath'
import Title from './Title'
import PartContainer from './PartContainer'
import MoreBtn from './MoreBtn'

const useStyles = makeStyles((theme) => ({
  container: {},
}))
const HotList = () => {
  const [data, setData] = useState<AuthorDetailType[]>(new Array(5).fill(''))
  const classes = useStyles()

  const getAuthorList = async () => {
    const res = await queryAuthorHotList({ num: 10000 })
    setData(res.data)
  }
  useEffect(() => {
    getAuthorList()
  }, [])
  return (
    <PartContainer title="Gallery">
      <Title>Metaverse Top DJs</Title>
      <Swiper
        // loop
        autoplay
        spaceBetween={20}
        padding={18}
        centerInsufficientSlides
        navigation
        slidesPerView={5}
        data={data.map((item, index) => ({
          ...item,
          children: (
            <div className={clsx('animate__animated animate__fadeInUp', `animate__delay-${index + 1}s`)}>
              <AuthorItem animate data={item} border />
            </div>
          ),
        }))}
      />
      <MoreBtn url={RoutePath.GALLERY} className="animate__delay-6s">
        To view more
      </MoreBtn>
    </PartContainer>
  )
}

export default HotList
