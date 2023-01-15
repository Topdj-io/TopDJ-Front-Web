import BigNumber from 'bignumber.js'
import { BIG_TEN } from './bigNumber'

export const getBalanceNumber = (balance: BigNumber | number, decimals = 18, decimalPlaces = 2) => {
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals)).decimalPlaces(decimalPlaces)
  return displayBalance.toNumber() || 0
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber | number, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}
export const getDecimalAmountNumber = (amount: BigNumber | number, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals)).toNumber()
}
