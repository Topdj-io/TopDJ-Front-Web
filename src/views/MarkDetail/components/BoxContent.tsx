import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import history from 'routerHistory'
import RoutePath from 'routes/routePath'
import {  WorkType } from 'types/work'
import { WorkDetailType } from 'types/marknft'
import Skeleton from 'components/Skeleton'
import Audio from 'views/Work/Detail/components/Audio'
import Video from 'components/Video'
import { getFileType } from 'utils/getFileType'
import { FileType } from 'config/constants/fileType'
import ImgBox from './ImgBox'
import BtnStatus from './BtnStatus'


const useStyles = makeStyles((theme) => ({
  container: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    marginBottom: 115,
    position: 'relative',
  },

  portrait: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'text-bold',
    marginBottom: 10,
    fontSize: 32,
    lineHeight: 1.2,
    color: theme.palette.text.primary,
  },
  djContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  djName: {
    cursor: 'pointer',
    fontFamily: 'text-bold',
    color: theme.palette.text.third,
    fontSize: 24,
  },
  infoContainer: {
    width: 450,
    '&>div:not(:first-child)': {
      lineHeight: 1.4,
      // marginBottom: 10,
      '&$description': {
        marginBottom: 30,
      },
    },
  },
  description: {
    fontSize: 24,
    lineHeight: 1.5,
  },
  series: {},
  price: {
    fontFamily: 'number',
    fontWeight: 600,
    fontSize: 32,
    color: theme.palette.text.primary,
    margin: '30px 0 80px',
    '& span': {
      color: theme.palette.text.secondary,
      fontSize: 16,
      verticalAlign: 'top',
      marginLeft: 2,
    },
  },
  degree: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '& img': {
      width: 15,
      height: 15,
      marginRight: 10,
    },
  },
  collectorNum: {},
  audio: {
    width: '55%',
    margin: '0 auto',
    textAlign: 'center',
  },
  img:{
    width: 720,
    height:560,
    marginRight:'auto',
  },
  video:{
    width: 720,
    height:560,
    marginRight:'auto',
  },
  btnBox:{
    position: 'absolute',
    bottom:0,
    marginBottom:0,
    width: 'calc(100% - 830px)',
  }
}))
interface BoxContentPropsType {
  data: WorkDetailType
  typeS:string
}
const BoxContent = ({ data,typeS }: BoxContentPropsType) => {
  const classes = useStyles()
  const goToAuthorDetail = (id: number) => {
    history.push(`${RoutePath.AUTHOR_DETAIL}?id=${id}`)
  }
  const audioUrl = useMemo(() => {
    if (data) {
      
      return data?.work.path
    } else {
      return ''
    }
  }, [data])
  return (
    <div className={classes.container}>
      <Grid spacing={4} container>
        <Grid item xs container alignItems="center">
          {data?.work.type === WorkType.AUDIO  &&(
            <Audio className={classes.audio} src={audioUrl} poster={data?.path} />
          )}
          {data?.work.type === WorkType.VIDEO  &&(
            // <video src={data?.path} controls className={classes.video} />
            <Video loop preload="auto" controls autoPlay className={classes.video}>
              <source src={data?.work.path} />
            </Video>
          )}
          {data?.work.type === WorkType.PICTURE  &&(
            <img className={classes.img} src={data?.work.cover} alt="" />
          )}
          {data?.work.type === WorkType.NOTE &&(
            <img className={classes.img} src={data?.work.path} alt="" />
          )}
          {data?.work.type === WorkType.TICKETS &&(
            <img className={classes.img} src={data?.work.cover} alt="" />
          )}
        </Grid>
        <Grid item xs="auto" container flexDirection="column">
          {data.id ? (
            <div className={classes.infoContainer}>
              <Grid
                container
                onClick={() => {
                  goToAuthorDetail(data.work.author?.id)
                }}
                alignItems="center"
                className={classes.djContainer}
              >
                <Grid item>
                  <img  src={data?.work.author?.avatar} className={classes.portrait} alt="" />
                </Grid>
                <Grid item marginLeft={1.2}>
                  <div className={classes.djName}>{`${data?.work.author?.first_name} ${data?.work.author?.last_name}`}</div>
                </Grid>
              </Grid>

              <div className={classes.title}>{data.work.title}</div>
              <div className={classes.description}>{data.work.sub_title}</div>
              <div className={classes.series}>Series of {data.work.series}</div>
              <div className={classes.degree}>
                <img src={`/images/work/rarity${data.work.rarity}.png`} alt="" />
                Rare degree
              </div>
              {/* <div className={classes.collectorNum}>{data?.work.collectors} collectors</div> */}
              
              <div className={classes.btnBox}>
              <BtnStatus  item={data} type={typeS}/>
              </div>
            </div>
          ) : (
            <div className={classes.infoContainer}>
              <Skeleton variant="circular" height={32} width={32} />
              <Skeleton />
              <Skeleton width="80%" />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton width="40%" />
              <Skeleton width="20%" />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default BoxContent
