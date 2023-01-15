import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ComingSoonText from 'components/ComingSoonText'
import { makeStyles } from '@mui/styles'
import LoadedImage from 'components/Image/loadedImage'
import PageLoading from 'components/Pageloading'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  img: {
    width: '100%',
    marginTop: 100,
  },
}))
const routeConfig = {
  '/marketplace': {
    img: '/images/test/marketplace.jpg',
    phoneImg: '/images/test/marketplacePh.jpg',
  },
  '/mysteryBox': {
    img: '/images/test/mysteryBox.jpg',
    phoneImg: '/images/test/mysteryBoxPh.jpg',
  },
  '/collections': {
    img: '/images/test/collections.jpg',
    phoneImg: '/images/test/collectionsPh.jpg',
  },
}
const MysteryBox = () => {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const imgUrl = useMemo(() => {
    const windowWidth = document.documentElement.clientWidth
    if (windowWidth < 768) {
      return routeConfig[pathname]?.phoneImg
    } else {
      return routeConfig[pathname]?.img
    }
  }, [pathname])

  return (
    <div className={classes.container}>
      {loading && <PageLoading />}
      <ComingSoonText top={300} hidden={loading} />
      <LoadedImage
        onClick={() => {
          setVisible(!visible)
        }}
        hidden={loading}
        className={classes.img}
        src={imgUrl}
        onLoad={() => {
          setLoading(false)
        }}
        alt=""
      />
    </div>
  )
}

export default MysteryBox
