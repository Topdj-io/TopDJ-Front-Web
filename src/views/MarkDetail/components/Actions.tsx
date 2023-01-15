import React, { useMemo, useState,useEffect } from 'react'
import useRefresh from 'hooks/useRefresh'
import { makeStyles } from '@mui/styles'
import BigNumber from 'bignumber.js'
import { Grid, Button, InputBase } from '@mui/material'
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp'
import { useAccount } from 'state/userInfo/hooks'
import { LoadingButton } from '@mui/lab'
import { WorkDetailType } from 'types/marknft'
import { check } from 'services/markNft'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import { checkBlindBoxStage} from 'services/blindBox'
import { BlindBoxDetailTypeTop,MysteryBoxType } from 'types/blindBoxTop'
import UnlockButton from 'components/UnlockButton'
import {useCreateOrder,usePurchase,useGetApproveBox,useBuyApproveBox } from 'hooks/useTransaction'
import clsx from 'clsx'
import useToast from 'hooks/useToast'
import dayjs from 'dayjs'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    
  },
  button: {
    width: '100%',
    fontSize: 16,
    padding: '11px 22px',
  },
  actionIcon: {
    background: theme.palette.background.default,
    height: 50,
    width: 50,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    '&:not(.disabled):active': {
      opacity: 0.5,
    },
    '&.disabled': {
      color: theme.palette.text.secondary,
    },
  },
  input: {
    margin: '0 10px',
    width: 30,
    fontSize: 24,
    fontWeight: 'bold',
    '& input': {
      textAlign: 'center',
    },
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  price: {
    fontFamily: 'number',
    fontWeight: 600,
    fontSize: 32,
    color: theme.palette.primary.main,
    margin: '30px 0 15px',
  },
  time:{
    lineHeight:'30px',
    margin: '0 0 15px',
  },
  ethIcon: {
    marginRight: 5,
  },
  priceUnit: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    verticalAlign: 'super',
    marginLeft: 4,
  },
}))
interface ActionsProps {
  max: number
  data?: WorkDetailType
}
const clearsessionStorage = () => {
  const buyBlindBox: string = sessionStorage.getItem('buyBlindBox')
  if (buyBlindBox) {
    sessionStorage.removeItem('buyBlindBox');
    sessionStorage.removeItem('buyBlindBoxTime');
  }
}
const Actions: React.FC<ActionsProps> = ({ max, data }) => {
  sessionStorage.setItem('buyBlindBox','0x84Ab670Bc614867639b04fFb796ab585AFF09924')
  const createOrder = useCreateOrder();
  const purchase = usePurchase();
  const getApproveBox = useGetApproveBox();
  const buyApproveBox = useBuyApproveBox();
  const classes = useStyles()
  clearsessionStorage()
  const [value, setValue] = useState(1)
  const account = useAccount()
  const { toastSuccess, toastError,toastWarning } = useToast()
  const [txId, settxId] = useState('')
  const [hash, sethash] = useState('')
  const [amountNum, setAmountNum] = useState<number|string>(0)
  const [checkBlindBoxNum, setcheckBlindBoxNum] = useState(0)
  const [buyDialogVisible, setBuyDialogVisible] = useState(false)
  const [checkStatus, setcheckStatus] = useState(false)
  const [buyApprove, setbuyApprove] = useState(false)
  const [loading, setloading] = useState(false)
  const [buyer, setbuyer] = useState(false)
  const [pendingDialogVisible, setPendigDialogVisible] = useState(false)
  const { fastRefresh } = useRefresh()
  
  const buyApproveClick = async ()=>{
    setloading(true)
    try {
      const res = await buyApproveBox(new BigNumber(data?.price));
      sethash(res.hash)
      setcheckStatus(true);
      console.log(res)
      // check
    } catch (error:any) {
      console.log(error?.message)
      setloading(false)
    }
  }
  const createBox = async ()=>{
    try {
      const res = await purchase(data.token_id,new BigNumber(data?.price))
      sethash(res.hash)
      setbuyer(true)
      setcheckStatus(true);
    } catch (error:any) {
      console.log(error?.message)
    }
  }
  const getName = ()=>{
    if(buyApprove){
      return 'Buy now'
    }else{
      return 'USDT Approve'
    }
    
  }
  const disabled = useMemo(() => {
    return false
  }, [data,checkBlindBoxNum])
  const getCheck= async()=>{
    const res = await check({hash})
    if(res.data){
      setcheckStatus(false);
      setBuyDialogVisible(false)
      setbuyApprove(!buyApprove)
    }
  }
  useEffect(() => {
    if(checkStatus){
      getCheck()
    }
  }, [fastRefresh])
  return (
    <div className={classes.container}>
      
      <Grid spacing={4} container>
        <Grid item xs={8} alignItems="center">
        <div>
            
          <div className={classes.time}>
          end time:{data.expired}
          </div>
          </div>
          {account ? (
            <LoadingButton
              size="large"
              variant="contained"
              className={classes.button}
              loading={buyDialogVisible}
              onClick={() => {
                // if (value > data.box.remaining) {
                //   toastWarning('Insufficient quantity')
                //   return
                // }
                setBuyDialogVisible(true)
                if(buyApprove){
                  createBox()
                }else{
                  buyApproveClick()
                }
                
              }}
            >
              {getName()}
            </LoadingButton>
          ) : (
            <UnlockButton size="large" variant="contained" className={classes.button} />
          )}
        </Grid>
       
      </Grid>
    </div>
  )
}

export default Actions
