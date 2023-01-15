import React from 'react'
import { makeStyles } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import UnlockButton from 'components/UnlockButton'
import { useAccount } from 'state/userInfo/hooks'
import EthIcon from 'components/Icons/EthIcon'
import Image from 'components/Image'

interface InterestsItem {
  imgArr:any[]
}
const useStyles = makeStyles((theme) => ({
  container:{
    padding:'50px 0px 0',
  },
  pageTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '44px',
    fontFamily: 'title',
    padding: '80px 0 14px',
  },
  imglist:{
    display:'flex',
    fontSize: '0px',
    flexWrap:'wrap',
  },
  imgitem:{
    display:'inline-block',
    width:'33.333%',
  },
  imgbox:{
    display:'flex',
    fontSize: '0px',
    width:'100%',
  },
  img:{
    display:'inline-block',
    width:'80%',
    margin:'100px auto 0 auto',
  },
  
}))
const InterestsItem = ({imgArr}:InterestsItem) => {
  const classes = useStyles()
  const account = useAccount()
  return (
    <div className={classes.container}>
      <div className={classes.pageTitle}>your exclusive right</div>
      <div>
      <div className={classes.imglist} >
        {imgArr.map((item, index) => (
              <div key={index} className={classes.imgitem}>
                <div className={classes.imgbox}>
                  <img  className={classes.img} style={{margin:item.sty}} src={item.url} alt="" />
                </div>
              </div>
          ))}
      </div>
      </div>
    </div>
  )
}

export default InterestsItem
