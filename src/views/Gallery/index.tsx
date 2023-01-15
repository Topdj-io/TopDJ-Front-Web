import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from 'components/Layout/Container'
import HotList from './components/HotList'
import SearchList from './components/SearchList'

const useStyles = makeStyles((theme) => ({
  container: {},
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '80px 0',
  },
}))

const Gallery = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.pageTitle}>Metaverse Top DJs</div>
        <HotList />
        <SearchList />
      </Container>
    </div>
  )
}

export default Gallery
