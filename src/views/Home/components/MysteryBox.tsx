import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import { BlindBoxDetailTypeTop } from 'types/blindBoxTop'
import useRefresh from 'hooks/useRefresh'
import { queryHomeBlindBoxInfo,queryHomeBlindBoxInfoCount } from 'services/blindBox'
import clsx from 'clsx'
import { MYSTERY_BOX_ID } from 'config/constants'
import Skeleton from 'components/Skeleton'
import { BLINDBOX_LOADING_URL } from 'config/constants/preloadResource'
import history from 'routerHistory'
import RoutePath from 'routes/routePath'
import PartContainer from './PartContainer'
import Title from './Title'

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
  },
  img: {
    width: '80%',
    display: 'block',
    margin: '0 auto',
  },
  imgContainer: {
    flex: '0 0 780px',
    maxWidth: '100%',
    height: 620,
  },
  imgBg: {
    position: 'relative',
    height: '100%',
    '&:after': {
      content: '""',
      width: '100%',
      height: 50,
      bottom: -50,
      left: 0,
      position: 'absolute',
      background: 'url(/images/blindBox/boxBg.png) no-repeat center bottom',
      backgroundSize: 'cover',
      zIndex: -1,
    },
  },
  imgBgCover: {
    width: '100%',
    height: '100%',
  },
  imgBgLoading: {
    position: 'absolute',
    zIndex: 1,
  },
  partTitle: {
    fontFamily: 'text-bold',
    fontSize: 40,
    fontWeight: 600,
    lineHeight: '58px',
    color: theme.palette.text.third,
    marginBottom: 6,
  },
  description: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  buyButton: {
    marginTop: 150,
  },
}))
const MysteryBox = () => {
  const classes = useStyles()
  const { fastRefresh } = useRefresh()
  const [detailData, setDetailData] = useState<BlindBoxDetailTypeTop>({})
  const getBoxDetail = async () => {
    const data: any = await queryHomeBlindBoxInfo({ num: 4 })
    setDetailData(data?.data||{})
  }
  const getBoxDetailCont = async () => {
    const data: BlindBoxDetailTypeTop = await queryHomeBlindBoxInfoCount({ id: detailData?.box.id})
    
  }
  useEffect(() => {
    getBoxDetail();
  }, [])
  // 刷新数量
  useEffect(() => {
    if(detailData?.box?.id){
      getBoxDetailCont()
    }
  }, [fastRefresh])
  return (
    <PartContainer title="Mystery Box">
      <Title width={650} className="animate__animated animate__fadeInUp">
        Mystery Box
      </Title>
      <Grid spacing={6} container>
        <Grid
          item
          md={12}
          xl
          lg
          xs={12}
          sm={12}
          className={clsx(classes.imgContainer, 'animate__animated animate__delay-1s')}
        >
          {detailData?.box?.id ? (
            <div className={classes.imgBg}>
              <img src={detailData?.box?.cover} className={classes.imgBgLoading} alt="" />
              <img src={detailData?.box?.background} className={classes.imgBgCover} alt="" />
            </div>
          ) : (
            <Skeleton height="100%" variant="rectangular" />
          )}
        </Grid>
        {detailData?.box?.id ? (
          <Grid item xs container flexDirection="column" flexWrap="initial">
            <Grid item xs>
              <div className={clsx(classes.partTitle, 'animate__animated animate__delay-2s')}>{detailData.box.title}</div>
              <div className={clsx(classes.description, 'animate__animated animate__delay-3s')}>
                {detailData?.box?.sub_title}
              </div>
              
            </Grid>
            <Grid>
            <Button
                size="large"
                className={clsx(classes.buyButton, 'animate__animated animate__delay-4s')}
                fullWidth
                variant="contained"
                onClick={() => {
                  history.push(RoutePath.MYSTERY_BOX)
                }}
              >
                BUY
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs container flexDirection="column" flexWrap="initial">
            <Grid item xs>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Grid>
          </Grid>
        )}
      </Grid>
    </PartContainer>
  )
}

export default MysteryBox
