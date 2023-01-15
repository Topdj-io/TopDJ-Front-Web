import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import { useMasterContract } from 'hooks/useContract'
import { queryExchangeParams, getCodeAndcode, snapshotCollection, clearExchangeStatus,} from 'services/collection'
import { useBuyBlindBoxTransaction } from 'hooks/useTransaction'
import { useAccount } from 'state/userInfo/hooks'
import useRefresh from 'hooks/useRefresh'
import useToast from 'hooks/useToast'
import { useInterval } from 'ahooks'
import CompleteDialog from './CompleteDialog'

const useStyles = makeStyles((theme) => ({
  exchangeBtn: {
    width: 450,
    maxWidth: '100%',
    marginTop: 15,
    fontWeight: 'bold',
    '&.Mui-disabled:not(.MuiLoadingButton-loading)': {
      background: 'rgba(255,255,255,0.8)',
      color: theme.palette.text.fourth,
    },
  },
}))
interface ExchangeButtonPropsType {
  id?: number
  disabled?: boolean
  rewardImg?: string
}
const INTERVAL_TIME = 10000
const ExchangeButton = ({ id, disabled: disabledProps, rewardImg }: ExchangeButtonPropsType) => {
  const classes = useStyles()
  const { fastRefresh } = useRefresh()
  sessionStorage.setItem('buyBlindBox','collectcards');
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(disabledProps)
  const [code, setCode] = useState('')
  const [hash, setHash] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const [interval, setInterval] = useState(null)
  const masterContract = useBuyBlindBoxTransaction()
  const account = useAccount()
  const getExchangeParams = async () => {
    const res = await queryExchangeParams({ id })
    return res
  }
  const handleExchange = async () => {
    setLoading(true)
    try {
      const params = await getExchangeParams()
      setCode(params.data.code)
     const res = await masterContract(1,1000)
     console.log(res)
     setHash(res.hash)
      setInterval(INTERVAL_TIME)
    } catch (e: any) {
      console.log(e?.message)
      setLoading(false)
      e?.message && toastError(e?.message)
    }
  }
  const getExchangeStatus = async () => {
    const res = await getCodeAndcode({ code,hash })
    if (res) {
      setLoading(false)
      setInterval(null)
      setModalVisible(true)
      setDisabled(true)
    }
  }

  const handleSnapshoe = async () => {
    const res = await clearExchangeStatus({ id,hash })
    if (res.data) {
      await snapshotCollection({ id,hash })
      toastSuccess('Snapshot Success')
      setDisabled(false)
    }
   
  }

  useEffect(() => {
    
    setDisabled(disabledProps)
  }, [disabledProps])
  useEffect(() => {
    if(interval){ getExchangeStatus()}
  }, [fastRefresh])
  return (
    <>
      <CompleteDialog
        onClose={() => {
          setModalVisible(false)
        }}
        rewardImg={rewardImg}
        open={modalVisible}
      />
      <LoadingButton
        disabled={disabled}
        variant="contained"
        loading={loading}
        onClick={handleExchange}
        size="large"
        className={classes.exchangeBtn}
      >
        Exchange
      </LoadingButton>
      {/* <LoadingButton onClick={handleSnapshoe}>test</LoadingButton> */}
    </>
  )
}

export default ExchangeButton
