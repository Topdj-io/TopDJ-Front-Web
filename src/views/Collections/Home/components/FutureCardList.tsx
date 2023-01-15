import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 100,
  },
  moreCard: {
    border: `2px solid ${theme.palette.divider}`,
    padding: 20,
    height: '100%',
    textAlign: 'center',
    cursor: 'pointer',
  },
  imgContainer: {
    width: '100%',
    height: '214px',
    background: 'url(/images/collections/futureBoxCardBg.png) no-repeat center center',
    backgroundSize: 'cover',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 84,
    '& img': {
      width: 68,
    },
  },
  moreText: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 1.2,
    margin: '30px 0 20px',
    color: '#808080',
    textAlign: 'left',
  },
}))

const CardList: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {new Array(4).fill('').map((item, index) => {
          return (
            <Grid item xs={6} md={3} key={index}>
              <div className={classes.moreCard}>
                <div className={classes.imgContainer} />
                <div className={classes.moreText}>Upcoming, stay tuned</div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default CardList
