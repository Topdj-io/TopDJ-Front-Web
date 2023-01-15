import React, { useMemo } from 'react'
import { makeStyles, styled } from '@mui/styles'
import { LinearProgress, linearProgressClasses } from '@mui/material'
import { getBalanceNumber } from 'utils/formatBalance'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    marginRight: 30,
    fontWeight: 600,
  },
  percent: {
    '& span': {
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    display: 'flex',
    alignItems: 'center',
  },
  percentItem: {
    height: 24,
    width: 16,
    marginRight: 10,
    transform: 'skew(-20deg)',
    border: '1px solid #979797',
  },
  percentItemActive: {
    background: theme.palette.primary.main,
    border: 0,
  },
}))

interface PercentPropsType {
  value: number
}
const Percent: React.FC<PercentPropsType> = ({ value }) => {
  const newValue = useMemo(() => {
    return getBalanceNumber(value, 0)
  }, [value])
  const classes = useStyles({ value: newValue })
  return (
    <div className={classes.container}>
      <div className={classes.title}>Overall degree of collection</div>
      <div className={classes.percent}>
        {new Array(10).fill('').map((item, index) => (
          <div
            key={index}
            className={clsx(classes.percentItem, { [classes.percentItemActive]: Math.floor(value / 10) >= index + 1 })}
          />
        ))}

        <span>{newValue}%</span>
      </div>
    </div>
  )
}

export default Percent
