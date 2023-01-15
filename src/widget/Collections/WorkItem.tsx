import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import history from 'routerHistory'
import clsx from 'clsx'
import RoutePath from 'routes/routePath'
import { WorkDetailType, WorkRarityType,WorkType } from 'types/work'
import Skeleton from 'components/Skeleton'
import Video from 'components/Video'
import VideoBox from './VideoBox'

const useStyles = makeStyles((theme) => ({
  cardItem: {
    border: `2px solid ${theme.palette.divider}`,
    padding: '20px',
    cursor: 'pointer',
    fontSize: 16,
    position: 'relative',
    filter: ({ reverse }: { reverse: boolean }) => (reverse ? 'grayscale(100%)' : 'initial'),
  },
  imgContainer: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: 20,
    backgroundSize: '100% 100%',
    overflow: 'hidden',
    '& img': {
      transition: 'all linear 0.2s !important',
      width: '100%',
      height: '100%',
      '&:hover': {
        transform: 'scale(1.5)',
      },
    },
  },
  cardItemTextContent: {
    '& div:not(:last-child)': {
      marginBottom: 5,
      fontFamily: 'none',
    },
  },
  cardItemTitle: {
    fontFamily: 'text-bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.5,
  },
  cardItemDescription: {
    color: theme.palette.text.secondary,
    height: 42,
    overflow: 'hidden',
    lineHeight: '21px',
  },
  cardItemSeries: {
    fontSize: 12,
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
  cardItemDegree: {
    display: 'flex',
    alignItem: 'center',
    lineHeight:'20px',
    '& img': {
      width: 15,
      height:15,
      marginRight: 10,
    },
  },
  rarityTag: {
    position: 'absolute',
    height: 62,
    width: 62,
    zIndex: 1,
    left: 20,
    top: 20,
  },
  video:{
    width: '720px!important',
    height:'560px!important',
    marginRight:'auto',
  },
  dialogBox:{
      
    '& .MuiPaper-root':{
      width:480,
      '& .makeStyles-title-72':{
        padding:30,
        borderBottom:0,
      },
      '& .dj-close':{
        right:30,
        top:20,
        color:'#BABABA',
      }
    }
},
opensea:{
  width:'20px!important',
  height:'20px!important',
  verticalAlign: 'top',
  cursor:'pointer',
  marginLeft: '20px',
  marginRight:'0px!important',
},
opensea1:{
  width:'20px!important',
  height:'20px!important',
  verticalAlign: 'top',
  cursor:'pointer',
  marginLeft: 'auto',
  marginRight:'0px!important',
  '&:hover':{
    filter: 'grayscale(100%) brightness(160%)',
  }
},
icon:{
  margin:'2px 0',
}
}))

interface WorkItemProps {
  data?: WorkDetailType
  value?:number
  showRarityTag?: boolean
  reverse?: boolean // 置灰
  typeS?:string
}
const WorkItem = ({ data, value,showRarityTag, reverse,typeS }: WorkItemProps) => {
  const classes = useStyles({ reverse })
  const [loading, setLoading] = useState(false)
  const [look, setLook] = useState(false)
  const active=()=>{
    if(data.have){
      return classes.cardItem
    }else{
      return ''
    }
  }
  const goToDetail = (e) => {
    if(data.type === 4){
      setLoading(true)
      setLook(true)
      return 
    }
    if(data?.work_id){
        
      history.push(`${RoutePath.WORK_DETAIL}?id=${data.work_id}&type=${typeS}`)
    }
    
  }
  const goOpensea = (e,url)=>{
    e.stopPropagation();
    window.open(url)
  }
  const downLoad = (e,filePath) => {
    e.stopPropagation();
    console.log(filePath)
    fetch(filePath).then(res => res.blob()).then(blob => {
      const a = document.createElement('a');
      document.body.appendChild(a)
      a.style.display = 'none'
      // 使用获取到的blob对象创建的url
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      // 指定下载的文件名
      a.download = '';
      a.click();
      document.body.removeChild(a)
      // 移除blob对象的url
      window.URL.revokeObjectURL(url);
    });
  }
  return (
    <div>
      <div className={!data.have?classes.cardItem:''} onClick={(e)=>{goToDetail(e)}}>
      {showRarityTag && data.rarity && (
        <img src={`/images/work/${data.rarity}.png`} className={classes.rarityTag} alt="" />
      )}
      <div className={classes.imgContainer}>
        <Image
          src={data.cover}
          disableSpinner={false}
          loading={<Skeleton variant="rectangular" width="100%" height="100%" />}
        />
      </div>
      {data?.work_id ? (
        <div className={classes.cardItemTextContent}>
          <div className={classes.cardItemTitle}>{data.title}</div>
          <div className={classes.cardItemDescription}>{data.sub_title}</div>
          <div className={classes.cardItemSeries}>Series of {data.series}</div>
          <div className={classes.cardItemDegree}>
            <img className={classes.icon} src={`/images/work/rarity${data.rarity}.png`} alt="" />
            Rare degree
            {data?.opensea&&(<img onClick={e=>downLoad(e,data?.path)}  className={classes.opensea1} src="/images/icon/download.svg" alt="" />)}
            {data?.opensea&&(<img onClick={e=>goOpensea(e,data?.opensea)}  className={classes.opensea} src="/images/opensea.svg" alt="" />)}
          </div>
        </div>
      ) : (
        <div className={classes.cardItemTextContent}>
          <Skeleton />
          <Skeleton />
        </div>
      )}
      
    </div>
    {loading&&(<VideoBox datas={data} open={look} onClose={() => {
          setLook(false)
        }} />)}
    </div>
    
  )
}

export default WorkItem
