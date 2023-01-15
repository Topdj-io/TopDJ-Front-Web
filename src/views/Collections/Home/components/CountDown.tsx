import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  hintText: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    marginBottom: 10,
  },
  countdown: {
    fontSize: '20px',
    display: 'flex',
    alignItem: 'center',
    '& span': {
      background: '#fff',
      borderRadius: 2,
      textAlign: 'center',
      fontSize: 16,
      lineHeight: '50px',
      color: '#000',
      width: '50px',
      marginRight: 6,
      fontFamily: 'number',
    },
  },
  timeText: {
    display: 'flex',
    alignItem: 'center',
    '& span': {
      width: '50px',
      color: theme.palette.text.secondary,
      marginRight: 6,
      textAlign: 'center',
      fontSize: 12,
      marginTop: 6,
    },
  },
}))
interface CountDownProps {
  title?: string
}
const CountDown: React.FC<CountDownProps> = ({ title }) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.countdown}>
        {new Array(4).fill('').map((item, index) => (
          <span key={index}>?</span>
        ))}
      </div>
      <div className={classes.timeText}>
        <span>days</span>
        <span>hours</span>
        <span>minutes</span>
        <span>seconds</span>
      </div>
    </div>
  )
}

export default CountDown
