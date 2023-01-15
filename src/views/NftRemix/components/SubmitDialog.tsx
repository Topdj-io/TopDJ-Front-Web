import React, { useState, useMemo,useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Grid, Button } from '@mui/material'
import BigNumber from 'bignumber.js'
import { LoadingButton } from '@mui/lab'
import { vaildRemixType,checkType,preReminType,preReminDataType } from 'types/nftRemix'
import { preRemixMint,remixMint,checkRemixMint,freeMint } from 'services/work'
import useToast from 'hooks/useToast'
import useRefresh from 'hooks/useRefresh'
import EthIcon from 'components/Icons/EthIcon'
import {usePreSaleNftRemix,useSaleNftRemix } from 'hooks/useTransaction'
import { useAccount } from 'state/userInfo/hooks'
import PageLoading from 'components/Pageloading'
import Dialog, { DialogPropsType } from 'components/Dialog'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '0 30px 30px',
  },
  submitContainer:{

  },
  dialogBox:{
      
      '& .MuiPaper-root':{
        width:480,
        '& .makeStyles-title-72':{
          padding:30,
          borderBottom:0,
        },
        '& .dj-close':{
          right:30,
          top:20,
          color:'#BABABA',
        }
      }
  },
  tips:{
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: '21px',
    wordBreak: 'break-all',
  },
  btn:{
    width:'100%',
    marginTop:40,
    background: 'linear-gradient(135deg, #00FF1D 0%, #00FFC0 100%)',
    borderRadius: '2px',
    fontWeight:'bold'
  },
  price: {
    fontFamily: 'number',
    fontWeight: 600,
    fontSize: 32,
    color: theme.palette.primary.main,
    margin: '30px 0 15px',
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
  freeClass:{
    textDecoration: 'line-through',
  },
  freeText:{
    fontSize:18,
    color:'#D0AA3D',
    display: 'inline-block',
    lineHeight: '32px',
    verticalAlign: 'top',
    marginLeft: '10px',
  },
  loadiong:{
    width:420,
    height:210,

  },
  img:{
    width:390,
  }
}))

interface SubmitDialogPropsType extends DialogPropsType {
  datas?: vaildRemixType
  check?:checkType
  contract?:string
  token?:string
  onload?:() => void
}
const SubmitDialog = ({ datas,check,contract,token,onload ,...rest}: SubmitDialogPropsType) => {
  // buyNftRemix
  const classes = useStyles()
  sessionStorage.setItem('buyNftRemix', datas.contract);
  const [loading, setLoading] = useState(false)
  const [preRemixMintNum, setpreRemixMintNum] = useState<preReminType>({})
  const [remixMintLoading, setRemixMintLoading] = useState(false)
  
  const sendNftRemix = useSaleNftRemix()
  const preSendNftRemix = usePreSaleNftRemix()
  const account = useAccount()
  const [examine, setExamine] = useState(false) 
  const [checkMintData, setCheckMintData] = useState<preReminDataType>({}) 
  const { fastRefresh } = useRefresh()
  const { toastSuccess, toastError,toastWarning } = useToast()
  const handleBuy =  async (ids) => {
    setLoading(true)
  }
  const checkTetx =()=>{
    if(check?.mint){
      if(preRemixMintNum.free){
        return {
          btnText:'Mint',
          tips:'WL member : Free mint for the first time.'
        }
      }else{
        return {
          btnText:'Mint',
          tips:'Public sale mint:  0.05ETH.'
        }
      }
      
    }else{
      return {
        btnText:'Go to Opensea',
        tips:'Each address can only mint one nft. This address has already mint one nft.'
      }
    }
  }
  const preRemixMintInit = async ()=>{
    setRemixMintLoading(false);
    const res = await preRemixMint({contract,token});
    setpreRemixMintNum(res.data)
    setRemixMintLoading(true);
  }
  const handleMint = async ()=>{
    setLoading(true)
    try {
      const mintInfo = preRemixMintNum.free?await freeMint({contract,token}):await remixMint({contract,token})
      if(mintInfo.data){
        const res = preRemixMintNum.free?await preSendNftRemix(mintInfo.data.num,new BigNumber(mintInfo.data.price),mintInfo.data.signature,mintInfo.data.timestamp,mintInfo.data.address,mintInfo.data.code):await sendNftRemix(1,new BigNumber(preRemixMintNum?.price))
        setCheckMintData({code:mintInfo.data.code?mintInfo.data.code:0,hash:res.hash})
        setExamine(true)
      }else{
        setLoading(false)
        toastError(mintInfo.message)
      }
      
    } catch (e: any) {
      setLoading(false)
      console.log(e?.message)
      e?.message && toastError(e?.message)
    }
  }
  const clickBox=()=>{
    if(check?.mint){
      handleMint()
    }else{
      check?.URL?window.open(check?.URL):''
    }
    
  }
  const calculatePrice =(price)=>{
    return price?new BigNumber(price).div(new BigNumber(10).pow(18)).toString():0
  }
  const checkMintStatus = async ()=>{
    const res = await checkRemixMint({contract,token,...checkMintData})
    if(res.data){
      toastSuccess('Mint succeed')
      setLoading(false)
      setExamine(false);
      onload?.();
    }
  }
  useEffect(() => {
    if(check?.mint||!check?.mint&&!check?.URL||!check?.mint&&check?.URL&&check?.token!=='0'){
      preRemixMintInit()
    }
  }, [check])
  useEffect(() => {
      if(examine){
        checkMintStatus()
      }
  }, [fastRefresh])
  return (
    <Dialog className={classes.dialogBox} {...rest} maxWidth="sm" fullWidth title="Reminder">
      {remixMintLoading?(<Grid className={classes.content}>
        
        {(check?.mint)&&(<div className={classes.price}>
              <EthIcon className={classes.ethIcon} />
              <span className={preRemixMintNum?.free?classes.freeClass:''}>0.05</span>
              <span className={classes.priceUnit}>ETH</span>
              {preRemixMintNum?.free&&(<span className={classes.freeText}>free</span>)}
            </div>)
          }
          <div className={classes.tips} >{checkTetx().tips}</div>
          <LoadingButton
            className={classes.btn}
            variant="contained"
            loading={loading}
            onClick={clickBox}
            size="large"
          >
            {checkTetx().btnText}
          </LoadingButton>
      </Grid>):(<Grid className={classes.content}><div className={classes.loadiong}>
        <img className={classes.img} src="/images/common/loading.gif" alt="" /></div></Grid>)}
    </Dialog>
  )
}

export default SubmitDialog
