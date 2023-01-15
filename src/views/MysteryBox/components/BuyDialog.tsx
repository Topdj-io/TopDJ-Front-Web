import React, { useState, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Typography } from '@mui/material'
import BigNumber from 'bignumber.js'
import { LoadingButton } from '@mui/lab'
import { getBalanceNumber } from 'utils/formatBalance'
import { BlindBoxDetailTypeTop,MysteryBoxType } from 'types/blindBoxTop'
import { useBuyBlindBoxTransaction,usePreSaleBuyBlindBoxTransaction } from 'hooks/useTransaction'
import useToast from 'hooks/useToast'
import { purchaseBlindBox} from 'services/blindBox'
import Dialog, { DialogPropsType } from 'components/Dialog'
import EthIcon from 'components/Icons/EthIcon'
import { BLINDBOX_LOADING_URL } from 'config/constants/preloadResource'
import {getCodeAndHash } from 'services/nft'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '0 30px 30px',
  },
  boxInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #0F0F10',
  },
  imgContainer: {
    background: '#0F0F10',
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 140px',
    justifyContent: 'center',
    position: 'relative',
  },
  imgBgCover: {
    width: '100%',
    height: 110,
  },
  imgBgLoading: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
  },
  boxInfoText: {
    flex: 1,
    margin: '0 20px',
  },
  boxInfoPrice: {
    color: theme.palette.primary.main,
    fontFamily: 'text-bold',
    fontSize:14,
  },
  boxInfoTitle: {
    fontFamily: 'text-bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: 10,
  },
  boxInfoDescription: {
    color: theme.palette.text.secondary,
    maxHeight: 42,
    overflow: 'hidden',
    lineHeight: '21px',
  },
  button: {
    fontSize: 16,
    padding: '11px 22px',
  },
  amountContainer: {
    padding: '20px 0 120px 160px',
  },
  amount: {
    fontFamily: 'number',
    fontWeight: 'bold',
  },
  totalPriceContainer: {
    marginBottom: 30,
    textAlign: 'right',
    paddingLeft: 160,
  },
  totalPrice: {
    fontFamily: 'number',
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.palette.primary.main,
    fontSize: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ethIcon: {
    marginRight: 10,
  },
}))

interface BuyDialogPropsType extends DialogPropsType {
  data?: BlindBoxDetailTypeTop
  onSuccess: (txId: string,num:number) => void
  amount: number
}
const BuyDialog = ({ data, amount, onSuccess, ...rest }: BuyDialogPropsType) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { toastError } = useToast()
  sessionStorage.setItem('buyBlindBoxTime', data?.box?.start_at);
  sessionStorage.setItem('buyBlindBox', data?.box?.contract);
  const sendTransaction = useBuyBlindBoxTransaction()
  const preSendTransaction = usePreSaleBuyBlindBoxTransaction()
  // const sendPreSaleMembershipTransaction = usePreSaleBuyBlindBoxTransaction()
  const totalPrice = useMemo(() => {
    return getBalanceNumber(amount * data.box.price, 0)
  }, [amount, data])
  const clearSess = () => {
    const buyBlindBox: string = sessionStorage.getItem('buyBlindBox')
    if (buyBlindBox) {
      sessionStorage.removeItem('buyBlindBox')
      sessionStorage.removeItem('buyBlindBoxTime');
    }
  }
  const handleBuy =  async (ids) => {
    setLoading(true)
    try {
      const res = await sendTransaction(amount, data.box.price)
      const txId = res.hash;
      setLoading(false)
      getCodeAndHash({id:ids,hash:res.hash,num:amount})
      clearSess()
      onSuccess(txId,amount)
    } catch (e: any) {
      console.log(e)
      setLoading(false)
      toastError(e.message)
    }

  }
  const handlePreSaleBuy = async (price, ids) => {
    setLoading(true)
    try {
      const signatureInfo = await purchaseBlindBox({ id:ids,num:amount })
      // new BigNumber(price)
      const res = await preSendTransaction(
        amount, 
        signatureInfo.data.price,
        signatureInfo.data.signature,
        signatureInfo.data.timestamp,
        signatureInfo.data.address,
        0,
        )
        const txId = res.hash;
        getCodeAndHash({id:ids,hash:res.hash,num:amount})
        clearSess()
        onSuccess(txId,amount)
    } catch (e: any) {
      setLoading(false)
      console.log(e?.error?.message || e.message)
      toastError(e?.error?.message || e.message)
    }
  }
  const calculatePrice =(price)=>{
    return new BigNumber(price).div(new BigNumber(10).pow(18)).toString()
  }
  return (
    <Dialog {...rest} maxWidth="sm" fullWidth title="Order of Mystery Box">
      <div className={classes.content}>
        <div className={classes.boxInfo}>
          <div className={classes.imgContainer}>
            <img src={BLINDBOX_LOADING_URL} className={classes.imgBgLoading} alt="" />
            <img src={data.box.background} className={classes.imgBgCover} alt="" />
          </div>
          <div className={classes.boxInfoText}>
            <div className={classes.boxInfoTitle}>{data.box.title}</div>
            <div className={classes.boxInfoDescription}>{data.box.sub_title}</div>
          </div>
          <div className={classes.boxInfoPrice}>{calculatePrice(data.box.price)} ETH</div>
        </div>
        <Grid container alignItems="center" className={classes.amountContainer} justifyContent="space-between">
          <Grid item>
            <Typography fontWeight="600">Amount</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.amount}>X{amount}</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="top" className={classes.totalPriceContainer} justifyContent="space-between">
          <Grid item>
            <Typography fontWeight="600">Total</Typography>
          </Grid>
          <Grid item>
            <div>
              <div className={classes.totalPrice}>
                <EthIcon className={classes.ethIcon} />
                {calculatePrice(totalPrice)} ETH
              </div>
            </div>
            <Typography color="text.fourth" fontSize="14px">
              Live exchange rate
            </Typography>
          </Grid>
        </Grid>
        <LoadingButton
          size="large"
          loading={loading}
          variant="contained"
          fullWidth
          className={classes.button}
          onClick={
            () => {
              if(data.box.type === MysteryBoxType.PUBLIC_AUCTION){
                handleBuy(data.box.id)
              }else{
                handlePreSaleBuy(data.box.price,data.box.id)
              }
            }
          }
        >
          Check out
        </LoadingButton>
      </div>
    </Dialog>
  )
}

export default BuyDialog
