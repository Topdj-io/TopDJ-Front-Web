import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Container from 'components/Layout/Container'
import { Button,Input,Tooltip,InputBase,InputAdornment,Grid } from '@mui/material'
import clsx from 'clsx'
import UnlockButton from 'components/UnlockButton'
import { useAccount } from 'state/userInfo/hooks'
import { vaildRemixType,checkType,contractWhitelistsType } from 'types/nftRemix'
import { LoadingButton } from '@mui/lab'
import useToast from 'hooks/useToast'
import { checkOpenseaSAsset } from 'services/work'
import SubmitDialog from './SubmitDialog'


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop:70,
        fontFamily: 'text',
    },
    submitBox:{
        padding:40,
        backgroundColor:'#171719',
        display:'flex',
        borderRadius: '20px',
    },
    inputBox:{
        display:'inline-block',
        width:'calc(100% - 220px)',
        border: '1px solid #35353D',
        borderRadius: '2px',
        marginRight:20,
        padding:'16px 10px',
        lineHeight:'20px',
        color: '#fff',
    },
    itemBox:{
    },
    title:{
        fontSize:16,
        color: '#808080',
        lineHeight:'40px',
    },
    leftBox:{
        display:'inline-block',
        width:'615px',
    },
    rightBox:{
        display:'inline-block',
        width:'calc(100% - 615px)',
        padding: '0px 20px 0 80px',
    },
    rightTitle:{
        fontSize:24,
        lineHeight:'60px',
        fontWeight:'bold',
    },
    tipText:{
        marginTop:20,
        fontSize:14,
        color:' #BABABA',
        lineHeight:'40px',
        '& h3':{
            color:'#EFEFEF',
            lineHeight:'60px',
        },
        '& p':{
            display:'inline-block',
            width:'calc(100% - 20px)',
            position: 'relative',
            marginLeft:4,
            verticalAlign: 'top',
        },
        '& img':{
            display:'inline-block',
            marginTop: -'2px',
        }
        
    },
    mt:{
        marginTop:30,
    },
    leftTips:{
        fontSize:16,
        color: '#8AFA0F',
        lineHeight:'40px',
    },
    btn:{
        width: '100%',
        textAlign:'center',
        fontSize:16,
        fontWeight: 600, 
        lineHeight:'44px',
        background: 'linear-gradient(135deg, #00FF1D 0%, #00FFC0 100%)',
        borderRadius: '2px',
        color:'#000',
        cursor:'pointer',
        textTransform: 'uppercase',
    },
    itemBoxList:{
        display:'flex',
        fontSize:0,
        flexWrap:'wrap',
        flexDirection: 'row',
        padding:'40px',
        border:'2px transparent solid',
        backgroundClip: 'padding-box,border-box',
        backgroundOrigin: 'padding-box,border-box',
        backgroundImage: 'linear-gradient(135deg,#171719,#171719),linear-gradient(135deg,#00FF1D,#00ffc0)',
        borderRadius: '20px',
        
    },
    itemBoxL:{
        padding:'0 40px 40px',
    },
    contract:{
        cursor:'pointer',
        display:'inline-block',
        width:'calc(25% - 47px)',
        marginTop:40,
        marginRight:61,
        '&:nth-child(4n)':{
            marginRight:0
        },
        '&:nth-child(1)':{
            marginTop:15
        },
        '&:nth-child(2)':{
            marginTop:15
        },
        '&:nth-child(3)':{
            marginTop:15
        },
        '&:nth-child(4)':{
            marginTop:15
        },
    },
    img:{
        display:'inline-block',
        width:80,
        height:80,
        margin:'0 auto 0 0',
        borderRadius:'50%'
    },
    contractText:{

    },
    toolTip: {
        maxWidth:320,
        wordBreak: 'break-all',
    },
    flex:{
        display:'flex',
        fontSize:0,
        position: 'relative',
    },
    inputItem:{

    },
    input: {
        color: '#fff',
        width: '100%',
        background: '#0C0C0D',
        padding: '16px 20px',
        lineHeight: '20px',
        borderRadius: '2px',
        marginRight:30,
        borderBottom: '20px solid #171719',
        '& $icon': {
          marginRight: 10,
        },
        '& input': {
          padding: 0,
          height: 20,
        },
       
      },
      icon: {
        height: 24,
        width: 24,
      },
      contentBox:{
        width:'100%',
        height:360,
        overflow:'auto',
        paddingRight:20,
      },
      scroolBox:{
          display:'inline-block',
          width:10,
          height:'100%',
      },
      pitchOn:{
        width:24,
        height:24,
        position:'absolute',
        top:0,
        right:8,
      },
      pitchBox:{
          opacity:0.6,
      },
      noMore:{
          lineHeight:'120px',
          textAlign:'center',
          fontSize:16,
          color:'#fff',
          
      },
      pitchHave:{
        display:'inline-block',
        width: 58,
        fontSize:12,
        lineHeight: '20px',
        position:'absolute',
        bottom:-6,
        color:'#000',
        textAlign:'center',
        background: '#8AFA0F',
        borderRadius: '13px',
        left:'calc(50% - 28px)',
        border: '3px solid #171719',
        textTransform: 'uppercase',
      },
      contentText:{
          padding:'150px 30px',
          fontSize:16,
          height:360,
          "& p":{
              lineHeight:'40px',
          }
      }
}))
interface vaildRemixProps {
    data?: vaildRemixType,
    list?:contractWhitelistsType[]
  }
