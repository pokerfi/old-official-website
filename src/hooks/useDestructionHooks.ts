import axios from 'axios'
import { useEffect, useState } from 'react'
import { IP_URL } from '../contracts/constant'
import { toolFromNumber } from '../utils/tool'

export function useDestructionChartHooks(duration: number, separate: number) {
  const [totalCount, setTotalCount] = useState<string>('0')
  const [kindTotalCount, setKindTotalCount] = useState<any[]>([])
  const [rate, setRate] = useState<number>(0)
  const [isRise, setIsRise] = useState<boolean>(false)
  const [pkChartTips, setPkChartTips] = useState('')

  useEffect(() => {
    axios
      .post(`${IP_URL}api/burn/pkchart`, {
        address: 'admin',
        duration: duration,
        separate: separate,
      })
      .then(function (res) {
        setTotalCount(toolFromNumber(res.data.Data.totalCount))
        setKindTotalCount(res.data.Data.kindTotalCount)
        setRate(res.data.Data.rate)
        setIsRise(res.data.Data.isRise)
        setPkChartTips(res.data.Msg)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [duration, separate])

  return { totalCount, kindTotalCount, rate, isRise, setPkChartTips, pkChartTips }
}

export function useDestructionBlockHooks() {
  const [blockList, setBlockList] = useState<any[]>([])
  const [blockListTips, setBlockListTips] = useState('')

  useEffect(() => {
    axios
      .post(`${IP_URL}api/burn/block`, {
        address: 'admin',
        page: 1,
      })
      .then(function (res) {
        setBlockList(res.data.Data.list)
        setBlockListTips(res.data.Msg)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return { blockList, blockListTips, setBlockListTips }
}

export function useDestructionRankingHooks(duration: number) {
  const [rankList, setRankList] = useState<any[]>([])
  const [rankListTips, setRankListTips] = useState('')

  useEffect(() => {
    axios
      .post(`${IP_URL}api/burn/ranklist`, {
        address: 'admin',
        duration: duration,
      })
      .then(function (res) {
        setRankList(res.data.Data.list)
        setRankListTips(res.data.Msg)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [duration])

  return { rankList, rankListTips, setRankListTips }
}
