import React from 'react'
import { makeStyles } from '@mui/styles'
import PartHeader from 'components/PartHeader'
import Skeleton from 'components/Skeleton'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 110,
  },
  contentTitle: {
    fontSize: 24,
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: 20,
  },
  contentText: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    lineHeight: 1.5,
  },
}))
const Introduction = ({ introduction }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <PartHeader title="Mystery Box Details" />
      <div className={clsx(classes.contentText, 'rich-text')}>
        {introduction ? (
          <div
            dangerouslySetInnerHTML={{
              __html: introduction,
            }}
          />
        ) : (
          <>
            <Skeleton rows={4} />
            <Skeleton width="80%" />
            <Skeleton width="50%" />
          </>
        )}
      </div>
    </div>
  )
}

export default Introduction
