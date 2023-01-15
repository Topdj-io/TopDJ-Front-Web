import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Image from 'components/Image'
import history from 'routerHistory'
import clsx from 'clsx'
import RoutePath from 'routes/routePath'
import { WorkDetailType, WorkRarityType,WorkType } from 'types/work'
import Video from 'components/Video'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog, { DialogPropsType } from 'components/Dialog'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
 
  imgContainer: {
    cursor: 'pointer',
    width: '100%',
    marginBottom: 20,
    backgroundSize: '100% 100%',
    overflow: 'hidden',
    '& img': {
      transition: 'all linear 0.2s !important',
      width: '100%',
      height: '100%',
      '&:hover': {
        transform: 'scale(1.5)',
      },
    },
  },
  cardItemTextContent: {
    '& div:not(:last-child)': {
      marginBottom: 5,
      fontFamily: 'none',
    },
  },
  cardItemTitle: {
    fontFamily: 'text-bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 1.5,
  },
  cardItemDescription: {
    color: theme.palette.text.secondary,
    height: 42,
    overflow: 'hidden',
    lineHeight: '21px',
  },
  cardItemSeries: {
    fontSize: 12,
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
  cardItemDegree: {
    display: 'flex',
    alignItem: 'center',
    '& img': {
      width: 15,
      marginRight: 10,
    },
  },
  rarityTag: {
    position: 'absolute',
    height: 62,
    width: 62,
    zIndex: 1,
    left: 20,
    top: 20,
  },
  video:{
    width: '720px!important',
    height:'560px!important',
    marginRight:'auto',
  },
  dialogBox:{
    '& .MuiPaper-root':{
      '& .makeStyles-title-63':{
        padding:0,
        borderBottom:0,
        fontSize:0,
        zIndex:100
      },
    }
},
  close:{
    position: 'absolute',
    right: '30px',
    top: '20px',
    zIndex: '10000',
    color: '#fff',
    cursor:'pointer',
  }
}))

interface WorkItemProps extends DialogPropsType{
  datas?: WorkDetailType
  onClose?:()=>void
}
const VideoBox = ({ datas,onClose,...rest }: WorkItemProps) => {
  const classes = useStyles({})
  const handleClose = ()=>{
    onClose?.()
  }
  return (
    <Dialog  className={classes.dialogBox}  {...rest} onClose={handleClose} maxWidth="sm" fullWidth >
      <CloseIcon className={classes.close} onClick={handleClose} />
        <Video loop preload="auto" controls autoPlay className={classes.video}>
          <source src={datas?.path} />
        </Video> 
    </Dialog>
  )
}

export default VideoBox
