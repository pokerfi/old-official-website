import { useEffect, useState } from 'react'
import { ContractCardStore, ContractSlotStore } from '../contracts'
import web3 from '../contracts/initWeb3'

export function useTechnologyHooks() {
  const [totalSupply, setTotalSupply] = useState('0')
  const [currentSupply, setCurrentSupply] = useState('0')
  const [round, setRound] = useState('0')
  const [roundSales, setRoundSales] = useState('0')
  const [totalSales, setTotalSales] = useState('0')

  useEffect(() => {
    getTotalSupply()
    getCurrentSupply()
    getTotalSales()
  }, [])

  const getTotalSupply = async () => {
    const balanceEther = web3.utils.fromWei('41666666666666666', 'ether')
    const nowtime = new Date()
    const time = Date.parse(nowtime.toString()) / 1000 - 1627335233
    const valueEther = time * Number(balanceEther)
    const a = valueEther.toFixed(2)
    console.log(a)
    setTotalSupply(a)
  }

  const getCurrentSupply = async () => {
    const data = await ContractSlotStore.methods.currentSupply().call() //获取当前轮卡槽总供应量
    setCurrentSupply(data)
    const data_1 = await ContractSlotStore.methods.round().call() //获取当前轮卡槽总供应量
    setRound(data_1)
    if (data_1) {
      const data_2 = await ContractSlotStore.methods.roundSales(data_1).call() //获取当前轮卡槽总供应量
      setRoundSales(data_2)
    }
  }

  const getTotalSales = async () => {
    const data = await ContractCardStore.methods.totalSales().call()
    setTotalSales(data)
  }

  return [totalSupply, currentSupply, round, roundSales, totalSales]
}
