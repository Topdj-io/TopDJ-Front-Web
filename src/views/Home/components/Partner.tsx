import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import clsx from 'clsx'
import Title from './Title'
import PartContainer from './PartContainer'

const useStyles = makeStyles((theme) => ({
  container: {},
  partnerImg: {
    width: 120,
    borderRadius: '50%',
  },
  list: {
    '&:not(:last-child)': {
      marginBottom: 80,
    },
  },
}))
const Partner = () => {
  const classes = useStyles()
  const renderList = (length: number, beginIndex: number) => {
    return (
      <Grid container rowSpacing={8} className={classes.list} columnSpacing={12} justifyContent="center">
        {new Array(length).fill('').map((item, index) => (
          <Grid item key={index} xs={2}>
            <img
              className={clsx(classes.partnerImg, 'animate__animated', `animate__delay-${(index + 1) % 6 || 6}s`)}
              src={`/images/home/partner${index + beginIndex}.png`}
              alt=""
            />
          </Grid>
        ))}
      </Grid>
    )
  }
  return (
    <PartContainer title="Partners">
      <Title>Our Partners</Title>
      {renderList(4, 0)}
      {renderList(3, 4)}
      {renderList(4, 7)}
    </PartContainer>
  )
}

export default Partner
