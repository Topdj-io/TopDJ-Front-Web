import React, { useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import WorkItem from 'widget/Collections/WorkItem'
import history from 'routerHistory'
import RoutePath from 'routes/routePath'
import { WorkDetailType } from 'types/work'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 140,
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
    background: 'url(/images/collections/moreBg.jpg) no-repeat center center',
    backgroundSize: 'cover',
    color: theme.palette.text.third,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'number',
      marginBottom: 10,
    },
    '& span': {
      fontSize: 24,
    },
  },
  moreText: {
    fontSize: 34,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginTop: 50,
  },
}))

interface CardListPropsType {
  data?: WorkDetailType[]
  id?: number
}
const CardList = ({ data, id }: CardListPropsType) => {
  const classes = useStyles()
  const goToDetail = () => {
    history.push(`${RoutePath.COLLECTIONS_DETAIL}?id=${id}`)
  }
  const dataArr =data?.filter((item,index) => {
    return index < 3 ;
});
  const total = data?.length
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {(dataArr || new Array(3).fill('')).map((item, index) => {
          return (
            <Grid item xs={6} md={3} key={item.id || index}>
              <WorkItem typeS='3' data={item} />
            </Grid>
          )
        })}
        <Grid item xs={6} md={3} onClick={goToDetail}>
          <div className={classes.moreCard}>
            <div className={classes.imgContainer}>
              <p>+{total && total - 3 > 0 ? total - 3 : 0}</p>
              <span>Look at All</span>
            </div>
            <div className={classes.moreText}>To view more</div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default CardList
