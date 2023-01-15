import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { WorkDetailType } from 'types/work'
import { queryRecommendWorkList } from 'services/work'
import WorkItem from 'widget/Nft/WorkItem'
import Swiper from 'components/Swiper'
import clsx from 'clsx'
import Title from './Title'
import PartContainer from './PartContainer'
import MoreBtn from './MoreBtn'

const useStyles = makeStyles((theme) => ({
  container: {},
}))
const NftWorks = () => {
  const classes = useStyles()
  const [recommandWorkList, setRecommandWorkList] = useState<WorkDetailType[]>([])
  const getRecommendWorkList = async () => {
    const data = await queryRecommendWorkList({ num: 4 })
    setRecommandWorkList(data.data||[])
  }
  useEffect(() => {
    getRecommendWorkList()
  }, [])
  return (
    <PartContainer title="NFT works">
      {/* <Title width={624}>Makes you closer to the Top Djs</Title>
      <img
        src="/images/overview/nftListHome.png"
        className="animate__animated animate__fadeInUp animate__delay-1s"
        alt=""
      /> */}
      {/* <Swiper */}
      <Title width={624}>Makes you closer to the Top Djs</Title>
      <Swiper
        data={recommandWorkList.map((item, index) => ({
          ...item,
          children: (
            <div className={clsx('animate__animated animate__fadeInUp', `animate__delay-${index + 1}s`)}>
              <WorkItem data={item} showRarityTag />
            </div>
          ),
        }))}
        loop
        autoplay
        spaceBetween={20}
        navigation
        slidesPerView={4}
      />
    </PartContainer>
  )
}

export default NftWorks
