import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import { BlindBoxDetailType } from 'types/blindBox'
import Skeleton from 'components/Skeleton'
import Image from 'components/Image'
import { LoadingButton } from '@mui/lab'
import useToast from 'hooks/useToast'
import { openBlindBox } from 'services/blindBox'

const useStyles = makeStyles((theme) => ({
  cardItem: {
    padding: '20px',
    cursor: 'pointer',
    fontSize: 14,
    height: '100%',
  },
  imgContainer: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: 20,
  },
  cardItemTitle: {
    fontFamily: 'title',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 16,
    height: 21,
    color: theme.palette.text.third,
  },
  cardItemDescription: {
    color: '#808080',
    height: 21,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 5,
    whiteSpace: 'nowrap',
    lineHeight: '21px',
  },
  button: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.divider}`,
    fontWeight: 600,
    '&:hover': {
      borderColor: theme.palette.divider,
      background: 'transparent',
    },
    '&.Mui-disabled': {
      border: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiLoadingButton-loadingIndicator': {
      color: theme.palette.text.secondary,
    },
    '& span span': {
      background: `${theme.palette.background.default} !important`,
    },
  },
}))
interface BoxListItemPropsType {
  data?: BlindBoxDetailType
  onRefresh: () => void
}
const BoxListItem = ({ data, onRefresh }: BoxListItemPropsType) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { toastSuccess } = useToast()
  const handleOpenBlindBox = async () => {
    setLoading(true)
    try {
      await openBlindBox({ id: data.id })
      toastSuccess('Open Success')
      onRefresh()
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <div className={classes.cardItem}>
      <div className={classes.imgContainer}>
        <Image
          src={data.cover_resource.url}
          disableSpinner={false}
          loading={<Skeleton variant="rectangular" height="100%" width="100%" />}
        />
      </div>
      {data?.id ? (
        <div>
          <div className={classes.cardItemTitle}>{data.title}</div>
          <div className={classes.cardItemDescription}>{data.sub_title}</div>
          <LoadingButton
            loading={loading}
            size="small"
            onClick={handleOpenBlindBox}
            fullWidth
            variant="outlined"
            className={classes.button}
          >
            Open
          </LoadingButton>
        </div>
      ) : (
        <div>
          <Skeleton rows={2} />
        </div>
      )}
    </div>
  )
}

export default BoxListItem
