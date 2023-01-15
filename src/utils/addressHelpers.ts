import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 128 // NEED CHANGE
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}
export const getMasterAddress = () => {
  return getAddress(addresses.master)
}
export const getInviteAddress = () => {
  return getAddress(addresses.invite)
}
export const getMemberCardAddress = () => {
  return getAddress(addresses.membership)
}
