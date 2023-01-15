import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Typography, CircularProgress, Button } from '@mui/material'
import Dialog, { DialogPropsType } from 'components/Dialog'
import useRefresh from 'hooks/useRefresh'
import { queryNftListByTx,getCodeAndHash,checkBlindBoxExchangeTx } from 'services/nft'
import history from 'routerHistory'
import RoutePath from 'routes/routePath'
import { BLINDBOX_LOADING_URL, BLINDBOX_SUCCESS_URL } from 'config/constants/preloadResource'
import MysteryBoxContext from '../context'

const useStyles = makeStyles((theme) => ({
  content: {},
  imgContainer: {
    background: '#0F0F10',
    position: 'relative',
    textAlign: 'center',
    // padding: '45px 0',
    '& img': {
      // width: 187,
      height: 350,
    },
  },
  loadingContent: {
    padding: '40px 0',
    textAlign: 'center',
  },
  successContent: {
    padding: '30px 20px',
    textAlign: 'center',
  },
  successText: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  whiteBtn: {
    background: '#fff',
    color: '#000',
    '&:hover': {
      background: '#fff',
    },
  },
  imgBgCover: {
    width: '480px',
    height: '350px',
  },
  imgBgload:{
    position: 'absolute',
    zIndex: 1,
    left: 'calc(50% - 240px)',
  }
}))

interface PendingDialogPropsType extends DialogPropsType {
  txId?: string,
  numId?: number,
  amount?:number|string
  codes?:number|string
  background?:string
}

const PendingDialog = ({ txId,numId,codes,amount,background, ...rest }: PendingDialogPropsType) => {
  const classes = useStyles()
  const { onSuccess } = useContext(MysteryBoxContext)
  const [type, setType] = useState('loading')
  const { fastRefresh } = useRefresh()
  const getTransactionResult = async () => {
    const res = await queryNftListByTx({ hash: txId,id:numId,num:amount })
    
    if (res.data) {
      setType('success')
      onSuccess && onSuccess()
    }
  }
  const getTransactionResultFree = async () => {
    const res = await checkBlindBoxExchangeTx({ hash: txId,code:codes,num:amount })
    if (res.data) {
      setType('success')
      onSuccess && onSuccess()
    }
  }
  useEffect(() => {
    if (rest.open && txId && type === 'loading') {
      console.log(codes,txId)
      if(codes){
        getTransactionResultFree()
      }else{
        getTransactionResult()
      }
    }
  }, [fastRefresh])
  return (
    <Dialog {...rest} maxWidth="sm" maskClosable={false} fullWidth title="Completing The Trade…">
      <div className={classes.content}>
        
        <div className={classes.imgContainer}>
        <img src={background} className={classes.imgBgCover} alt="" />
          <img className={classes.imgBgload} src={type === 'loading' ? BLINDBOX_LOADING_URL : BLINDBOX_SUCCESS_URL} alt="" />
        </div>
        {type === 'loading' && (
          <div className={classes.loadingContent}>
            <Typography color="text.third" marginBottom="10px">
              Please complete this
            </Typography>
            <Typography color="text.fourth" marginBottom="10px">
              transaction in your wallet
            </Typography>
            <CircularProgress size={30} color="primary" />
          </div>
        )}
        {type === 'success' && (
          <div className={classes.successContent}>
            <Typography className={classes.successText}>Purchase successful!</Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => {
                history.push(`${RoutePath.MINE}?tabType=nft`)
              }}
            >
              Open backpack
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  )
}

export default PendingDialog