const SubmitCard = ({data,list}:vaildRemixProps) => {
  const classes = useStyles()
  const [contractValue, setContractValue] = useState<string>();
  const [searchKey, setSearchKey] = useState<string>('');
  const [contractList, setContractList] = useState<contractWhitelistsType[]>(list);
  const [tokenIdValue, setTokenIdValue] = useState('');
  const account = useAccount()
  const [loading, setLoading] = useState(false)
  const [submitDialogVisible, setSubmitDialogVisible] = useState(false);
  const [checkOpensea, setCheckOpensea] = useState<checkType>({});
  const { toastSuccess, toastError,toastWarning } = useToast()
  const submitCheckOpenseaSAsset = async (dialogVisible) => {
    if(!dialogVisible|| !tokenIdValue){
        return
    }
    setLoading(true)
    const res = await checkOpenseaSAsset({contract:contractValue,token:tokenIdValue});
    if(res.data.URL&&!res.data.mint&&res.data.token!=='0'||res.data.mint){
        setLoading(false)
        setCheckOpensea(res.data)
        setSubmitDialogVisible(true);
    }else{
        setLoading(false)
        toastWarning(res.message)
    }
 }
  const handleInput1 = (e) => {
    const val = e.target.value;
    setContractValue(val)
  }
  const handleInput2 = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setTokenIdValue(val)
  }
  const selSearchKey = (e) => {
    setSearchKey(e)
    const arr = list.filter((item)=>{
        return e?item.contract.indexOf(e)!==-1||item.name.indexOf(e)!==-1:item
    })
    setContractList(arr);
  }
  const refreshData = ()=>{
      const arr = [];
      contractList.forEach((item,i)=>{
          const json = item
        if(item.token_id === tokenIdValue && item.contract === contractValue){
            json.minted = true
          }
        arr.push(item)
      })
      setContractList(arr);
  }
  return (
    <div className={classes.container}>
        <Container>
        <Grid container className={classes.submitBox} spacing={2}>
                <Grid className={classes.leftBox} item xs={6} md={6} sm={12}>
                <div className={classes.title}>Choose Mint Avatar</div>
                    <div className={clsx(classes.itemBoxList,list.length<=8?classes.itemBoxL:'')}>
                        {list.length>8&&<InputBase
                            placeholder="Search content"
                            value={searchKey || ''}
                            onChange={(e) => {
                                selSearchKey(e.target.value)
                            }}
                            startAdornment={
                            <InputAdornment position="start">
                                <img src="/images/icon/search.svg" alt="" className={classes.icon} />
                            </InputAdornment>
                            }
                            className={classes.input}
                        />}
                        
                        {contractList.length!==0?(<div className={classes.contentBox}>
                            {contractList.map((item, index) => (
                                <div onClick={()=>{
                                    setContractValue(item.contract)
                                    setTokenIdValue(item.token_id)
                                }}  key={index} className={classes.contract}>
                                    <div className={clsx(classes.flex)}>
                                    <Tooltip placement="top" componentsProps={{ tooltip: { className: classes.toolTip } }}
                                        arrow
                                        title={
                                            <span className={classes.contractText}>{item.name}:{item.contract}/{item.token_id}</span>
                                        }
                                        >
                                            <img  className={clsx(classes.img,contractValue===item.contract&&tokenIdValue===item.token_id?classes.pitchBox:'')} src={item.image} alt="" />
                                    </Tooltip>
                                    {item.minted&&<span className={classes.pitchHave}>minted</span>}
                                    {contractValue===item.contract&&tokenIdValue===item.token_id&&(<img className={classes.pitchOn} src="/images/icon/pitchOn.svg" alt="" />)}
                                    </div>
                                
                                </div>
                            ))}
                        </div>):(<div className={classes.contentText}>
                            <p className={classes.noMore}>You dont have any supported NFT collection, check our supported list or contact us to submit your project.</p>
                        </div>)}
                        {list.length<=12&&(<div  className={classes.scroolBox}> </div>)}
                    </div>
                    <div className={clsx(classes.itemBox,classes.mt)}>
                        {/* <div className={classes.title}>token id</div> */}
                        <div className={classes.inputItem}>
                            {/* <Input value={tokenIdValue||''} onInput={handleInput2} className={classes.inputBox}/> */}
                            {account?(<LoadingButton
                                className={classes.btn}
                                variant="contained"
                                loading={loading}
                                onClick={() => {submitCheckOpenseaSAsset(contractValue)}}
                                size="large"
                                >
                                Submit
                                </LoadingButton>):(
                                    <UnlockButton className={classes.btn} size="large" fullWidth variant="contained" />
                                )
                            }
                        </div>
                    </div>
                </Grid>
                <Grid className={classes.rightBox} item xs={6} md={6} sm={12}>
                    <div className={classes.tipText} dangerouslySetInnerHTML = {{ __html : data.introduction }} />
                    <div className={clsx(classes.leftTips)}>Each NFT token can only remix for once, please choose carefully</div>
                </Grid>
            </Grid>
        </Container>
        {submitDialogVisible&&<SubmitDialog datas={data} onload={()=>{refreshData();setTokenIdValue('');setContractValue('');setSubmitDialogVisible(false)}} contract={contractValue} token={tokenIdValue} check={checkOpensea} open={submitDialogVisible}
        onClose={() => {
          setSubmitDialogVisible(false)
        }} />}
    </div>
  )
}

export default SubmitCard
