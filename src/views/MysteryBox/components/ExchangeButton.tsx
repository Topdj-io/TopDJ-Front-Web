import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import { useMasterContract } from 'hooks/useContract'
import { queryExchangeParams, queryExchangeStatus, snapshotCollection, clearExchangeStatus } from 'services/collection'
import { queryBlindExchange,queryNftListByTx} from 'services/nft'
import { useBuyBlindBoxTransaction,usePreSaleBuyBlindBoxTransaction } from 'hooks/useTransaction'
import { useAccount } from 'state/userInfo/hooks'
import useToast from 'hooks/useToast'
import { useInterval } from 'ahooks'
import PendingDialog from './PendingDialog'

const useStyles = makeStyles((theme) => ({
  exchangeBtn: {
    width: 450,
    maxWidth: '100%',
    marginTop: 40,
    textTransform:'uppercase',
    fontWeight: 'bold',
    '&.Mui-disabled:not(.MuiLoadingButton-loading)': {
      // background: 'rgba(255,255,255,0.8)',
      // color: theme.palette.text.fourth,
      fontSize:16
    },
  },
}))
interface ExchangeButtonPropsType {
  id?: number
  disabled?: boolean
  rewardImg?: string
  cardQuantitys?:number
  backgroundImg?:string
}
const INTERVAL_TIME = 10000
const ExchangeButton = ({ cardQuantitys,id,backgroundImg, disabled: disabledProps, rewardImg }: ExchangeButtonPropsType) => {
  
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(disabledProps)
  const [code, setCode] = useState<number|string>('')
  const preSendTransaction = usePreSaleBuyBlindBoxTransaction()
  const [modalVisible, setModalVisible] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const [pendingDialogVisible, setPendigDialogVisible] = useState(false)
  const [txId, settxId] = useState('')
  const [interval, setInterval] = useState(null)
  const masterContract = useMasterContract()
  const account = useAccount()
  const getExchangeParams = async () => {
    const res = await queryExchangeParams({ id })
    return res
  }
  const handleExchange = async () => {
    setLoading(true)
    try {
      const signatureInfo = await queryBlindExchange({id,num:cardQuantitys})
      setCode(signatureInfo.code)
      const res = await preSendTransaction(
        cardQuantitys, 
        0,
        signatureInfo.data.signature,
        signatureInfo.data.timestamp,
        account,
        signatureInfo.data.code,
        )
      settxId(res.data.hash)
      setPendigDialogVisible(true);
      // queryNftListByTx({code:signatureInfo.code,num:cardQuantitys,hash:res.hash})
      
    } catch (e: any) {
      setLoading(false)
      console.log(e?.message)
      e?.message && toastError(e?.message)
    }
  }
  const getExchangeStatus = async () => {
    const res = await queryExchangeStatus({ code })
    if (res.data) {
      setLoading(false)
      setInterval(null)
      setModalVisible(true)
      setDisabled(true)
    }
  }

  const handleSnapshoe = async () => {
    await clearExchangeStatus({ id })
    await snapshotCollection({ id })
    toastSuccess('Snapshot Success')
    setDisabled(false)
  }

  useInterval(() => {
    getExchangeStatus()
  }, interval)

  useEffect(() => {
    setDisabled(disabledProps)
  }, [disabledProps])

  return (
    <>
    {pendingDialogVisible && (
        <PendingDialog
          open={pendingDialogVisible}
          txId={txId}
          numId={id}
          codes={code}
          background={backgroundImg}
          amount={cardQuantitys}
          onClose={() => {
            setPendigDialogVisible(false)
            settxId('')
          }}
        />
      )}
      <LoadingButton
        disabled={disabled}
        variant="contained"
        loading={loading}
        onClick={handleExchange}
        size="large"
        className={classes.exchangeBtn}
      >
        receive
      </LoadingButton>
      {/* <LoadingButton onClick={handleSnapshoe}>test</LoadingButton> */}
    </>
  )
}

export default ExchangeButton
