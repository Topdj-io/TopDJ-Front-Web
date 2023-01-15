import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { makeStyles } from '@mui/styles'
import { CircularProgress } from '@mui/material'

const useStyles = makeStyles(({ palette }) => ({
  container: {
    textAlign: 'center',
    color: palette.text.fourth,
  },
  loadText: {
    borderBottom: `1px solid ${palette.text.primary}`,
    cursor: 'pointer',
    color: palette.text.primary,
  },
  noMore: {
    color: palette.text.primary,
  },
}))

type StatusType = 'more' | 'loading' | 'noMore' | 'hide'
interface LoadMorePropsType {
  pageNum?: number
  load: (page: number) => Promise<number>
}
const LoadMore = forwardRef(({ pageNum = 10, load }: LoadMorePropsType, ref) => {
  useImperativeHandle(ref, () => ({
    reset() {
      setPage(1)
      setStatus('loading')
      handleLoadMore(1, 'more')
    },
  }))
  const classes = useStyles()
  const [status, setStatus] = useState<StatusType>('loading')
  const [page, setPage] = useState(1)
  const handleLoadMore = async (curPage: number, curStatus = status) => {
    if (curStatus === 'noMore') {
      return
    }
    setStatus('loading')
    const total = await load(curPage)
    setPage(curPage + 1)
    if (total > curPage * pageNum) {
      setStatus('more')
    } else if (total === 0) {
      setStatus('hide')
    } else {
      setStatus('noMore')
    }
  }
  useEffect(() => {
    handleLoadMore(page)
  }, [])
  return (
    <div
      className={classes.container}
      onClick={() => {
        handleLoadMore(page)
      }}
    >
      {status === 'loading' && <CircularProgress size={30} color="inherit" />}
      {status === 'more' && <span className={classes.loadText}>LoadMore</span>}
      {status === 'noMore' && <span className={classes.noMore}>NoMore</span>}
    </div>
  )
})

export default LoadMore
