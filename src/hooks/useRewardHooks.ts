import { useEffect, useState } from 'react'
import { ContractReward } from '../contracts'
import { PokerToken_ADDRESS } from '../contracts/constant'
import { toolFromWei } from '../utils/tool'

export function useRewardHooks(myAddress: string) {
  const [totalShares, setTotalShares] = useState(0)
  const [totalReleased, setTotalReleased] = useState('0')
  const [releasable, setReleasable] = useState('0')

  useEffect(() => {
    getTotalShares()
    if (myAddress) {
      getReleasable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAddress])

  //交易总量 已经发放奖励
  const getTotalShares = async () => {
    const balanceOf = await ContractReward.methods.balanceOf(PokerToken_ADDRESS).call()
    const totalLiquidityFee = await ContractReward.methods.totalLiquidityFee().call()
    const totalReleased = await ContractReward.methods.totalReleased().call()

    setTotalShares(
      Number(toolFromWei(balanceOf)) + Number(toolFromWei(totalReleased)) - Number(toolFromWei(totalLiquidityFee)),
    )
    setTotalReleased(toolFromWei(totalReleased))
  }

  //可领取的奖励
  const getReleasable = async () => {
    const data = await ContractReward.methods.releasable(myAddress).call()
    setReleasable(toolFromWei(data))
  }

  return { totalShares, totalReleased, releasable }
}
