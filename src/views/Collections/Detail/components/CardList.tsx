import React from 'react'
import { makeStyles } from '@mui/styles'
import { Grid } from '@mui/material'
import WorkItem from 'widget/Work/WorkItem'
import { WorkDetailType } from 'types/work'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 140,
  },
}))
interface CardListPropsType {
  data?: WorkDetailType[]
}
const CardList = ({ data }: CardListPropsType) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        {(data || new Array(10).fill('')).map((item, index) => {
          return (
            <Grid item xs={6} md={3} key={item.id || index}>
              <WorkItem reverse={!item.hold} data={item} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default CardList
