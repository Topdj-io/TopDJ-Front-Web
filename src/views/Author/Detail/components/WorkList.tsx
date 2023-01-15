import React, { useState, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import clsx from 'clsx'
import WorkItem from 'widget/Nft/WorkItem'
import { WorkDetailType, WorkType } from 'types/work'
import Empty from './Empty'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px 0 150px',
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
    key: 0,
  },
  {
    label: 'Video',
    key: WorkType.VIDEO,
  },
  {
    label: 'Audio',
    key: WorkType.AUDIO,
  },
  {
    label: 'Figure',
    key: WorkType.PICTURE,
  },
]
interface WorkListPropsType {
  hidden?: boolean
  data: WorkDetailType[]
}

const WorkList: React.FC<WorkListPropsType> = ({ hidden, data }) => {
  const [selectedValue, setSelectedValue] = useState<WorkType | number>(0)
  const classes = useStyles()
  // You don't have any NFT
  const getHintText =()=>{
    const text = buttonList.filter((item,index)=>{
      return selectedValue === item.key;
    })
    return `You don't have any ${text[0].label}`
    // selectedValue
  }
  const filterData = useMemo(() => {
    return data && selectedValue ? data.filter((item) => item.type === selectedValue) : data
  }, [selectedValue, data])
  return (
    <div hidden={hidden} className={classes.container}>
      <Grid container spacing={1}>
        {buttonList.map((item) => (
          <Grid item key={item.key}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setSelectedValue(item.key)
              }}
              className={clsx(classes.button, { active: selectedValue === item.key })}
            >
              {item.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      {/* <Empty
        actionText="Go and see"
        hintText="DJ has not released his collection yet, so please be patient and check out the other bags"
        url="/#/test"
      /> */}
      {filterData.length!==0?(<Grid container spacing={2}>
        {(filterData || new Array(4).fill('')).map((item, index) => {
          return (
            <Grid item xs={6} md={3} key={item.id || index}>
              <WorkItem value={selectedValue} data={item} />
            </Grid>
          )
        })}
      </Grid>):(
        <Empty
          hintText={getHintText()}
        />
      )}
    </div>
  )
}

export default WorkList
