import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import Image from 'components/Image'
import CountDown from '../../views/Collections/Home/components/CountDown'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 60,
  },
  banner: {
    position: 'relative',
    background: theme.palette.background.default,
    padding: '30px 50px',
    // height: 375,
  },
  bannerBg: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    zIndex: 0,
    overflow: 'hidden',
  },
  boxImgContainer: {
    width: 420,
    height: 325,
    position: 'relative',
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
    width: '80%',
    marginBottom: 10,
    textAlign: 'right',
  },
  description: {
    marginBottom: 20,
    lineHeight: 1.5,
    fontSize: 16,
    textAlign: 'right',
  },
  exchangeBtn: {
    width: 450,
    maxWidth: '100%',
    display: 'block',
    marginTop: 15,
    background: '#fff',
    color: '#000',
    '&:hover': {
      background: '#fff',
    },
  },
}))
const FutureCollection = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <div className={classes.bannerBg}>
          <Image src="/images/collections/collectionsBg.jpg" aspectRatio={3.47} alt="" />
        </div>
        <Grid container spacing={10} className={classes.contentContainer}>
          <Grid item>
            <div className={classes.boxImgContainer}>
              <Image src="/images/collections/futureBox.png" className={classes.boxImg} aspectRatio={1.29} alt="" />
            </div>
          </Grid>
          <Grid item container flexDirection="column" alignItems="flex-end" xs justifyContent="space-between">
            <Grid item container alignItems="flex-end" flexDirection="column">
              <div className={classes.title}>Coming Achievement</div>
              <div className={classes.description}>
                Vote for your favorite DJ to become the reward of next achievement
              </div>
            </Grid>
            <Grid item container alignItems="flex-end" flexDirection="column">
              <CountDown />
              <Button variant="contained" size="large" disableTouchRipple className={classes.exchangeBtn}>
                Not available for purchase
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default FutureCollection
