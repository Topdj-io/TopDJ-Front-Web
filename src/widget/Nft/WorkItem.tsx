import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import history from 'routerHistory'
import RoutePath from 'routes/routePath'
import { WorkDetailType, WorkRarityType } from 'types/work'
import Skeleton from 'components/Skeleton'

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
    '& img': {
      width: 15,
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
}))

interface WorkItemProps {
  data?: WorkDetailType
  value?:number
  showRarityTag?: boolean
  reverse?: boolean // 置灰
}
const WorkItem = ({ data, value,showRarityTag, reverse }: WorkItemProps) => {
  const classes = useStyles({ reverse })
  const goToDetail = () => {
    if(data?.id){
      history.push(`${RoutePath.WORK_DETAIL}?id=${data.id}`)
    }
  }
  return (
    <div className={classes.cardItem} onClick={goToDetail}>
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
      {data?.id ? (
        <div className={classes.cardItemTextContent}>
          <div className={classes.cardItemTitle}>{data.title}</div>
          <div className={classes.cardItemDescription}>{data.sub_title}</div>
          <div className={classes.cardItemSeries}>Series of {data.series}</div>
          <div className={classes.cardItemDegree}>
            <img src={`/images/work/rarity${data.rarity}.png`} alt="" />
            Rare degree
          </div>
        </div>
      ) : (
        <div className={classes.cardItemTextContent}>
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </div>
  )
}

export default WorkItem
