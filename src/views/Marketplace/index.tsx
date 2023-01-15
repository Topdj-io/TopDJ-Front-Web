import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button,CircularProgress } from '@mui/material'
import { WorkType } from 'types/marketplace'
import Container from 'components/Layout/Container'
import clsx from 'clsx'
import PalaceCard from './components/PalaceCard'
import SearchList from './components/SearchList'

const useStyles = makeStyles((theme) => ({
  container: {
    '& img': {
    },
  },
  title: {
    fontSize:14,
    fontFamily:'600',
    lineHeight:'40px',
    marginBottom:30,
  },
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '80px 0 14px',
  },
  
  button: {
    color: theme.palette.text.third,
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: 30,
    '&.active': {
      borderColor: theme.palette.text.primary,
    },
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
  },
  
}))
const buttonList = [
  {
    label: 'All',
    type:0,
    key: 0,
  },
  {
    label: 'Video',
    type:4,
    key: WorkType.VIDEO,
  },
]
const Marketplace = () => {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState('')
  const [selectedValue, setSelectedValue] = useState<number>(0)
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.pageTitle}>MARKETPLACE</div>
        {/* <Grid container spacing={1}>
          {buttonList.map((item) => (
            <Grid item key={item.label}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setSelectedValue(item.type)
                }}
                className={clsx(classes.button, { active: selectedValue === item.key })}
              >
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid> */}
        <div className={classes.title}>HOT MOMENTS</div>
        <PalaceCard />
        <SearchList />
      </Container>
    </div>
  )
}

export default Marketplace
