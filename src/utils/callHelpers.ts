// 邀请奖励
export const inviteHarvest = async (inviteChefContract, account) => {
  return inviteChefContract.withDrawReward()
  // .send({ from: account })
  // .on('transactionHash', (tx) => {
  //   return tx.transactionHash
  // })
}

export default inviteHarvest
