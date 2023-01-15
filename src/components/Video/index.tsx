import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { CircularProgress } from '@mui/material'
import { Player, BigPlayButton } from 'video-react'
// https://github.com/sampotts/plyr

const useStyles = makeStyles((theme) => ({
  container: {},
  playBtn: {
    display: 'none !important',
  },
  loading: {
    color: '#333',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 10,
  },
}))

interface VideoPropsType {
  [key: string]: any
}
const Video: React.FC<VideoPropsType> = ({ children, ...rest }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  return (
    <Player
      {...rest}
      onCanPlay={() => {
        setLoading(false)
      }}
    >
      {children}
      {loading && (
        <div className={classes.loading}>
          <CircularProgress color="inherit" disableShrink size={48} />
        </div>
      )}
      <BigPlayButton position="center" className={classes.playBtn} />
    </Player>
  )
}

export default Video
