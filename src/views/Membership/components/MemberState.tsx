import React,{useState,useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import { useAccount } from 'state/userInfo/hooks'
import { Button,Input } from '@mui/material'
import { queryBlindBoxExchange,queryAddressBlindBoxExchange } from 'services/nft'

const useStyles = makeStyles((theme) => ({
    contentT:{
        backgroundColor:'#171719',
        
    },
    line:{
        width:'100%',
        height:1,
        margin:'0 30px',
        backgroundColor:'#000',
    },
    content:{
        padding:'70px 30px',
        display:'flex',
        fontSize:0,
    },
    leftBox:{
        display:'inline-block',
        width:'50%',
        '& p':{
            fontSize:24,
            color:'#fff',
            fontWeight:'bold', 
        },
        '& span':{
            fontSize:58,
            color:'#888888',
            fontWeight:'bold',
            lineHeight:2,
            '& b':{
                fontSize:64,
                fontFamily: 'title',
            }
        }
    },
    rightBox:{
        display:'inline-block',
        width:'50%',
        '& span':{
            fontSize:16,
            color: '#808080',
            lineHeight:'40px',
            display: 'inline-block',
        },
    },
    btnInp:{
        display:'flex',
        fontSize:0,
    },
    inputBox:{
        display:'inline-block',
        width:'calc(100% - 120px)',
        border: '1px solid #35353D',
        borderRadius: '2px',
        padding:'5px 10px',
        lineHeight:'20px',
        color: '#fff',
    },
    buttonBox:{
        display:'inline-block',
        width:110,
        textTransform: 'uppercase',
        marginLeft:10,
    },
    leftColor:{
        color: '#8AFA0F!important',
    },
    notqualified:{
        color:'#FF2D2D!important'
    },
    colo1:{
        color:'#8AFA0F!important'
    },
    
}))

const MemberState: React.FC = () => {
// const MemberState = () => {
  const [value, setValue] = useState();
  const [cardQuantity, setCardQuantity] = useState(0)
  const [cardAddressStatus, setCardAddressStatus] = useState(null)
  const classes = useStyles()
  const account = useAccount()
  const handleBlindBoxExchange = async () => {
      if(localStorage.getItem('token')){
        const res = await queryBlindBoxExchange();
        setCardQuantity(res.data)
      }
   }
   const handleAddressBlindBoxExchange = async (val) => {
    if(val.length!==42){
        return
    }
    const res = await queryAddressBlindBoxExchange({address:value});
    setCardAddressStatus(res.data)
   }
   
  const handleInput = (e) => {
    const val = e.target.value;
    setValue(val)
  }
  const submit = (val)=>{
    setValue(val)
}
useEffect(() => {
    handleBlindBoxExchange()
  }, [])
  return (
    <div className={classes.contentT}>
        <div className={classes.line}> </div>
        <div className={classes.content}>
            <div className={classes.leftBox}>
                <p>Your current account can receive</p>
                <span className={cardQuantity>0?classes.leftColor:''}><b>{cardQuantity}</b> indivual</span>
            </div>
            <div className={classes.rightBox}>
                <span>Check account</span>
                <div className={classes.btnInp}>
                {/* value={this.state.value}
                        onChange={this.onChange.bind(this)} */}
                    <Input value={value||''} onInput={handleInput} className={classes.inputBox}/>
                    <Button variant="contained"
                    className={classes.buttonBox}
                    size="large"
                    fullWidth
                    onClick={() => {
                        handleAddressBlindBoxExchange(value)
                    }}>Inquire</Button>
                </div>
                {cardAddressStatus===0?(<span className={classes.notqualified}>Not qualified</span>):''}
                {cardAddressStatus>0?(<span className={classes.colo1}>{cardAddressStatus}can be received</span>):''}
            </div>
        </div>
    </div>
  )
}

export default MemberState
