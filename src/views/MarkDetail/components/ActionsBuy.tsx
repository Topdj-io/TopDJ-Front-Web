import React, { useMemo, useState,useEffect } from 'react'
import useRefresh from 'hooks/useRefresh'
import { makeStyles } from '@mui/styles'
import BigNumber from 'bignumber.js'
import { Grid, Button, InputBase,OutlinedInput } from '@mui/material'

import RemoveSharpIcon from '@mui/icons-material/RemoveSharp'
import { useAccount } from 'state/userInfo/hooks'
import { LoadingButton } from '@mui/lab'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import { checkBlindBoxStage} from 'services/blindBox'
import { BlindBoxDetailTypeTop,MysteryBoxType } from 'types/blindBoxTop'
import UnlockButton from 'components/UnlockButton'
import {useCreateOrder,usePurchase } from 'hooks/useTransaction'
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
}))
interface ActionsProps {
  max: number
  data?: any
}
const clearsessionStorage = () => {
  const buyBlindBox: string = sessionStorage.getItem('buyBlindBox')
  if (buyBlindBox) {
    sessionStorage.removeItem('buyBlindBox');
    sessionStorage.removeItem('buyBlindBoxTime');
  }
}
const Actions: React.FC<ActionsProps> = ({ max, data }) => {
  const createOrder = useCreateOrder();
  const purchase = usePurchase();
  const classes = useStyles()
  clearsessionStorage()
  const [value, setValue] = useState(1)
  const account = useAccount()
  const { toastWarning } = useToast()
  const [txId, settxId] = useState('')
  const [amountNum, setAmountNum] = useState<number|string>(0)
  const [checkBlindBoxNum, setcheckBlindBoxNum] = useState(0)
  const [buyDialogVisible, setBuyDialogVisible] = useState(false)
  const [pendingDialogVisible, setPendigDialogVisible] = useState(false)
  const checkBlindBox = async ()=>{
    if(account && (data?.box.type === MysteryBoxType.VIP|| data?.box.type === MysteryBoxType.PRESELL) ){
      const res = await checkBlindBoxStage({id:data?.box.id})
      setcheckBlindBoxNum(res.data)
    }
  }
  const buyStatus = (type)=>{
    if(data?.box.type === MysteryBoxType.PUBLIC_AUCTION){
      return 'Buy'
    }
    if(checkBlindBoxNum){
      return 'Buy'
    }else{
      return 'Not Whitelisted'
    }
  }
  const createBox = async ()=>{
    try {
      const res = await purchase('270',new BigNumber(1000))
      console.log(res)
    } catch (error:any) {
      console.log(error?.message)
    }
  }
  const disabled = useMemo(() => {
    if (dayjs(data.box.end_at).valueOf() - dayjs().valueOf() <= 0) {
      return true
    }
    if (data.box?.remaining === 0) {
      return true
    }
    if(!checkBlindBoxNum&&data?.box.type !== MysteryBoxType.PUBLIC_AUCTION){
      return true
    }
    return false
  }, [data,checkBlindBoxNum])

  useEffect(() => {
    if(account){
      checkBlindBox()
    }
  }, [account])
  return (
    <div className={classes.container}>
      
      <Grid spacing={4} container>
        <Grid item xs={8} alignItems="center">
          {account ? (
            <div>
                <LoadingButton
              size="large"
              variant="contained"
              className={classes.button}
              
              onClick={() => {
                if (value > data.box.remaining) {
                  toastWarning('Insufficient quantity')
                  return
                }
                setBuyDialogVisible(true)
                createBox()
              }}
            >
              {buyStatus(data?.box.type)}
            </LoadingButton>
            {/* <OutlinedInput></OutlinedInput> */}
            </div>
          ) : (
            <UnlockButton size="large" variant="contained" className={classes.button} />
          )}
        </Grid>
       
      </Grid>
    </div>
  )
}

export default Actions
