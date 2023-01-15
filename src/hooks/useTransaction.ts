import { useMasterContract, useMembershipContract,useNftRemix ,useMasterContractss,useTopdjmarket,useERC20} from 'hooks/useContract'
import { useUserInfo } from 'state/userInfo/hooks'
import BigNumber from 'bignumber.js'
import { useEthBalance } from 'hooks/useTokenBalance'
import { getDecimalAmountNumber } from 'utils/formatBalance'

// 盲盒白名单购买
export const usePreSaleBuyBlindBoxTransaction = () => {
  const userInfo = useUserInfo()
  const masterContract = useMasterContract()
  const tokenBalance = useEthBalance()
  const transaction = async (
    amount: number, 
    onePrice: number,
    signature:string,
    timestamp:string,
    address:string,
    code:number) => {
    const date = (new Date()).valueOf()
    const start = sessionStorage.getItem('buyBlindBoxTime');
    if (getDecimalAmountNumber(tokenBalance) <= onePrice) {
      throw new Error(' Insufficient Balance')
      return null
    }
      const params:any[]=[address,amount,onePrice,timestamp,code,signature]
      const res = await masterContract.mintBySpree(...params,{value:onePrice*amount})
      return res
  }
  return transaction
}
// 盲盒购买
export const useBuyBlindBoxTransaction = () => {
  const userInfo = useUserInfo()
  const masterContract = useMasterContract()
  const tokenBalance = useEthBalance()
  const transaction = async (amount: number, onePrice) => {
    const params = [amount]
    const price = getDecimalAmountNumber(new BigNumber(amount).times(onePrice))
    // if (getDecimalAmountNumber(tokenBalance) <= onePrice) {
    //   throw new Error(' Insufficient Balance')
    //   return null
    // }
    if (userInfo.inviter_address) {
      // @ts-ignore
      params.push(userInfo.inviter_address)
      
      const res = await masterContract.mintByInvite(...params, { value: amount*onePrice })
      return res
    } else {
    
      const res = await masterContract.mint(...params, { value: amount*onePrice })
      return res
    }
  }
  return transaction
}
// 集卡
export const useCollectCards = () => {
  const userInfo = useUserInfo()
  const masterContract = useMasterContractss()
  const tokenBalance = useEthBalance()
  const transaction = async (account,timestamp,code,signature) => {
    const params = [account,code,timestamp*1000,signature]
    // if (getDecimalAmountNumber(tokenBalance) <= onePrice) {
    //   throw new Error(' Insufficient Balance')
    //   return null
    // }
    console.log(params)
    const res = await masterContract.signatureWallet(...params)
    return res
  }
  return transaction
}
// 白名单兑换
export const usePreSaleNftRemix = () => {
  const userInfo = useUserInfo()
  const masterContract = useNftRemix()
  const tokenBalance = useEthBalance()
  const transaction = async (
    amount: number, 
    onePrice: BigNumber,
    signature:string,
    timestamp:string,
    address:string,
    code:number) => {
    const date = (new Date()).valueOf()
    const start = sessionStorage.getItem('buyBlindBoxTime');
    if (getDecimalAmountNumber(tokenBalance) <= Number(onePrice)) {
      throw new Error(' Insufficient Balance')
      return null
    }
      const params:any[]=[address,code,timestamp,signature]
      const res = await masterContract.mintByWhitelist(...params,{value:0})
      return res
  }
  return transaction
}
// 兑换
export const useSaleNftRemix = () => {
  const userInfo = useUserInfo()
  const masterContract = useNftRemix()
  const tokenBalance = useEthBalance()
  console.log(tokenBalance,12456)
  const transaction = async (amount: number, onePrice: BigNumber) => {
    const params = [amount]
    const price = getDecimalAmountNumber(new BigNumber(onePrice).pow(-17))
    const comparedToNum:string = new BigNumber(getDecimalAmountNumber(tokenBalance)).comparedTo(onePrice).toString();
    if ( comparedToNum === '-1') {
      throw new Error(' Insufficient Balance')
      return null
    } 
    const res = await masterContract.mint({ value: onePrice.toString() })
    return res
  }
  return transaction
}
// 会员卡白名单购买
export const usePublicSaleMembershipTransaction = () => {
  const memberCardContract = useMembershipContract()
  const tokenBalance = useEthBalance()
  const transaction = async ({ onePrice, id, round }) => {
    const price = getDecimalAmountNumber(onePrice)
    if (getDecimalAmountNumber(tokenBalance) <= price) {
      throw new Error('Insufficient Balance')
      return null
    }
    const params = [round, id]
    
    const res = await memberCardContract.mint(...params, { value: price.toString() })
    return res
  }
  return transaction
}
// 会员卡购买
export const usePreSaleMembershipTransaction = () => {
  const memberCardContract = useMasterContract()
  const tokenBalance = useEthBalance()
  const transaction = async ({ onePrice, type, signature, round, toAddress, overTime }) => {
    const price = getDecimalAmountNumber(onePrice)
    if (getDecimalAmountNumber(tokenBalance) <= price) {
      throw new Error('Insufficient Balance')
      return null
    }
    // 1是round
    const params = [1, 1, toAddress, overTime*1000, signature]
    const res = await memberCardContract.mintByWhitelist(...params, { value: 1000 })
    return res
  }
  return transaction
}
// 创建订单
export const useCreateOrder = () => {
  const memberCardContract = useTopdjmarket()
  const tokenBalance = useEthBalance()
  const transaction = async (tokenid,price:BigNumber,time) => {
    
    const params = [`${tokenid}`,price.toString(),`${time}`]
    console.log(params)
    const res = await memberCardContract.createOrder(...params)
    return res
  }
  return transaction
}
// 授权 getApprove
export const useGetApproveBox = () => {
  const memberCardContract = useMasterContract()
  const transaction = async () => {
    console.log(memberCardContract)
    const res = await memberCardContract.setApprovalForAll('0xe5869E4e0C4711A4B4e78c37a18cD176A1D8537f',true)
    return res
  }
  return transaction
}

export const useBuyApproveBox = () => {
  const memberCardContract = useERC20()
  const transaction = async (price:BigNumber) => {
    console.log(memberCardContract)
    const res = await memberCardContract.approve('0xe5869E4e0C4711A4B4e78c37a18cD176A1D8537f',price.toString())
    return res
  }
  return transaction
}
export const useCancelOrder = () => {
  const memberCardContract = useTopdjmarket()
  const tokenBalance = useEthBalance()
  const transaction = async (tokenid) => {
    
    const params = [`${tokenid}`]
    console.log(params)
    const res = await memberCardContract.cancelOrder(...params)
    return res
  }
  return transaction
}

// 购买
export const usePurchase = () => {
  const memberCardContract = useTopdjmarket()
  const tokenBalance = useEthBalance()
  const transaction = async (tokenid,price:BigNumber) => {
    // const price = getDecimalAmountNumber(onePrice)
    // if (getDecimalAmountNumber(tokenBalance) <= price) {
    //   throw new Error('Insufficient Balance')
    //   return null
    // }
    // 1是round
    console.log(tokenid,price.toString())
    const params = [`${tokenid}`,price.toString()]
    const res = await memberCardContract.executeOrder(...params)
    return res
  }
  return transaction
}
export default useBuyBlindBoxTransaction
