import React, { useMemo, useState,useEffect } from 'react'
import useRefresh from 'hooks/useRefresh'
import { makeStyles } from '@mui/styles'
import { Grid, Button, InputBase } from '@mui/material'
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp'
import { useAccount } from 'state/userInfo/hooks'
import { LoadingButton } from '@mui/lab'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import { checkBlindBoxStage} from 'services/blindBox'
import { BlindBoxDetailTypeTop,MysteryBoxType } from 'types/blindBoxTop'
import UnlockButton from 'components/UnlockButton'
import clsx from 'clsx'
import useToast from 'hooks/useToast'
import dayjs from 'dayjs'
import BuyDialog from './BuyDialog'
import PendingDialog from './PendingDialog'

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
  data?: BlindBoxDetailTypeTop
}
const clearsessionStorage = () => {
  const buyBlindBox: string = sessionStorage.getItem('buyBlindBox')
  if (buyBlindBox) {
    sessionStorage.removeItem('buyBlindBox');
    sessionStorage.removeItem('buyBlindBoxTime');
  }
}
const Actions: React.FC<ActionsProps> = ({ max, data }) => {
  const classes = useStyles()
  clearsessionStorage()
  const [value, setValue] = useState(1)
  const account = useAccount()
  console.log(account,123)
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
  const handleInput = (e) => {
    const numberReg = /0-9/
    const val = e.target.value
    if (numberReg.test(val) && Number(val) < max && Number(val)) {
      setValue(val)
    }
  }
  const handleAdd = () => {
    if (value < max) {
      setValue(value + 1)
    } else {
      toastWarning('Buy up to 5')
    }
  }
  const handleMinus = () => {
    if (value !== 1) {
      setValue(value - 1)
    }
  }
  useEffect(() => {
    if(account){
      checkBlindBox()
    }
  }, [account])
  return (
    <div className={classes.container}>
      <BuyDialog
        open={buyDialogVisible}
        onClose={() => {
          clearsessionStorage()
          setBuyDialogVisible(false)
        }}
        onSuccess={(hash,num) => {
          setBuyDialogVisible(false)
          setPendigDialogVisible(true)
          settxId(hash)
          setAmountNum(num)
        }}
        data={data}
        amount={value}
      />
      {pendingDialogVisible && (
        <PendingDialog
          open={pendingDialogVisible}
          txId={txId}
          numId={data?.box?.id}
          amount={amountNum}
          background={data.box.background}
          onClose={() => {
            setPendigDialogVisible(false)
            settxId('')
          }}
        />
      )}
      <Grid spacing={4} container>
        <Grid item xs={8} alignItems="center">
          {account ? (
            <LoadingButton
              size="large"
              variant="contained"
              className={classes.button}
              disabled={disabled}
              onClick={() => {
                if (value > data.box.remaining) {
                  toastWarning('Insufficient quantity')
                  return
                }
                setBuyDialogVisible(true)
              }}
            >
              {buyStatus(data?.box.type)}
            </LoadingButton>
          ) : (
            <UnlockButton size="large" variant="contained" className={classes.button} />
          )}
        </Grid>
        <Grid item container xs alignItems="center" className={disabled ? classes.disabled : ''}>
          <Grid item className={clsx(classes.actionIcon, { disabled: value === 1 })} onClick={handleMinus}>
            <RemoveSharpIcon />
          </Grid>
          <Grid item>
            <InputBase readOnly value={value} type="text" onInput={handleInput} className={classes.input} />
          </Grid>
          <Grid item onClick={handleAdd} className={clsx(classes.actionIcon, { disabled: value === max })}>
            <AddSharpIcon />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Actions
