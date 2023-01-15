import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Icon, Button } from '@mui/material'
import Container from 'components/Layout/Container'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LoadedImage from 'components/Image/loadedImage'
import ComingSoonText from 'components/ComingSoonText'
import PageLoading from 'components/Pageloading'
import Background from './components/Background'

const useStyles = makeStyles(({ palette }) => ({
  container: {
    position: 'relative',
  },
  card: {
    position: 'relative',
    width: 436,
    margin: '100px auto',
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: 'text-bold',
    marginBottom: 30,
  },
  bridgeList: {
    background: '#121214',
    padding: 30,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 600,
    '& img': {
      height: 60,
      width: 60,
      marginBottom: 12,
    },
  },
  arrow: {
    color: palette.primary.main,
    fontSize: 40,
    fontWeight: 500,
  },
  tokenList: {
    padding: '10px 20px',
    background: '#121214',
    marginBottom: 10,
    '& img': {
      height: 48,
      width: 48,
      marginRight: 10,
    },
  },
  downArrow: {
    marginLeft: 10,
  },
  fee: {
    background: '#000000',
    padding: '24px 20px',
    marginBottom: 25,
  },
}))
const Bridge = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  return (
    <div className={classes.container}>
      {loading && <PageLoading />}
      <Container>
        <div className={classes.card} hidden={loading}>
          <ComingSoonText top={200} />
          <Background />
          <LoadedImage
            src="/images/overview/bridge.png"
            onLoad={() => {
              setLoading(false)
            }}
            alt=""
          />
        </div>
      </Container>
    </div>
  )
}

export default Bridge
