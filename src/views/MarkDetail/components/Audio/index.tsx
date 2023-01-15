import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Icon } from '@mui/material'
import clsx from 'clsx'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import DragArc from './dragArc'

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '50%',
    position: 'relative',
    display: 'inline-block',
  },
  audioCanvas: {
    position: 'relative',
    paddingTop: '100%',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  poster: {
    position: 'absolute',
    borderRadius: '50%',
    zIndex: -1,
    width: '86%',
    top: '7%',
    left: '7%',
    paddingTop: '86%',
    background: ({ poster }: { poster: string }) => `url(${poster}) no-repeat center center`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    animation: '$rotate 30s linear infinite normal',
    animationPlayState: 'paused',
  },
  posterRotate: {
    animationPlayState: 'running',
  },
  audio: {
    display: 'none',
    position: 'absolute',
  },
  time: {
    position: 'absolute',
    bottom: '16%',
    width: 42,
    textAlign: 'center',
  },
  curTime: {
    left: '8%',
  },
  durationTime: {
    right: '8%',
  },
  playIcon: {
    height: 64,
    width: 64,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 2,
    cursor: 'pointer',
  },
  toolBar: {
    padding: '0 60px',
  },
  toolBarIcon: {
    fontSize: 24,
    cursor: 'pointer',
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
}))

interface AudioPropsType {
  src: string
  poster: string
  className?: string
}

const Audio = ({ src, poster, className }: AudioPropsType) => {
  const audioRef: any = useRef()
  const dragArcRef: any = useRef()
  const dragArcInstance: any = useRef()
  const animationFrameId: any = useRef()
  const [duration, setDuration] = useState(0)
  const [curTime, setCurTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(false)
  const classes = useStyles({ poster })
  const formatTime = (nums: number) => {
    if (!nums) {
      return '00:00'
    } else {
      const minutes = Math.floor(nums / 60)
      const seconds = Math.floor(nums % 60)
      return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
    }
  }
  const handleMouseUp = (e) => {
    audioRef.current.seekTo((duration * dragArcInstance.current.value) / 100)
    setPlaying(true)
  }
  useEffect(() => {
    if (duration) {
      dragArcInstance.current = new DragArc({
        el: dragArcRef.current,
        value: 0,
        startDeg: 0.8,
        endDeg: 2.2,
        counterclockwise: false,
        outLineWidth: 4,
        slider: 10,
        textShow: false,
        color: ['#00FF99', '#00FF99'],
        outColor: '#1E1E21',
        change: (v) => {
          setPlaying(false)
          setCurTime((v / 100) * duration)
        },
        mouseUp: handleMouseUp,
      })
    }
  }, [duration])

  useEffect(() => {
    dragArcInstance.current?.draw((curTime / duration) * 100 || 0)
  }, [curTime])

  const repeatAnimation = () => {
    animationFrameId.current = requestAnimationFrame(() => {
      setCurTime(audioRef.current?.getCurrentTime())
      repeatAnimation()
    })
  }

  useEffect(() => {
    if (playing) {
      repeatAnimation()
    } else {
      window.cancelAnimationFrame(animationFrameId.current)
    }
    return () => window.cancelAnimationFrame(animationFrameId.current)
  }, [playing])

  return (
    <div className={clsx(classes.container, className)}>
      <div ref={dragArcRef} className={classes.audioCanvas}>
        <div className={clsx(classes.poster, { [classes.posterRotate]: playing })} />
        <img
          src={playing ? '/images/common/pause.svg' : '/images/common/play.svg'}
          className={classes.playIcon}
          onClick={(e) => {
            setPlaying(!playing)
          }}
          alt=""
        />
        <div className={clsx(classes.curTime, classes.time)}>{formatTime(curTime)}</div>
        <div className={clsx(classes.durationTime, classes.time)}>{formatTime(duration)}</div>
        <ReactPlayer
          controls
          url={src}
          playing={playing}
          muted={muted}
          loop={loop}
          onEnded={() => {
            setPlaying(false)
            dragArcInstance.current?.draw(100)
          }}
          onDuration={(e) => {
            setDuration(e)
          }}
          ref={audioRef}
          autoPlay
          className={classes.audio}
        />
      </div>
      <Grid container className={classes.toolBar} alignItems="center">
        <Grid item xs>
          <Icon
            className={clsx(classes.toolBarIcon, { active: muted })}
            onClick={() => {
              setMuted(!muted)
            }}
            baseClassName="iconfont dj-mute"
          />
        </Grid>
        <Grid item xs>
          <Icon
            className={clsx(classes.toolBarIcon, { active: loop })}
            onClick={() => {
              setLoop(!loop)
            }}
            baseClassName="iconfont dj-loop"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Audio
