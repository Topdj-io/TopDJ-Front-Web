import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { inviteHarvest } from 'utils/callHelpers'
import { useInviteContract } from './useContract'

export const useInviteHarvest = () => {
  const { account } = useWeb3React()
  const inviteChefContract = useInviteContract()

  const handleHarvest = useCallback(async () => {
    const txHash = await inviteHarvest(inviteChefContract, account)
    return txHash
  }, [account, inviteChefContract])

  return { onReward: handleHarvest }
}
export default useInviteHarvest
