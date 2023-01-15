import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract } from 'utils/contractHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { simpleRpcProvider } from 'utils/providers'
import { useAccount } from 'state/userInfo/hooks'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      const res = await contract.methods.balanceOf(account).call()
      setBalance(new BigNumber(res))
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, web3, fastRefresh])

  return balance
}
export const useEthBalance = () => {
  const [balance, setBalance] = useState(0)
  const account = useAccount()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const ethBalance = await simpleRpcProvider.getBalance(account)
      setBalance(getBalanceNumber(new BigNumber(ethBalance._hex), 18, 18))
      // setBalance(getBalanceNumber(ethBalance.toNumber(), 18, 18))
    }

    if (account) {
      fetchBalance()
    } else {
      setBalance(0)
    }
  }, [account, fastRefresh])

  return balance
}

export default useTokenBalance
