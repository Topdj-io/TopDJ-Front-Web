import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import Container from 'components/Layout/Container'

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'url(/images/membership/rightBg.svg) no-repeat top center,#171719',
    backgroundSize: 'cover',
    paddingBottom: 160,
    '& img': {
      height: 'auto',
      width: '100%',
    },
  },
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '150px 0 100px',
  },
}))
const RightPart = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.pageTitle}>your exclusive rights</div>
        <Grid container rowSpacing={10} columnSpacing={3}>
          {new Array(6).fill('').map((item, index) => (
            <Grid item xs={4}>
              <img src={`/images/membership/right${index + 1}.svg`} alt="" />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default RightPart
