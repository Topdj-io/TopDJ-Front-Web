import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import clsx from 'clsx'
import PartContainer from './PartContainer'

const useStyles = makeStyles((theme) => ({
  container: {},
  videoContainer: {
    flex: '0 0 800px',
    maxWidth: '100%',
    height: 720,
    '& video': {
      width: '100%',
    },
  },
  listItem: {
    marginTop: 20,
    fontFamily: 'italics-title',
    textTransform: 'uppercase',
    fontSize: 60,
    color: theme.palette.text.fourth,
    cursor: 'pointer',
    '&.active': {
      color: theme.palette.text.primary,
    },
  },
}))
const STATIC_URL = process.env.REACT_APP_STATIC_RESOURCE_URL
const videoList = [
  {
    src: `${STATIC_URL}/pinkpanda.mp4`,
    name: 'Pinkpanda',
  },
  {
    src: `${STATIC_URL}/yves.mp4`,
    name: 'YVES',
  },
  {
    src: `${STATIC_URL}/kura.mp4`,
    name: 'kura',
  },
]
const VideoPart = () => {
  const [selectedItem, setSelectedItem] = useState(videoList[0])
  const classes = useStyles()

  return (
    <PartContainer title="Video">
      <Grid spacing={6} container>
        <Grid item className={clsx(classes.videoContainer, 'animate__animated')}>
          <video autoPlay src={selectedItem.src} muted loop />
        </Grid>
        <Grid item xs container flexDirection="column" flexWrap="initial">
          <Grid item xs>
            {videoList.map((item, index) => (
              <div
                key={item.name}
                onClick={() => setSelectedItem(item)}
                className={clsx(classes.listItem, 'animate__animated', `animate__delay-${index + 1}s`, {
                  active: selectedItem.name === item.name,
                })}
              >
                {item.name} -
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </PartContainer>
  )
}

export default VideoPart
