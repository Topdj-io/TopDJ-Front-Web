import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import LazyLoad from 'react-lazyload'
import WorkItem from 'widget/Nft/WorkItem'
import { WorkDetailType } from 'types/work'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 160,
  },
  cardItem: {
    border: `2px solid ${theme.palette.divider}`,
    padding: '20px',
    cursor: 'pointer',
    fontSize: 16,
  },
  more: {},
}))

interface BoxListPropsType {
  data?: WorkDetailType[]
}
const BoxList = ({ data }: BoxListPropsType) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {(data || new Array(8).fill('')).map((item, index) => {
          return (
            <Grid item xs={6} md={3} key={item.id || index}>
              <LazyLoad scroll height={300}>
                <WorkItem data={item} />
              </LazyLoad>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default BoxList
