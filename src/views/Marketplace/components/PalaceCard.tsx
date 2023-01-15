import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { WorkDetailType } from 'types/marknft'
import WorkItem from 'widget/Marketplace/WorkItem'
import { pagination } from 'services/markNft'
import Swiper from 'components/Swiper'
import clsx from 'clsx'
import PartContainer from './PartContainer'
import MoreBtn from './MoreBtn'

const useStyles = makeStyles((theme) => ({
  container: {},
  containerText:{
    textAlign:'center',
  },
  flexBox:{
    display:'flex',
    '& .animate__animated_inBlock':{
      display:'inline-block',
      width:'20%',
      marginRight:'20px'
    }
  },
  
}))
const NftWorks = () => {
  const classes = useStyles()
  const [recommandWorkList, setRecommandWorkList] = useState<WorkDetailType[]>([])
  const [pagpage,setPagpage] = useState(1);
  const [pagsize,setPagsize] = useState(5);
  const [pagkeyword,setPagkeyword] = useState('');
  const [pagorder,setPagorder] = useState('price asc');
  const getRecommendWorkList = async () => {
    const data = await pagination({ keyword: pagkeyword,order:pagorder,page:pagpage,size:pagsize})
    setRecommandWorkList(data.data.list||[])
  }
  useEffect(() => {
    getRecommendWorkList()
  }, [])
  return recommandWorkList.length>0?(
    <div>
      {recommandWorkList.length>3&&(<Swiper
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
      />)}
      {recommandWorkList.length<=3&&(
         <div className={classes.flexBox}>
          {recommandWorkList.map((item, index) => (
            <div className={clsx('animate__animated animate__fadeInUp', `animate__delay-${index + 1}s animate__animated_inBlock`)}>
              <WorkItem data={item} showRarityTag />
            </div>
          ))}
         </div>
        
      )}
    </div>
  ):(<div className={classes.containerText}>
    There's nothing on the shelves
  </div>)}


export default NftWorks
