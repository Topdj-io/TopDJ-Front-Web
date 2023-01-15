import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { simpleRpcProvider } from 'utils/providers'
import { ethers } from 'ethers'
import bep20Abi from 'config/abi/erc20.json'
import nftAbi from 'config/abi/nft.json'
import topdjNFTabi from 'config/abi/topdjNFTabi.json'
import nftrefmix from 'config/abi/nftrefmix.json'
import inviteAbi from 'config/abi/invite.json'
import membershipAbi from 'config/abi/membership.json'
import topdjmarket from 'config/abi/topdjmarket.json'
import { getMasterAddress, getInviteAddress, getMemberCardAddress as getMembershipAddress } from 'utils/addressHelpers'

// const getContract = (abi: any, address: string, web3?: Web3) => {
//   const _web3 = web3 ?? web3NoAccount
//   return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
// }
const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}
// export const getBep20Contract = (address: string, web3?: Web3) => {
//   return getContract(bep20Abi, address, web3)
// }
export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}

// 盲盒
const buyBlindBox = ()=>{
  return sessionStorage.getItem('buyBlindBox')
}
export const getMasterContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const address = '0x84Ab670Bc614867639b04fFb796ab585AFF09924';
  return getContract(nftAbi, address, signer)
}
export const getMasterContractss = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const address = buyBlindBox()?buyBlindBox():getMasterAddress();
  return getContract(topdjNFTabi, '0x36e5Ce5513A69284c8936E2DFfCF497Ab0E0C789', signer)
}

export const getCreateOrder = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(topdjmarket, '0xe5869E4e0C4711A4B4e78c37a18cD176A1D8537f', signer)
}

// 兑换
const buyNftRemix = ()=>{
  return sessionStorage.getItem('buyNftRemix')
}
export const getNftRemix = (signer?: ethers.Signer | ethers.providers.Provider) => {
  const address = buyNftRemix()
  return getContract(nftrefmix, address, signer)
}
export const getInviteContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(inviteAbi, getInviteAddress(), signer)
}

export const getMembershipContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(membershipAbi, getMembershipAddress(), signer)
}

export default getBep20Contract
