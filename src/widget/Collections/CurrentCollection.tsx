import React, { useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import Image from 'components/Image'
import CountDown from 'components/CountDown'
import { CollectionDetailType, CollectionExchangeStatusType } from 'types/collections'
import RoutePath from 'routes/routePath'
import history from 'routerHistory'
import ExchangeButton from './ExchangeButton'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 60,
  },
  banner: {
    position: 'relative',
    background: theme.palette.background.default,
    padding: '30px 50px',
  },
  bannerBg: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    overflow: 'hidden',
    zIndex: 0,
  },
  boxImgContainer: {
    width: 420,
    height: 325,
    boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
    position: 'relative',
    '&::after': {
      content: ({ status }: { status: CollectionExchangeStatusType }) =>
        status === CollectionExchangeStatusType.EXCHANGED ? '""' : '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url(/images/collections/haveObtained.png) no-repeat center center',
      backgroundSize: 'contain',
      zIndex: 1,
    },
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
  },
  boxImg: {},
  title: {
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 1.5,
    marginBottom: 10,
    textAlign: 'right',
  },
  description: {
    marginBottom: 20,
    lineHeight: 1.5,
    fontSize: 16,
    textAlign: 'right',
  },
  btn:{
    width: '450px',
    maxWidth: '100%',
    marginTop: '15px',
    fontWeight: 'bold',
  }
}))

interface CurrentCollectionPropsType {
  data?: CollectionDetailType
  showAction?: boolean
  goskip?: boolean
}
const CurrentCollection = ({ data, showAction,goskip }: CurrentCollectionPropsType) => {
  const classes = useStyles({status: data?.collect?.status})
  const btnDisabled = useMemo(() => {
    if (data && data?.collect?.status) {
      return data?.collect?.status !== CollectionExchangeStatusType.QUALIFIED
    } else {
      return true
    }
  }, [data])
        return (
          <div className={classes.container}>
            <div className={classes.banner}>
              <div className={classes.bannerBg}>
                <Image src={data?.collect?.banner} aspectRatio={3.47} alt="" />
              </div>
              <Grid container spacing={10} className={classes.contentContainer}>
                <Grid item>
                  <div
                    className={classes.boxImgContainer}
                    onClick={() => {
                      history.push(`${RoutePath.WORK_DETAIL}?id=${data.collect.id}`)
                    }}
                  >
                    <Image src={data?.reward?.cover} className={classes.boxImg} aspectRatio={1.29} alt="" />
                  </div>
                </Grid>
                <Grid item container flexDirection="column" xs justifyContent="space-between">
                  <Grid item container alignItems="flex-end" flexDirection="column">
                    <div className={classes.title}>{data?.reward?.title}</div>
                    <div className={classes.description}>{data?.reward?.sub_title}</div>
                  </Grid>
                  <Grid item container alignItems="flex-end" flexDirection="column">
                    <CountDown time={data?.collect?.end_at} />
                    {showAction && (
                      <ExchangeButton rewardImg={data?.reward?.cover} disabled={btnDisabled} id={data?.collect?.id} />
                    )}
                    {goskip && (
                      <Button
                        size="large"
                        className={classes.btn}
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          history.push(RoutePath.COLLECTIONS)
                        }}
                      >
                      To Exchange
                    </Button>
                    )}
                    
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        )
}

export default CurrentCollection
