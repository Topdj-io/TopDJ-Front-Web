import React, { useMemo, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { WorkDetailType } from 'types/marknft'
import { useAccount } from 'state/userInfo/hooks'
import BigNumber from 'bignumber.js'
import EthIcon from 'components/Icons/EthIcon'
import Actions from './Actions'
import ActionsBuy from './ActionsBuy'

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 0,
  },
  cardItem: {
    border: `2px solid ${theme.palette.divider}`,
    padding: '20px',
    cursor: 'pointer',
    fontSize: 16,
  },
  more: {},
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
  remaining: {
    marginBottom: 50,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
  },
  opacity6: {
    opacity: 0.6,
  },
  remainingSellout: {
    color: '#FE126A',
    fontFamily: 'text-bold',
  },
  remainingCount: { fontFamily: 'text-bold' },
}))
interface BoxListPropsType {
    type?: string
    item?:WorkDetailType
}
const BtnStatus = ({ type,item}: BoxListPropsType) => {
  const classes = useStyles()
  const isSellOut = true;
  const account = useAccount()
  const calculatePrice =(price)=>{
    return price?new BigNumber(price).div(new BigNumber(10).pow(18)).toString():0
  }
  return (
    <div className={classes.container}>
      <div className={classes.price}>
            <EthIcon className={classes.ethIcon} />
            {calculatePrice(item.price)}
            <span className={classes.priceUnit}>{item.symbol}</span>
        </div>
        <Actions max={5} data={item} />
    </div>
  )
}

export default BtnStatus
