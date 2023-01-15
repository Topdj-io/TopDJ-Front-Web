import React, { useMemo, useState, useEffect } from 'react'
import useRefresh from 'hooks/useRefresh'
import { makeStyles } from '@mui/styles'
import BigNumber from 'bignumber.js'
import { check, approve } from 'services/markNft'
import { Grid, Button, InputBase, TextField, FilledInput, InputAdornment, FormHelperText, MenuItem, Select } from '@mui/material'
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp'
import { useAccount } from 'state/userInfo/hooks'
import { LoadingButton } from '@mui/lab'
import EthIcon from 'components/Icons/EthIcon'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import { BlindBoxDetailTypeTop, MysteryBoxType } from 'types/blindBoxTop'
import UnlockButton from 'components/UnlockButton'
import { newWorkDetailType } from 'types/work'
import { useCreateOrder, usePurchase, useGetApproveBox, useBuyApproveBox, useCancelOrder } from 'hooks/useTransaction'
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
  inputBox: {
    display: 'flex',
    marginBottom: 20,
    '& .MuiFilledInput-root': {
      border: '1px solid #6DC80A'

    },
    '& .MuiFilledInput-input': {
      padding: '15px 0 15px 5px'
    },
    '& .MuiFormHelperText-root': {
      fontSize: 14,
      fontFamily: 'text',
      lineHeight: '30px',
      margin: '0 0 5px'
    },

  },
  select: {
    marginLeft: 20,
    '& .MuiOutlinedInput-root': {
      height: '55px',
      border: '1px solid #6DC80A',
      width: '150px'
    }
  },
  price: {
    fontFamily: 'number',
    fontWeight: 600,
    fontSize: 32,
    color: theme.palette.primary.main,
    margin: '30px 0 15px',
  },
  time: {
    lineHeight: '30px',
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
  data?: newWorkDetailType
}
const clearsessionStorage = () => {
  const buyBlindBox: string = sessionStorage.getItem('buyBlindBox')
  if (buyBlindBox) {
    sessionStorage.removeItem('buyBlindBox');
    sessionStorage.removeItem('buyBlindBoxTime');
  }
}
const Actions: React.FC<ActionsProps> = ({ max, data }) => {
  sessionStorage.setItem('buyBlindBox', '0x84Ab670Bc614867639b04fFb796ab585AFF09924')
  const createOrder = useCreateOrder();
  const purchase = usePurchase();
  const getApproveBox = useGetApproveBox();
  const buyApproveBox = useBuyApproveBox();
  const cancelOrder = useCancelOrder();
  const classes = useStyles()
  clearsessionStorage()
  const [value, setValue] = useState(1)
  const account = useAccount()
  const [usdtValue, setusdtValue] = useState('')
  const [amountNum, setAmountNum] = useState<number | string>(0)
  const [checkBlindBoxNum, setcheckBlindBoxNum] = useState(0)
  const [day, setday] = useState(1)
  const [checkStatus, setcheckStatus] = useState(false)
  const [buyDialogVisible, setBuyDialogVisible] = useState(false)
  const [pendingDialogVisible, setPendigDialogVisible] = useState(false)
  const [hash, sethash] = useState('')
  const [nftjurisdiction, setnftjurisdiction] = useState(false)
  const [nftLoading, setnftLoading] = useState(false)
  const [loading, setloading] = useState(false)
  const { fastRefresh } = useRefresh()
  const { toastSuccess, toastError, toastWarning } = useToast()

  const checkApprove = async () => {
    const res = await approve();
    setnftjurisdiction(res.data)
    setnftLoading(true)

  }
  const createBox = async () => {
    setloading(true)
    try {
      if (data.order.id) {
        const res = await cancelOrder(data.nft.token_id);
        sethash(res.hash)
        setcheckStatus(true);
      } else if (nftjurisdiction && !data.order.id) {
        const res = await createOrder(data.nft.token_id, new BigNumber(calculatePrice(usdtValue)), setDay());
        sethash(res.hash)
        setcheckStatus(true);
      } else if (!nftjurisdiction && !data.order.id) {
        const res = await getApproveBox()
        sethash(res.hash)
        setcheckStatus(true);
      }


    } catch (error: any) {
      console.log(error?.message)
      toastWarning(error?.message)
      setloading(false)
    }
  }
  const getCheck = async () => {
    const res = await check({ hash })
    console.log(res)
    if (res.data) {
      setcheckStatus(false);
      setloading(false)
      checkApprove();
      toastSuccess('success!')
    }
  }
  const setDay = () => {
    const date = new Date().getTime();
    const dayM = 24 * 60 * 60 * 1000;
    if (day === 1) {
      return date + dayM * 7
    } else if (day === 2) {
      return date + dayM * 15
    } else {
      return date + dayM * 30
    }
  }
  const calculatePrice = (price) => {
    return price ? new BigNumber(price).div(new BigNumber(10).pow(-18)).toString() : 0
  }
  const calculatePrice1 = (price) => {
    return price ? new BigNumber(price).div(new BigNumber(10).pow(18)).toString() : 0
  }
  const setSearchKey = async (e) => {
    console.log(e)
    setusdtValue(e)
  }
  const handleChange = (e) => {
    console.log(e)
    setday(e);
  }
  const setName = () => {
    if (data.order.id) {
      return 'cancel the sell'
    }
    if (nftjurisdiction) {
      return 'sell'
    } else {
      return 'approve'
    }
  }
  useEffect(() => {
    checkApprove();
  }, [account])
  useEffect(() => {
    if (checkStatus) {
      getCheck()
    }
  }, [fastRefresh])
  return (
    <div className={classes.container}>

      <Grid spacing={6} container>
        <Grid item xs={10} alignItems="center">
          {!data.order.id && (<div className={classes.inputBox}>
            <div>
              <FormHelperText id="filled-weight-helper-text">price</FormHelperText>
              <FilledInput
                id="filled-adornment-weight"
                // value={usdtValue}
                onChange={(e) => {
                  setSearchKey(e.target.value)
                }}
                endAdornment={<InputAdornment position="end">usdt</InputAdornment>}
                aria-describedby="filled-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />

            </div>
            <div className={classes.select}>
              <FormHelperText id="filled-weight-helper-text">date due</FormHelperText>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={day}
                label="Age"
                onChange={(e) => {
                  handleChange(e.target.value)
                }}
              >
                <MenuItem value="">
                  <em> </em>
                </MenuItem>
                <MenuItem value={1}>7 days</MenuItem>
                <MenuItem value={2}>half a month</MenuItem>
                <MenuItem value={3}>one month</MenuItem>
              </Select>
            </div>
          </div>)}
          {data.order.id !==0&& (<div>
            <div className={classes.price}>
              <EthIcon className={classes.ethIcon} />
              {calculatePrice1(data.order.price)}
              <span className={classes.priceUnit}>{data.order.symbol}</span>
            </div>
            <div className={classes.time}>
              end time:{data.order.expired}
            </div>
          </div>)}
          {account && nftLoading ? (
            <LoadingButton
              size="large"
              variant="contained"
              className={classes.button}
              loading={loading}
              onClick={() => {

                setBuyDialogVisible(true)
                createBox()
              }}
            >
              {setName()}
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
