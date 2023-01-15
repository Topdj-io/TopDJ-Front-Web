import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import { getBep20Contract, getMasterContract, getInviteContract, getMembershipContract,getNftRemix,getMasterContractss,getCreateOrder } from 'utils/contractHelpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { useLocation } from 'react-router-dom'
/**
 * Helper hooks to get specific contracts (by ABI)
 */

// export const useERC20 = (address: string) => {
//   const web3 = useWeb3()
//   return useMemo(() => getBep20Contract(address, web3), [address, web3])
// }
export const useERC20 = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract('0x4af344f03300c0e75c502ed3e735b5bf38cba312', library.getSigner()), ['0x4af344f03300c0e75c502ed3e735b5bf38cba312', library])
}

export const useMasterContract = (address?:string) => {
  const { library } = useActiveWeb3React();
  const buyBlindBox = sessionStorage.getItem('buyBlindBox')
  return useMemo(() => getMasterContract(library.getSigner()), [library,buyBlindBox])
}
export const useMasterContractss = (address?:string) => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getMasterContractss(library.getSigner()), [library,'0x36e5Ce5513A69284c8936E2DFfCF497Ab0E0C789'])
}

export const useInviteContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getInviteContract(library.getSigner()), [library])
}
export const useNftRemix = (address?:string) => {
  const { library } = useActiveWeb3React();
  const buyBlindBox = sessionStorage.getItem('buyNftRemix')
  return useMemo(() => getNftRemix(library.getSigner()), [library,buyBlindBox])
}
export const useTopdjmarket = (address?:string) => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getCreateOrder(library.getSigner()), [library])
}
export const useMembershipContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMembershipContract(library.getSigner()), [library])
}
export default useERC20
