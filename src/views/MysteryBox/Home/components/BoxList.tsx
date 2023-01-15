import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Icon } from '@mui/material'
import WorkItem from 'widget/Nft/WorkItem'
import PartHeader from 'components/PartHeader'
import history from 'routerHistory'
import RoutePath from 'routes/routePath'
import { BlindBoxDetailTypeTop } from 'types/blindBoxTop'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 110,
  },
  cardItem: {
    border: `2px solid ${theme.palette.divider}`,
    padding: '20px',
    cursor: 'pointer',
    fontSize: 16,
  },
  more: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    '& .iconfont': {
      marginLeft: 5,
    },
  },
}))

interface BoxListPropsType {
  data?: BlindBoxDetailTypeTop
}

const BoxList = ({ data }: BoxListPropsType) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <PartHeader title="Mystery Box ">
        <div
          className={classes.more}
          onClick={() => {
            data?.box?.id && history.push(`${RoutePath.MYSTERY_BOX_DETAIL}?id=${data.box.id}`)
          }}
        >
          MORE
          <Icon baseClassName="iconfont dj-forward" />
        </div>
      </PartHeader>
      <Grid container spacing={2}>
        {(data?.works || new Array(4).fill('')).map((item, index) => {
          return (
            <Grid item key={item.id || index} xs={6} md={3}>
              <WorkItem data={item} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default BoxList
