import React from 'react'
import { makeStyles } from '@mui/styles'
import Skeleton from 'components/Skeleton'
import MuiImage from './MuiImage'
import { ImageProps } from './MuiImage/Image.d'

const useStyles = makeStyles((theme) => ({
  container: {},
}))
const Image = (props: ImageProps) => {
  const { aspectRatio = 4 / 3, disableSpinner = true, animationDuration = 1000 } = props
  const classes = useStyles()
  return (
    <MuiImage
      {...{
        ...props,
        animationDuration,
        // loading: <Skeleton height="100%" width="100%" variant="rectangular" />,
        disableSpinner,
        color: '#333',
        cover: true,
        aspectRatio,
      }}
    />
  )
}

export default Image
