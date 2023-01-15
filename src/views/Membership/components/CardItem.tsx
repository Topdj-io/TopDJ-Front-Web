import React from 'react'
import { makeStyles } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import UnlockButton from 'components/UnlockButton'
import { useAccount } from 'state/userInfo/hooks'
import EthIcon from 'components/Icons/EthIcon'
import Image from 'components/Image'
import { MembershipCardItemData } from 'config/constants/membershipList'

interface CardItemProps {
  data?: MembershipCardItemData
  loading: boolean
  text: string
  disabled?: boolean
  onConfirm: () => void
}
const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    padding: '20px 20px 50px',
    height: '100%',
    display:'flex',
    fontSize: 0,
    '&>*': {
      marginBottom: 25,
    },
  },
  imgbox:{
    width: '45%',
  },
  img: {
    width: '100%',
    display:'inline-block',
  },
  title: {
    fontSize: 32,
    marginTop: 25,
    marginBottom: 25,
    fontFamily: 'text-bold',
  },
  priceContainer: {
    marginBottom: 25,
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  price: {
    margin: '0 6px',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: 32,
  },
  count: {
    fontSize: 16,
  },
  ethIcon: {
    marginRight: 5,
  },
  priceUnit: {
    verticalAlign: 'baseline',
  },
  btn: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textContent: {
    lineHeight: 1.5,
    fontSize:16,
    color: theme.palette.text.third,
    '& div': {
      display: 'flex',
    },
    '& p': {
      marginBottom: 20,
      width:'50%',
    },
  },
  dot: {
    height: 12,
    marginTop: 6,
    marginRight: 4,
  },
  contentText:{
    display:'inline-block',
    width:'55%',
    paddingLeft:50,
  }
}))
const CardItem = ({ data, loading, onConfirm, disabled, text }: CardItemProps) => {
  const classes = useStyles()
  const account = useAccount()
  return (
    <div className={classes.container}>
      <div  className={classes.imgbox}><Image src={data.img} className={classes.img} alt="" /></div>
      <div className={classes.contentText}>
        <div className={classes.title}>{data.title}</div>
        <div className={classes.textContent}>
          {data.content.map((item, index) => (
            <div key={index}>
              <img src="/images/membership/dot.svg" alt="" className={classes.dot} />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardItem
