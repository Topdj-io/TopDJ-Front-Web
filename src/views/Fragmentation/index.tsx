import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Typography, Button, Tabs, Tab } from '@mui/material'
import Container from 'components/Layout/Container'
import Image from 'components/Image'
import ComingSoonText from 'components/ComingSoonText'
import LoadedImage from 'components/Image/loadedImage'
import PageLoading from 'components/Pageloading'
import Background from './components/Background'

const useStyles = makeStyles(({ palette, shape }) => ({
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
  tab: {
    padding: '10px 20px 15px',
    background: '#121214',
    marginBottom: 20,
  },
  tabItem: {
    minWidth: 'auto',
    padding: 0,
    minHeight: 36,
    marginRight: 50,
  },
  hintText: {
    color: palette.text.secondary,
    fontSize: 12,
    marginBottom: 20,
  },
  tokenList: {
    marginBottom: 20,
  },
  tokenListItem: {
    background: '#000000',
    padding: '12px 20px',
    borderRadius: shape.borderRadius,
    '& img': {
      height: 64,
      width: 64,
      marginRight: 15,
    },
  },
  fee: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
  },
}))
const Fragmentation = () => {
  const classes = useStyles()
  const [tabValue, setRabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  return (
    <div className={classes.container}>
      {loading && <PageLoading />}
      <Container>
        <div className={classes.card} hidden={loading}>
          <ComingSoonText top={200} />
          <Background />
          <LoadedImage
            onLoad={() => {
              setLoading(false)
            }}
            src="/images/overview/fragmentation.png"
            alt=""
          />
        </div>
      </Container>
    </div>
  )
}

export default Fragmentation
