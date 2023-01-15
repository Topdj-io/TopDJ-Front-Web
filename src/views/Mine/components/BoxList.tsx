import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import clsx from 'clsx'
import { BlindBoxDetailType } from 'types/blindBox'
import RoutePath from 'routes/routePath'
import BoxListItem from './BoxListItem'
import Empty from './Empty'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px 0 150px',
  },
  button: {
    color: theme.palette.text.primary,
    width: 230,
    display: 'block',
    border: `1px solid ${theme.palette.divider}`,
    margin: '0 auto 30px',
    '&:hover': {
      background: 'transparent',
      borderColor: theme.palette.text.primary,
    },
  },
}))
interface PropsType {
  hidden?: boolean
  data?: BlindBoxDetailType[]
  onRefresh: () => void
}
const BoxList: React.FC<PropsType> = ({ hidden, data, onRefresh }) => {
  const [selectedValue, setSelectedValue] = useState(0)
  const classes = useStyles()
  return (
    <div hidden={hidden} className={classes.container}>
      {data && data.length === 0 ? (
        <Empty
          actionText="Get Started with a Pack"
          hintText="Think you've got game? Start collecting Moment™ Collectibles and show us what ya got."
          url={RoutePath.MYSTERY_BOX}
        />
      ) : (
        <>
          {data && data.length > 0 && (
            <Button variant="outlined" className={classes.button}>
              open all
            </Button>
          )}
          <Grid container spacing={2}>
            {(data || new Array(4).fill('')).map((item, index) => {
              return (
                <Grid item key={item.id || index} xs={6} md={3}>
                  <BoxListItem data={item} onRefresh={onRefresh} />
                </Grid>
              )
            })}
          </Grid>
        </>
      )}
    </div>
  )
}

export default BoxList
